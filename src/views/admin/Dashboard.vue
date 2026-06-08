<template>
  <div class="dashboard-page">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <main class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Dashboard" />

      <!-- HERO -->
      <div class="hero-card">
        <h1>Selamat Datang, Admin!</h1>

        <p>Ini adalah ringkasan performa rental mobil anda</p>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat-item">
          <span class="dot yellow"></span>
          <p><strong>{{ TotalCars }}</strong> Total Produk</p>
        </div>

        <div class="stat-item">
          <span class="dot green"></span>
          <p><strong>{{ AvailableCars }}</strong> Tersedia</p>
        </div>

        <div class="stat-item">
          <span class="dot red"></span>
          <p><strong>{{ SoldCars }}</strong> Terjual</p>
        </div>
      </div>

      <!-- HEADER -->
      <div class="section-header">
        <h2>Pemesanan Terakhir</h2>

        <!-- SEARCH -->
        <div class="search-box">
          <img src="/src/assets/admin/icon-search.svg" />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <!-- GRID -->
      <div class="cars-grid">
        <div
          class="car-card"
          v-for="car in paginatedCars"
          :key="car.car_id"
        >
          <div class="image-wrapper">
            <img
              :src="car.thumbnail_url"
            />

            <div class="status-badge">
              {{ car.status }}
            </div>
          </div>

          <div class="card-content">
            <h3>{{car.year}} {{ car.brand }} {{ car.model }} {{ car.transmission }}</h3>

            <h2>
              Rp {{ Number(car.price).toLocaleString("id-ID") }}
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
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const searchQuery = ref("");
const router = useRouter();

/* =========================
   SEARCH WATCHER
========================= */
watch(searchQuery, () => {
  currentPage.value = 1;
});
/* =========================
   STATE
========================= */
const cars = ref([]);
const loading = ref(false);

/* pagination */
const currentPage = ref(1);
const itemsPerPage = 6;

/* =========================
   FETCH ALL CARS
========================= */
const fetchCars = async () => {
  try {
    loading.value = true;

    const res = await axios.get("https://backend-autocatalog.vercel.app/api/v1/cars", {
      params: {
        page: 1,
        limit: 100,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });

    statistics.value = res.data.data.statistics;
    cars.value = res.data.data.cars;
    console.log(cars.value);

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
   FILTER TERJUAL
========================= */
const soldCars = computed(() => {
  return cars.value.filter((car) => {
    // filter status terjual
    const isSold =
      car.status?.toLowerCase() === "terjual";

    // gabungkan data untuk search
    const searchText = `
      ${car.brand}
      ${car.model}
      ${car.year}
      ${car.transmission}
      ${car.fuel}
      ${car.price}
      ${car.mileage}
    `.toLowerCase();

    // cocokkan keyword
    const matchSearch =
      searchText.includes(
        searchQuery.value.toLowerCase()
      );

    return isSold && matchSearch;
  });
});

/* =========================
   STATISTIK GLOBAL
========================= */
const statistics = ref({
  total: 0,
  tersedia: 0,
  terjual: 0,
});

const TotalCars = computed(() => {
  return statistics.value.total;
});

const AvailableCars = computed(() => {
  return statistics.value.tersedia;
});

const SoldCars = computed(() => {
  return statistics.value.terjual;
});

/* =========================
   FRONTEND PAGINATION
========================= */
const totalPages = computed(() => {
  return Math.ceil(
    soldCars.value.length / itemsPerPage
  );
});

const paginatedCars = computed(() => {
  const start =
    (currentPage.value - 1) * itemsPerPage;

  const end = start + itemsPerPage;

  return soldCars.value.slice(start, end);
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

/* =========================
   ROUTING
========================= */
const goDetail = (id) => {
  router.push(`/admin/detail/${id}`);
};

const goEdit = (id) => {
  router.push(`/admin/editkatalog/${id}`);
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

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #ececec;
  padding: 24px 0;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
}

.logo-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.logo-circle img {
  width: 22px;
}

.logo h2 {
  font-size: 18px;
  color: #111;
}

.logo p {
  font-size: 12px;
  color: #d4af37;
  margin-top: 2px;
}

/* MENU */
.menu {
  margin-top: 40px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 16px 28px;

  color: #a3a3a3;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.menu-item img {
  width: 22px;
  opacity: 0.7;
}

.menu-item:hover {
  color: #d4af37;
}

.menu-item.active {
  color: #d4af37;
  font-weight: 700;
  border-left: 5px solid #d4af37;
  background: rgba(212, 175, 55, 0.05);
}

/* MAIN */
.main-content {
  flex: 1;
}

/* TOPBAR */
.topbar {
  height: 88px;
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 36px;

  border-bottom: 1px solid #ececec;
}

.topbar h1 {
  color: #2f3a74;
  font-size: 24px;
}

/* TOP ACTION */
.top-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notif-btn,
.profile-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;
}

.notif-btn:hover,
.profile-btn:hover {
  transform: scale(1.05);
}

.notif-btn img {
  width: 22px;
}

/* PROFILE FIX */
.profile-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* HERO */
.hero-card {
  margin: 34px 36px 0;
  background: #d4af37;
  border-radius: 24px;

  padding: 42px;
  color: white;
}

.hero-card h1 {
  font-size: 54px;
  font-weight: 700;
}

.hero-card p {
  margin-top: 12px;
  font-size: 20px;
}

/* STATS */
.stats {
  display: flex;
  justify-content: center;
  gap: 40px;

  margin-top: 26px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.yellow {
  background: #d4af37;
}

.green {
  background: #22c55e;
}

.red {
  background: #ef4444;
}

/* HEADER */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 40px 36px 20px;
}

.section-header h2 {
  font-size: 22px;
  color: #111;
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

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;

  background: white;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 700;
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
