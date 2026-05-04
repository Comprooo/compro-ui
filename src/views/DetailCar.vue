<template>
  <div class="page">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="logo">
        <img :src="logoIcon" class="icon" />
        <div>
          <strong>AutoKatalog</strong>
          <p>Premium Car Collection</p>
        </div>
      </div>
    </nav>

    <!-- CONTENT -->
    <div class="container">
      <!-- LEFT -->
      <div class="left">
        <div class="image-wrapper">
          <img :src="carImage" />
          <span class="badge">Tersedia</span>
        </div>

        <h1>Toyota Avanza</h1>
        <h2>Rp 250.000.000</h2>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <!-- SPEK -->
        <div class="spec-box">
          <div class="spec-item">
            <span>Tahun</span>
            <strong>2022</strong>
          </div>

          <div class="spec-item">
            <span>Kilometer</span>
            <strong>20.000 km</strong>
          </div>

          <div class="spec-item">
            <span>Transmisi</span>
            <strong>Automatic</strong>
          </div>

          <div class="spec-item">
            <span>Bahan Bakar</span>
            <strong>Bensin</strong>
          </div>

          <div class="spec-item">
            <span>Warna</span>
            <strong>Grey</strong>
          </div>

          <div class="spec-item">
            <span>Tipe</span>
            <strong>MPV</strong>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="desc">
          <h3>Deskripsi</h3>
          <p>
            Toyota Avanza 2022 cocok untuk keluarga, irit BBM, service record
            lengkap
          </p>
        </div>

        <!-- FITUR -->
        <div class="fitur">
          <h3>Fitur</h3>

          <div class="fitur-grid">
            <div class="fitur-item">
              <img src="/src/assets/icon-check.svg" class="check" />
              <span>7 Seats</span>
            </div>

            <div class="fitur-item">
              <img :src="checkIcon" class="check" />
              <span>Dual Airbags</span>
            </div>

            <div class="fitur-item">
              <img :src="checkIcon" class="check" />
              <span>ABS</span>
            </div>

            <div class="fitur-item">
              <img :src="checkIcon" class="check" />
              <span>Touchscreen Audio</span>
            </div>

            <div class="fitur-item">
              <img :src="checkIcon" class="check" />
              <span>Rear Camera</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="cta">
      <button @click="handleBooking">📅 Jadwalkan Pertemuan</button>
      <p>
        Buat jadwal untuk bertemu penjual dan cek kondisi mobil secara langsung
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// IMPORT ASSETS (WAJIB BIAR GAK ERROR)
import checkIcon from "../assets/icon-check.svg";
import logoIcon from "../assets/logo-car.svg";
import carImage from "../assets/avanza.png";

const router = useRouter();

const handleBooking = () => {
  router.push("/jadwal");
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  font-family: sans-serif;
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
  top: 15px;
  right: 15px;
  background: #22c55e;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
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
  font-size: 12px;
  color: gray;
}
</style>
