<template>
  <nav class="navbar">
    <!-- LOGO -->
    <div class="logo">
      <div class="icon">
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
      <a @click="goAbout">Tentang kami</a>
      <a @click="goKatalog">Katalog</a>
    </div>

    <!-- ACTIONS -->
    <div class="actions">
      <!-- AI -->
      <div class="ai" @click="goAI">
        <img src="/src/assets/ai-asistant.svg" />
        <span>AI Assistant</span>
      </div>

      <!-- LOGIN -->
      <button class="login" @click="goLogin">Login</button>

      <!-- REGISTER -->
      <button class="register" @click="goRegister">Daftar</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => router.push("/");
const goAbout = () => router.push("/about");
const goKatalog = () => router.push("/katalog");
const goAI = () => router.push("/ai");
const goLogin = () => router.push("/login");
const goRegister = () => router.push("/register");
</script>

<style scoped>
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
  gap: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  background: #caa63a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon img {
  width: 20px;
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
  font-weight: 500;
}

/* ACTIONS */
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* AI */
.ai {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

/* LOGIN */
.login {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

/* REGISTER */
.register {
  background: #caa63a;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
