<template>
  <div class="page">
    <!-- NAVBAR (REPLACED) -->
    <NavbarUser v-if="isLogin" />
    <NavbarLanding v-else />

    <!-- HERO -->
    <section class="hero">
      <h1>Semua <span>Koleksi</span> Mobil</h1>
      <p>Temukan mobil impian Anda dari katalog lengkap kami</p>

      <div class="stats">
        <span><img :src="yellowDot" alt="Yellow Dot" /> <b>{{ formatNumber(totalCars) }}</b>  Total</span>
        <span><img :src="greenDot" alt="Green Dot" /> <b>{{ formatNumber(availableCars) }}</b>  Tersedia</span>
        <span><img :src="redDot" alt="Red Dot" /> <b>{{ formatNumber(soldCars) }}</b> Terjual</span>
      </div>
    </section>

    <!-- FILTER -->
    <section class="filter">
      <div class="filter-left">
        <v-select
          v-model="selectedBrand"
          :options="brands"
          placeholder="Semua Brand"
          @update:modelValue="filterCars"
        />

        <v-select
          v-model="selectedYear"
          :options="years"
          placeholder="Semua Tahun"
          @update:modelValue="filterCars"
        />
         
        <v-select
          v-model="selectedTransmission"
          :options="transmissions"
          placeholder="Semua Transmisi"
          @update:modelValue="filterCars"
        />
      </div>

      <div class="filter-right">
        <span>Tampilan:</span>
        <button :class="{ active: viewMode === 'grid' }"@click="viewMode = 'grid'">
          Grid
        </button>

        <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
          List
        </button>
      </div>
    </section>

    <!-- GRID -->
    <section :class="viewMode === 'grid' ? 'grid' : 'list-view'">

      <!-- LOADING -->
      <div v-if="loading" class="empty-state">
        <p>Loading data mobil...</p>
      </div>

      <!-- DATA ADA -->
      <template v-else-if="cars.length > 0">
        <div class="card" v-for="car in paginatedCars" :key="car.car_id">
          <div class="image">
            <img :src="car.thumbnail_url || '/default-car.png'" />
            <span class="badge" :class="car.status === 'Tersedia' ? 'green' : 'red'">
              {{ car.status }}
            </span>
          </div>

          <div class="body">
            <h4>{{ car.year }} {{ car.brand }} {{ car.model }} {{ car.transmission }}</h4>
            <p class="price">
              Rp {{ formatPrice(car.price) }}
            </p>
            <button @click="goDetail(car.car_id)">
              Lihat Detail
            </button>
          </div>
        </div>
      </template>

      <!-- DATA KOSONG -->
      <div v-else class="empty-state">
        <p>🚫 Stok mobil kosong</p>
        <small>Silakan cek kembali nanti atau ubah filter pencarian</small>
      </div>
    </section>

    <!-- PAGINATION -->
    <div
      v-if="cars.length > 0"
      class="pagination"
      >
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ← Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="currentPage = page"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup>
import NavbarLanding from "@/components/NavbarLanding.vue";
import NavbarUser from "@/components/Navbar.vue";
import yellowDot from "@/assets/dot-yellow.svg";
import greenDot from "@/assets/dot-green.svg";
import redDot from "@/assets/dot-red.svg";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const router = useRouter();
const isLogin = ref(false);
const allCars = ref([]);
const cars = ref([]);
const loading = ref(false);
const viewMode = ref("grid");
const currentPage = ref(1);
const itemsPerPage = 16;
const selectedBrand = ref(null);
const selectedYear = ref(null);
const selectedTransmission = ref(null);
const brands = ref([]);
const years = ref([]);
const transmissions = ref([]);

const goDetail = (id) => {
  router.push(`/detail/${id}`);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const totalCars = computed(() => {
  return allCars.value.length;
});

const availableCars = computed(() => {
  return allCars.value.filter(
    car => car.status === "Tersedia"
  ).length;
});

const soldCars = computed(() => {
  return allCars.value.filter(
    car => car.status === "Terjual"
  ).length;
});

onMounted(() => {
  isLogin.value = !!localStorage.getItem("token");
  fetchCars();
});

const fetchCars = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      "http://localhost:8000/api/v1/cars",
      {
        params: {
          page: 1,
          limit: 100, 
        },

        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    allCars.value = res.data.data;
    cars.value = res.data.data;

    brands.value = [
      ...new Set(allCars.value.map(car => car.brand)),
    ];

    years.value = [
      ...new Set(
        allCars.value.map(
          car => car.year
        )
      ),
    ];

    transmissions.value = [
      ...new Set(
        allCars.value.map(
          car => car.transmission
        )
      ),
    ];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const filterCars = () => {
  currentPage.value = 1;
  cars.value = allCars.value.filter((car) => {
    const matchBrand =
      !selectedBrand.value ||
      car.brand === selectedBrand.value;

    const matchYear =
      !selectedYear.value ||
      car.year ==
        selectedYear.value;

    const matchTransmission =
      !selectedTransmission.value ||
      car.transmission ===
        selectedTransmission.value;

    return (
      matchBrand &&
      matchYear &&
      matchTransmission
    );
  });
};

const totalPages = computed(() => {
  return Math.ceil(cars.value.length / itemsPerPage);
});

const paginatedCars = computed(() => {
  const start =
    (currentPage.value - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  return cars.value.slice(start, end);
});

</script>
<style scoped>
/* TIDAK ADA STYLE YANG DIUBAH */

/* PAGE */
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f3f3f3;
  min-height: 100vh;

}

/* HERO */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(#d6c27a, #f3f3f3);
}

.hero span {
  color: #caa63a;
}

.stats {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.stats span {
  color : gray
}

.stats span b{
  color: black;
}

.dot-yellow {
  color: #D4AF37;
}

.dot-green {
  color: green;
}

.dot-red {
  color: red;
}
/* FILTER */
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  max-width: 1200px;
  margin: auto;
}

.filter-left {
  display: flex;
  gap: 14px;
  align-items: center;
}

.filter-left :deep(.v-select) {
  min-width: 200px;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-right button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.filter-right button.active {
  background: #caa63a;
  color: white;
  border: none;
}

:deep(.vs__dropdown-menu) {
  max-height: 220px;
  overflow-y: auto;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}

/* CARD */
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: 0.25s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.body h4 {
  font-size: 18px;
  margin: 0;
  min-height: 80px;
  overflow: hidden;
}

.price {
  font-size: 20px;
  color: #caa63a;
  font-weight: bold;
  margin: 0;
}

.image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #eee;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}

.list-view .card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
}

.list-view .image {
  width: 280px;
  min-width: 280px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
}

.list-view .body {
  flex: 1;
}

.list-view button {
  max-width: 200px;
} 

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  color: white;
}

.green {
  background: green;
}

.red {
  background: red;
}

.body {
  padding: 15px;
}

.price {
  color: #caa63a;
  font-weight: bold;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  margin: 10px 0;
}

button {
  width: 100%;
  background: #caa63a;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.outline {
  background: transparent;
  border: 1px solid #ccc;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  color: #777;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 50px;
  flex-wrap: wrap;
}

.pagination button {
  width: auto;
  min-width: 42px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: white;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.pagination button.active {
  background: #caa63a;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
