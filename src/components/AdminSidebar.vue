<template>
  <aside class="sidebar">
    <!-- LOGO -->
    <div class="logo">
      <div class="logo-circle">
        <img src="/src/assets/icon-carhitam.svg" />
      </div>

      <div>
        <h2>AutoKatalog</h2>
        <p>Premium Car Collection</p>
      </div>
    </div>

    <!-- MENU -->
    <div class="menu">
      <!-- DASHBOARD -->
      <div
        class="menu-item"
        :class="{ active: route.path === '/admin/dashboard' }"
        @click="goDashboard"
      >
        <img src="/src/assets/admin/icon-home.svg" />
        <span>Dashboard</span>
      </div>

      <!-- KATALOG -->
      <div
        class="menu-item"
        :class="{ active: route.path === '/admin/katalog' }"
        @click="goKatalog"
      >
        <img src="/src/assets/admin/icon-car.svg" />
        <span>Katalog</span>
      </div>

      <!-- APPOINTMENT -->
      <div
        class="menu-item"
        :class="{ active: route.path === '/admin/appointment' }"
        @click="goAppointment"
      >
        <img src="/src/assets/admin/icon-calendar.svg" />
        <span>Appointment</span>
      </div>

      <!-- JADWAL -->
      <div
        class="menu-item"
        :class="{ active: route.path === '/admin/jadwal' }"
        @click="goJadwal"
      >
        <img src="/src/assets/admin/icon-jadwal.svg" />
        <span>Jadwal</span>
      </div>

      <!-- STATISTIK -->
      <div
        class="menu-item"
        :class="{ active: route.path === '/admin/statistik' }"
        @click="goStatistik"
      >
        <img src="/src/assets/admin/icon-statistik.svg" />
        <span>Statistik</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const goDashboard = () => router.push("/admin/dashboard");
const goKatalog = () => router.push("/admin/katalog");
const goAppointment = () => router.push("/admin/appointment");
const goJadwal = () => router.push("/admin/jadwal");
const goStatistik = () => router.push("/admin/statistik");
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #ececec;
  padding: 24px 0;
  min-height: 100vh;
}

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
  opacity: 0.5;

  /* WARNA DEFAULT ABU */
  filter: grayscale(100%) brightness(0.7);
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

.menu-item.active img {
  filter: brightness(0) saturate(100%) invert(73%) sepia(48%) saturate(604%)
    hue-rotate(5deg) brightness(92%) contrast(88%);
  opacity: 1;
}
</style>
