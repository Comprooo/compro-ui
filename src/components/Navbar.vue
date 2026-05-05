<template>
  <nav class="navbar">
    <!-- LEFT LOGO -->
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

    <!-- RIGHT ACTION -->
    <div class="actions">
      <!-- AI -->
      <div class="ai" @click="goAI">
        <img src="/src/assets/ai-asistant.svg" />
        <span>AI Assistant</span>
      </div>

      <!-- BUTTON -->
      <button class="appointment" @click="goAppointment">
        My Appointments
      </button>

      <!-- PROFILE -->
      <div class="profile" @click="goProfile">
        <img src="/src/assets/logo-profile.png" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => router.push("/home");
const goTentang = () => router.push("/about");
const goKatalog = () => router.push("/katalog");
const goAI = () => router.push("/ai");
const goAppointment = () => router.push("/appointments");
const goProfile = () => router.push("/viewprofile");
</script>

<style scoped>
/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 18px 40px;
  background: white;
  border-bottom: 1px solid #eee;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 42px;
  height: 42px;
  background: #caa63a;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 10px rgba(202, 166, 58, 0.3);
}

.logo-circle img {
  width: 22px;
}

.logo-text p {
  font-size: 12px;
  color: #caa63a;
  margin: 0;
}

/* MENU */
.menu {
  display: flex;
  gap: 40px;
}

.menu a {
  cursor: pointer;
  font-weight: 500;
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
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.ai img {
  width: 18px;
}

/* BUTTON */
.appointment {
  background: #caa63a;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

/* PROFILE */
.profile {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
