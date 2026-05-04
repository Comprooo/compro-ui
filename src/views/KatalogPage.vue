<template>
  <div class="page">
    <!-- NAVBAR (REPLACED) -->
    <Navbar />

    <!-- HERO -->
    <section class="hero">
      <h1>Semua <span>Koleksi</span> Mobil</h1>
      <p>Temukan mobil impian Anda dari katalog lengkap kami</p>

      <div class="stats">
        <span><i class="dot yellow"></i> 6 Total</span>
        <span><i class="dot green"></i> 5 Tersedia</span>
        <span><i class="dot red"></i> 1 Terjual</span>
      </div>
    </section>

    <!-- FILTER -->
    <section class="filter">
      <div class="filter-left">
        <select>
          <option>Brand</option>
        </select>
        <select>
          <option>Tahun</option>
        </select>
        <select>
          <option>Transmisi</option>
        </select>
      </div>

      <div class="filter-right">
        <span>Tampilan:</span>
        <button class="active">Grid</button>
        <button>List</button>
      </div>
    </section>

    <!-- GRID -->
    <section class="grid">
      <!-- CARD 1 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/camry.png" />
          <span class="badge green">Tersedia</span>
        </div>
        <div class="body">
          <h4>Toyota Camry</h4>
          <p class="price">Rp 550.000.000</p>
          <div class="info">
            <span>2022</span>
            <span>15.000 km</span>
            <span>Automatic</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>

      <!-- CARD 2 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/hrv.png" />
          <span class="badge green">Tersedia</span>
        </div>
        <div class="body">
          <h4>Honda CR-V</h4>
          <p class="price">Rp 650.000.000</p>
          <div class="info">
            <span>2023</span>
            <span>8.000 km</span>
            <span>Automatic</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>

      <!-- CARD 3 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/mazdacx5.png" />
          <span class="badge dark">Terjual</span>
        </div>
        <div class="body">
          <h4>Mazda CX-5</h4>
          <p class="price">Rp 480.000.000</p>
          <div class="info">
            <span>2021</span>
            <span>25.000 km</span>
            <span>Automatic</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>

      <!-- CARD 4 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/avanza.png" />
          <span class="badge green">Tersedia</span>
        </div>
        <div class="body">
          <h4>Toyota Avanza</h4>
          <p class="price">Rp 250.000.000</p>
          <div class="info">
            <span>2022</span>
            <span>20.000 km</span>
            <span>Automatic</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>

      <!-- CARD 5 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/civic.png" />
          <span class="badge green">Tersedia</span>
        </div>
        <div class="body">
          <h4>Honda Civic Type R</h4>
          <p class="price">Rp 950.000.000</p>
          <div class="info">
            <span>2023</span>
            <span>3.000 km</span>
            <span>Manual</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>

      <!-- CARD 6 -->
      <div class="card">
        <div class="image">
          <img src="/src/assets/nissanxtrail.png" />
          <span class="badge green">Tersedia</span>
        </div>
        <div class="body">
          <h4>Nissan X-Trail</h4>
          <p class="price">Rp 580.000.000</p>
          <div class="info">
            <span>2023</span>
            <span>12.000 km</span>
            <span>Automatic</span>
            <span>Bensin</span>
          </div>
          <button @click="goDetail">Lihat Detail</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goDetail = () => {
  router.push("/detail");
};
const goHome = () => router.push("/");
const goAbout = () => router.push("/about");
</script>

<style scoped>
/* TIDAK ADA STYLE YANG DIUBAH */

/* PAGE */
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f3f3f3;
}

/* HERO */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(#d6c27a, #f3f3f3);
}

.hero span {
  color: #caa63a;
}

.stats {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* FILTER */
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  max-width: 1200px;
  margin: auto;
}

.filter-left select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-right button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.filter-right button.active {
  background: #caa63a;
  color: white;
  border: none;
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
  border-radius: 12px;
  overflow: hidden;
}

.image {
  position: relative;
  height: 170px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.dark {
  background: black;
}

.body {
  padding: 15px;
}

.price {
  color: #caa63a;
  font-weight: bold;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  margin: 10px 0;
}

button {
  width: 100%;
  background: #caa63a;
  border: none;
  padding: 10px;
  border-radius: 8px;
}

.outline {
  background: transparent;
  border: 1px solid #ccc;
}
</style>
