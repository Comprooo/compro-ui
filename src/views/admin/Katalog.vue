<template>
  <div class="dashboard-page">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <main class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Manajemen Katalog" />

      <!-- CONTENT -->
      <div class="content">
        <!-- HEADER -->
        <div class="section-header">
          <h2>Daftar Katalog</h2>

          <div class="header-actions">
            <!-- SEARCH -->
            <div class="search-box">
              <img src="/src/assets/admin/icon-search.svg" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
              />
            </div>

            <!-- BUTTON -->
            <button class="add-btn" @click="goTambah">+ Tambah Katalog</button>
          </div>
        </div>

        <!-- GRID -->
        <div class="cars-grid">

          <!-- LOADING -->
          <div v-if="loading">
            Loading...
          </div>

          <!-- CARD -->
          <div
            v-else
            class="car-card"
            v-for="car in paginatedCars"
            :key="car.car_id"
          >
            <div class="image-wrapper">
              <img
                :src="car.thumbnail_url || '/default-car.png'"
              />

              <div
                class="status-badge"
                :class="
                  car.status === 'Tersedia'
                    ? 'available'
                    : 'sold'
                "
              >
                {{ car.status }}
              </div>
            </div>

            <div class="card-content">
              <h3>
                {{ car.year }}
                {{ car.brand }}
                {{ car.model }}
              </h3>

              <h2>
                Rp {{ formatPrice(car.price) }}
              </h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>{{ car.year }}</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>{{ car.mileage }}</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>{{ car.transmission }}</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>{{ car.fuel }}</span>
                </div>
              </div>

              <!-- BUTTONS -->
              <div class="button-group">
                <button
                  class="edit-btn"
                  @click="goEdit(car.car_id)"
                >
                  Edit
                </button>

                <button
                  class="detail-btn"
                  @click="goDetail(car.car_id)"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- PAGINATION -->
        <div class="pagination">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            Prev
          </button>

          <span>
            Page {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const router = useRouter();

const cars = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 12;

/* =========================
   PAGINATION
========================= */
const totalPages = computed(() => {
  return Math.ceil(
    filteredCars.value.length / itemsPerPage
  );
});

const paginatedCars = computed(() => {
  const start =
    (currentPage.value - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  return filteredCars.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
});

/* =========================
   FETCH CARS
========================= */
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    cars.value = res.data.data.cars;

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCars();
});

/* =========================
   SORT + SEARCH
========================= */
const filteredCars = computed(() => {
  let filtered = [...cars.value];

  // search
  filtered = filtered.filter((car) => {
    const searchText = `
      ${car.brand}
      ${car.model}
      ${car.year}
      ${car.transmission}
      ${car.fuel}
      ${car.status}
      ${car.price}
      ${car.mileage}
    `.toLowerCase();

    return searchText.includes(
      searchQuery.value.toLowerCase()
    );
  });

  // tersedia dulu baru terjual
  filtered.sort((a, b) => {
    if (
      a.status?.toLowerCase() === "tersedia" &&
      b.status?.toLowerCase() !== "tersedia"
    ) {
      return -1;
    }

    if (
      a.status?.toLowerCase() !== "tersedia" &&
      b.status?.toLowerCase() === "tersedia"
    ) {
      return 1;
    }

    return 0;
  });

  return filtered;
});

/* =========================
   FORMAT
========================= */
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID");
};

/* =========================
   ROUTING
========================= */
const goTambah = () => {
  router.push("/admin/addkatalog");
};

const goEdit = (id) => {
  router.push(`/admin/editkatalog/${id}`);
};

const goDetail = (id) => {
  router.push(`/admin/detail/${id}`);
};
</script>

<style scoped>
/* PAGE */
.dashboard-page {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

/* MAIN */
.main-content {
  flex: 1;
}

/* CONTENT */
.content {
  padding: 32px;
}

/* HEADER */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 28px;
}

.section-header h2 {
  font-size: 22px;
  color: #111;
}

/* ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* SEARCH */
.search-box {
  width: 220px;
  height: 44px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 12px;

  display: flex;
  align-items: center;

  padding: 0 14px;
}

.search-box img {
  width: 18px;
  opacity: 0.5;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 14px;
  background: transparent;
}

/* ADD BUTTON */
.add-btn {
  height: 44px;
  padding: 0 22px;

  border: none;
  border-radius: 12px;

  background: #d4af37;
  color: white;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
}

/* GRID */
.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}

/* CARD */
.car-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: 0.25s;;
}

.car-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

/* IMAGE */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #eee;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.date-badge {
  position: absolute;
  top: 12px;
  left: 12px;

  background: white;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 700;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

.available {
  color:white;
  background: #22c55e;
}

.sold {
  color: black;
  background: #ffffff;
}

/* CONTENT */
.card-content {
  padding: 18px;
}

.card-content h3 {
  font-size: 18px;
  margin: 0;
  min-height: 80px;
  overflow: hidden;
}

.card-content h2 {
  margin-top: 8px;

  color: #d4af37;
  font-size: 20px;
}

/* SPECS */
.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 14px;

  margin-top: 18px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #777;
  font-size: 14px;
}

.spec img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* BUTTON */
.edit-btn,
.detail-btn {
  width: 100%;
  height: 42px;

  margin-top: 20px;

  border-radius: 10px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.edit-btn {
  background: #d4af37;
  color: white;
  border: none;
}

.detail-btn {
  background: white;
  border: 1px solid #ead79c;
}

.edit-btn:hover,
.detail-btn:hover {
  transform: translateY(-2px);
}

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 10px 0 40px;
  padding-top: 40px;
}

.pagination button {
  border: none;
  background: #d4af37;

  color: white;

  padding: 10px 18px;

  border-radius: 10px;

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;
}

.pagination button:hover {
  opacity: 0.9;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
