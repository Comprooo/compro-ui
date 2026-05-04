<template>
  <div class="page">
    <!-- NAVBAR -->
    <nav class="navbar">
      <!-- LOGO -->
      <div class="logo">
        <div class="logo-circle">
          <img src="/src/assets/icon-carhitam.svg" />
        </div>

        <div>
          <strong>AutoKatalog</strong>
          <p>Premium Car Collection</p>
        </div>
      </div>

      <!-- MENU -->
      <div class="menu">
        <a @click="goHome">Home</a>
        <a @click="goTentang">Tentang kami</a>
        <a @click="goKatalog">Katalog</a>
      </div>

      <!-- ACTION -->
      <div class="actions">
        <div class="ai" @click="goAI">
          <img src="/src/assets/ai-asistant.svg" />
          <span>AI Assistant</span>
        </div>

        <button class="appointment-btn" @click="goAppointment">
          My Appointments
        </button>

        <div class="profile" @click="goProfile">
          <img src="/src/assets/logo-profile.png" />
        </div>
      </div>
    </nav>

    <!-- CONTENT -->
    <div class="container">
      <h1>My Appointments</h1>
      <p class="subtitle">Lihat semua jadwal pertemuan Anda</p>

      <!-- STATS -->
      <div class="stats">
        <div class="card">
          <p>Total Appointments</p>
          <h2>0</h2>
        </div>

        <div class="card">
          <p>Pending</p>
          <h2>0</h2>
        </div>

        <div class="card">
          <p>Confirmed</p>
          <h2 class="green">0</h2>
        </div>
      </div>

      <!-- EMPTY -->
      <div class="empty">
        <h3>Daftar Appointments</h3>
        <p class="desc">Jadwal pertemuan untuk cek kondisi mobil</p>

        <div class="empty-box">
          <img src="/src/assets/apo-putih.svg" class="empty-icon" />

          <h2>Belum ada appointment</h2>
          <p>Mulai jelajahi katalog mobil dan buat jadwal pertemuan</p>

          <button @click="goKatalog">Lihat Katalog</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

/* ROUTING */
const goHome = () => router.push("/");
const goTentang = () => router.push("/about");
const goKatalog = () => router.push("/katalog");
const goAI = () => router.push("/ai");
const goAppointment = () => router.push("/appointments"); // self
const goProfile = () => router.push("/profile"); // self
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: white;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* LINGKARAN KUNING */
.logo-circle {
  width: 42px;
  height: 42px;
  background: #caa63a;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
}

/* ICON MOBIL */
.logo-circle img {
  width: 22px;
  height: 22px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
}

.logo p {
  font-size: 12px;
  color: #caa63a;
  margin: 0;
}

/* MENU */
.menu {
  display: flex;
  gap: 30px;
}

.menu a {
  cursor: pointer;
}

/* ACTION */
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.ai img {
  width: 18px;
}

.appointment-btn {
  background: #caa63a;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

.profile img {
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
}

/* CONTAINER */
.container {
  padding: 40px;
  max-width: 900px;
  margin: auto;
}

.subtitle {
  color: gray;
  margin-top: 5px;
}

/* STATS */
.stats {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.card {
  flex: 1;
  border: 1px solid #e2c46f;
  border-radius: 12px;
  padding: 20px;
  background: white;
}

.card h2 {
  color: #caa63a;
}

.green {
  color: #22c55e;
}

/* EMPTY */
.empty {
  margin-top: 40px;
}

.empty-box {
  margin-top: 20px;
  border: 1px solid #e2c46f;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: white;
}

.empty-icon {
  width: 60px;
  opacity: 0.5;
}

.empty-box h2 {
  margin-top: 10px;
}

.empty-box p {
  color: gray;
}

.empty-box button {
  margin-top: 15px;
  background: #caa63a;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
