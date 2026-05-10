<template>
  <div class="page">
    <!-- NAVBAR -->
    <nav class="navbar">
      <!-- LOGO -->
      <div class="logo">
        <div class="logo-circle">
          <img src="/src/assets/icon-carhitam.svg" />
        </div>

        <div class="logo-text">
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

        <div class="card">
          <p>Declined</p>
          <h2>0</h2>
        </div>
      </div>

      <!-- EMPTY -->
      <div class="empty-wrapper">
        <div class="empty-header">
          <h3>Daftar Appointments</h3>
          <p>Jadwal pertemuan untuk cek kondisi mobil</p>
        </div>

        <div class="empty-box">
          <img src="/src/assets/apo-putih.svg" class="empty-icon" />

          <h2>Belum ada appointment</h2>

          <span> Mulai jelajahi katalog mobil dan buat jadwal pertemuan </span>

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
const goAppointment = () => router.push("/appointments");
const goProfile = () => router.push("/profile");
</script>

<style scoped>
/* PAGE */
.page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* NAVBAR */
.navbar {
  height: 90px;
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 56px;

  border-bottom: 1px solid #e8e8e8;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d4af37;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
}

.logo-circle img {
  width: 24px;
}

.logo-text strong {
  font-size: 18px;
}

.logo-text p {
  font-size: 12px;
  color: #caa63a;
  margin-top: 2px;
}

/* MENU */
.menu {
  display: flex;
  gap: 46px;
}

.menu a {
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.menu a:hover {
  color: #caa63a;
}

/* ACTIONS */
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* AI */
.ai {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.ai img {
  width: 22px;
}

.ai span {
  font-size: 15px;
}

/* BTN */
.appointment-btn {
  height: 40px;
  padding: 0 18px;

  border-radius: 10px;
  border: 1px solid #d4af37;

  background: white;
  cursor: pointer;

  font-size: 15px;
}

/* PROFILE */
.profile {
  width: 54px;
  height: 54px;

  border-radius: 50%;
  overflow: hidden;

  cursor: pointer;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CONTAINER */
.container {
  width: 760px;
  margin: 34px auto;
}

/* TITLE */
.container h1 {
  font-size: 48px;
  font-weight: 700;
}

.subtitle {
  color: #7d7d7d;
  margin-top: 8px;
  font-size: 16px;
}

/* STATS */
.stats {
  display: flex;
  gap: 16px;
  margin-top: 34px;
}

.card {
  width: 170px;
  height: 170px;

  border: 1px solid #efdba1;
  border-radius: 18px;

  background: white;

  padding: 24px;
}

.card p {
  color: #6e6e6e;
  line-height: 1.4;
  font-size: 15px;
}

.card h2 {
  margin-top: 48px;
  font-size: 34px;
  color: #d0a92d;
}

.green {
  color: #16c14c !important;
}

/* EMPTY WRAPPER */
.empty-wrapper {
  margin-top: 30px;

  border: 1px solid #f0e0b0;
  border-radius: 18px;

  background: white;

  min-height: 400px;

  padding: 26px;
}

/* HEADER */
.empty-header h3 {
  font-size: 18px;
}

.empty-header p {
  margin-top: 6px;
  color: #777;
}

/* EMPTY BOX */
.empty-box {
  height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ICON */
.empty-icon {
  width: 74px;
  opacity: 0.35;
}

/* TEXT */
.empty-box h2 {
  margin-top: 18px;
  font-size: 20px;
}

.empty-box span {
  margin-top: 10px;
  color: #808080;
  font-size: 15px;
}

/* BUTTON */
.empty-box button {
  margin-top: 22px;

  width: 116px;
  height: 40px;

  border: none;
  border-radius: 10px;

  background: #d4af37;
  color: black;

  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.empty-box button:hover {
  opacity: 0.9;
}
</style>
