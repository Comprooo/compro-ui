<template>
  <div class="page">
    <!-- NAVBAR (PAKAI COMPONENT) -->
    <Navbar />

    <!-- HERO -->
    <section class="hero">
      <h1>Katalog <span>Mobil</span> Lengkap</h1>
      <p>
        Jelajahi koleksi lengkap mobil berkualitas dengan berbagai pilihan brand
        dan tipe yang sesuai dengan kebutuhan Anda.
      </p>

      <div class="tags">
        <span>Koleksi Premium</span>
        <span>Booking Online Mudah</span>
        <span>Mobil Berkualitas</span>
        <span>Detail Lengkap & Akurat</span>
      </div>
    </section>

    <!-- LIST -->
    <section class="list">
      <h2>Jelajahi <span>Koleksi</span> Kami</h2>

      <div class="list-header">
        <h3>Temukan <span>Mobil</span> Impian Anda</h3>
        <button class="lihat-btn" @click="goKatalog">Lihat Semua</button>
      </div>

            <!-- LOADING -->
      <div v-if="loading" class="empty-state">
        <p>Loading data mobil...</p>
      </div>

      <!-- DATA ADA -->
      <div v-else-if="cars.length > 0" class="grid">
        <div class="card" v-for="car in cars.slice(0,6)" :key="car.car_id">
          <div class="image">
            <img :src="car.thumbnail_url || '/default-car.png'" />
            <span
              class="badge"
              :class="car.status === 'Tersedia' ? 'green' : 'red'"
            >
              {{ car.status}}
            </span>
          </div>

          <div class="card-body">
            <h4>{{ car.year }} {{ car.brand }} {{ car.model }} {{ car.transmission }}</h4>

            <p class="price">
              Rp {{ formatPrice(car.price) }}
            </p>

            <button
              class="detail-btn"
              @click="goDetail(car.car_id)"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>

      <!-- DATA KOSONG -->
      <div v-else class="empty-state">
        <p>🚫 Stok mobil saat ini kosong</p>
        <small>Silakan cek kembali nanti atau ubah filter pencarian</small>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import { ref, onMounted } from "vue";
import axios from "axios";

const cars = ref([]);
const loading = ref(false);

const fetchCars = async () => {
  try {
    loading.value = true;

    const res = await axios.get("http://localhost:8000/api/v1/cars", {
      params: {
        page: 1,
        limit: 100,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // kalau butuh token
      },
    });

    cars.value = res.data.data.cars.sort((a, b) => {
      // tersedia di atas
      if (a.status === "Tersedia" && b.status !== "Tersedia") {
        return -1;
      }

      if (a.status !== "Tersedia" && b.status === "Tersedia") {
        return 1;
      }

      return 0;
    });
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

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const goKatalog = () => {
  router.push('/katalog'); // logika untuk navigasi ke katalog
};

const goDetail = (id) => {
  router.push(`/detail/${id}`);
};
</script>

<style scoped>
/* GENERAL */
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f3f3f3;
  min-height: 100vh;

}

/* HERO */
.hero {
  padding: 80px 40px;
  background: linear-gradient(#d6c27a, #f3f3f3);
}

.hero h1 {
  font-size: 48px;
}

.hero p {
  padding-bottom: 30px;
}
.hero span {
  color: #caa63a;
}

.tags span {
  background: #e7d7a0;
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 10px;
}

/* LIST */
.list {
  padding: 40px;
}

.list h2 {
  text-align: center;
  margin-bottom: 30px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.lihat-btn {
  height: 7vh;
  background: #caa63a;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.green {
  background: green;
}

.red {
  background: red;
}

/* BODY */
.card-body {
  padding: 16px;
}

.card-body h4 { 
  font-size: 18px;
  margin: 0;
  min-height: 80px;
  overflow: hidden;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.price {
  font-size: 20px;
  color: #caa63a;
  font-weight: bold;
  margin: 0;
  margin-bottom: 6px;
}

/* BUTTON */
.detail-btn {
  width: 100%;
  background: #caa63a;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.detail-btn.outline {
  border: 1px solid #ccc;
  color: black;
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
</style>