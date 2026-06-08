<template>
  <div class="page">
    <!-- NAVBAR -->
    <NavbarUser v-if="isLogin" />
    <NavbarLanding v-else />
    
    <div class="back-btn" @click="goBack">← Kembali</div>

    <!-- LOADING -->
    <div v-if="loading" class="loading">
      Loading...
    </div>
    
    <!-- CONTENT -->
    <div v-else class="container">
      <!-- LEFT -->
      <div class="left">
        <div class="image-wrapper">
          <img :src="car.thumbnail || carImage" />
          <span class="badge" :class="car.status === 'Tersedia' ? 'green' : 'red'">
            {{ car.status }}
          </span>
        </div>

        <h1>{{ car.brand }} {{ car.model }}</h1>
        <h2>Rp {{ formatPrice(car.price) }}</h2>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <!-- SPEK -->
        <div class="spec-box">
          <div class="spec-item">
            <span>Tahun</span>
            <strong>{{car.specifications?.year}}</strong>
          </div>

          <div class="spec-item">
            <span>Kilometer</span>
            <strong>{{car.specifications?.mileage}}</strong>
          </div>

          <div class="spec-item">
            <span>Transmisi</span>
            <strong>{{car.specifications?.transmission}}</strong>
          </div>

          <div class="spec-item">
            <span>Bahan Bakar</span>
            <strong>{{car.specifications?.fuel}}</strong>
          </div>

          <div class="spec-item">
            <span>Warna</span>
            <strong>{{ car.specifications?.color }}</strong>
          </div>

          <div class="spec-item">
            <span>Tipe</span>
            <strong>{{ car.specifications?.type }}</strong>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="desc">
          <h3>Deskripsi</h3>
          <p>
            {{ car.description }}
          </p>
        </div>

        <!-- FITUR -->
        <div class="fitur">
          <h3>Fitur</h3>

          <div class="fitur-grid">
            <div
              class="fitur-item"
              v-for="(feature, index) in car.features"
              :key="index"
            >
              <img :src="checkIcon" class="check" />
              <span>{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div v-if="car.status ==='Tersedia'" class="cta">
      <button @click="handleBooking">📅 Jadwalkan Pertemuan</button>
      <p>
        Buat jadwal untuk bertemu penjual dan cek kondisi mobil secara langsung
      </p>
    </div>
  </div>
</template>

<script setup>
import NavbarUser from "@/components/Navbar.vue";
import NavbarLanding from "@/components/NavbarLanding.vue";
import checkIcon from "../assets/icon-check.svg";
import logoIcon from "../assets/logo-car.svg";
import carImage from "../assets/avanza.png";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const car = ref({});
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const isLogin = ref(false);

onMounted(() => {
  isLogin.value = !!localStorage.getItem("token");
  fetchCarDetail();
});

const fetchCarDetail = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `https://backend-autocatalog.vercel.app/api/v1/cars/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    car.value = res.data.data;
    console.log(car.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const handleBooking = () => {
  router.push(`/jadwal/${car.value.car_id}`);
};

const goBack = () => {
  router.back();
}
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  font-family: sans-serif;
}

.back-btn {
  padding: 10px 22px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e7e7e7;
  font-size: 18px;
  color: #111;
  cursor: pointer;
}

/* NAVBAR */
.navbar {
  padding: 20px 40px;
  background: white;
}

.logo {
  display: flex;
  gap: 10px;
  align-items: center;
}

.icon {
  width: 32px;
}

.logo p {
  font-size: 12px;
  color: #caa63a;
  margin: 0;
}

/* CONTAINER */
.container {
  display: flex;
  gap: 40px;
  padding: 40px;
}

/* LEFT */
.left {
  width: 50%;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  width: 100%;
  border-radius: 12px;
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

.left h1 {
  margin-top: 20px;
  font-size: 32px;
}

.left h2 {
  color: #caa63a;
  margin-top: 10px;
}

/* RIGHT */
.right {
  width: 50%;
}

/* SPEC */
.spec-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  border: 1px solid #e2c46f;
  border-radius: 12px;
  padding: 20px;
}

.spec-item span {
  font-size: 12px;
  color: gray;
}

.spec-item strong {
  display: block;
  margin-top: 4px;
}

/* DESC */
.desc {
  margin-top: 20px;
}

/* FITUR */
.fitur {
  margin-top: 20px;
}

.fitur-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 10px;
}

.fitur-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.check {
  width: 16px;
}

/* CTA */
.cta {
  margin-top: 40px;
  text-align: center;
}

.cta button {
  background: #caa63a;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.cta button:hover {
  opacity: 0.9;
}

.cta p {
  margin-top: 10px;
  padding-bottom: 20px;
  font-size: 12px;
  color: gray;
}
</style>
