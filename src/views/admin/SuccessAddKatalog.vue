<template>
  <div class="page">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="logo" @click="goKatalog">
        <div class="logo-circle">
          <img src="/src/assets/icon-carhitam.svg" />
        </div>

        <div>
          <h2>AutoKatalog</h2>
          <p>Premium Car Collection</p>
        </div>
      </div>
    </nav>

    <!-- CONTENT -->
    <div class="success-wrapper">
      <!-- ICON -->
      <div class="success-icon">
        <img src="/src/assets/icon-check2.svg" />
      </div>

      <!-- TITLE -->
      <h1>Katalog Berhasil Diunggah!</h1>

      <!-- BUTTON -->
      <button class="back-btn" @click="goKatalog">
        Kembali ke Daftar Katalog
      </button>

      <!-- CARD -->
      <div class="car-card">
        <img src="/src/assets/avanza.png" class="car-image" />

        <div class="card-content">
          <h2>Toyota Avanza</h2>

          <h3>Rp 250.000.000</h3>

          <ul>
            <li>Tahun: 2022</li>
            <li>Kilometer: 20.000 km</li>
            <li>Transmisi: automatic</li>
            <li>Bahan Bakar: bensin</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goKatalog = () => {
  router.push("/admin/katalog");
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* NAVBAR */
.navbar {
  height: 92px;
  background: white;

  display: flex;
  align-items: center;

  padding: 0 60px;

  border-bottom: 1px solid #e6e1cf;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 14px;

  cursor: pointer;
}

.logo-circle {
  width: 42px;
  height: 42px;

  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
}

.logo-circle img {
  width: 22px;
}

.logo h2 {
  font-size: 22px;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.logo p {
  margin: 0;
  color: #d4af37;
  font-size: 13px;
}

/* SUCCESS */
.success-wrapper {
  width: 100%;
  max-width: 900px;

  margin: 110px auto 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ICON */
.success-icon {
  width: 78px;
  height: 78px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}

.success-icon img {
  width: 74px;
}

/* TITLE */
.success-wrapper h1 {
  font-size: 28px;
  font-weight: 700;

  color: #111;

  margin-bottom: 22px;
}

/* BUTTON */
.back-btn {
  width: 100%;
  max-width: 720px;

  height: 44px;

  border-radius: 10px;
  border: 1px solid #d4af37;

  background: white;

  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

  margin-bottom: 54px;
}

.back-btn:hover {
  background: #d4af37;
  color: white;
}

/* CARD */
.car-card {
  width: 100%;

  background: white;

  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

/* IMAGE */
.car-image {
  width: 100%;
  height: 290px;

  object-fit: cover;
}

/* CONTENT */
.card-content {
  padding: 28px 28px 34px;
}

.card-content h2 {
  font-size: 24px;
  font-weight: 700;

  color: #111;

  margin-bottom: 14px;
}

.card-content h3 {
  font-size: 22px;
  font-weight: 700;

  color: #d4af37;

  margin-bottom: 22px;
}

.card-content ul {
  padding-left: 18px;
}

.card-content li {
  font-size: 16px;
  color: #666;

  margin-bottom: 12px;
}
</style>
