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
        <button class="lihat-btn">Lihat Semua</button>
      </div>

      <div class="grid">
        <!-- CARD 1 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/camry.png" />
            <span class="badge green">Tersedia</span>
          </div>
          <div class="card-body">
            <h4>Toyota Camry</h4>
            <p class="price">Rp 550.000.000</p>
            <div class="info">
              <span>📅 2022</span>
              <span>🚗 15.000 km</span>
              <span>⚙ Automatic</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/hrv.png" />
            <span class="badge green">Tersedia</span>
          </div>
          <div class="card-body">
            <h4>Honda CR-V</h4>
            <p class="price">Rp 650.000.000</p>
            <div class="info">
              <span>📅 2023</span>
              <span>🚗 8.000 km</span>
              <span>⚙ Automatic</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/mazdacx5.png" />
            <span class="badge dark">Terjual</span>
          </div>
          <div class="card-body">
            <h4>Mazda CX-5</h4>
            <p class="price">Rp 480.000.000</p>
            <div class="info">
              <span>📅 2021</span>
              <span>🚗 25.000 km</span>
              <span>⚙ Automatic</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn outline">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 4 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/avanza.png" />
            <span class="badge green">Tersedia</span>
          </div>
          <div class="card-body">
            <h4>Toyota Avanza</h4>
            <p class="price">Rp 250.000.000</p>
            <div class="info">
              <span>📅 2022</span>
              <span>🚗 20.000 km</span>
              <span>⚙ Automatic</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 5 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/civic.png" />
            <span class="badge green">Tersedia</span>
          </div>
          <div class="card-body">
            <h4>Honda Civic Type R</h4>
            <p class="price">Rp 950.000.000</p>
            <div class="info">
              <span>📅 2023</span>
              <span>🚗 3.000 km</span>
              <span>⚙ Manual</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 6 -->
        <div class="card">
          <div class="image">
            <img src="/src/assets/nissanxtrail.png" />
            <span class="badge green">Tersedia</span>
          </div>
          <div class="card-body">
            <h4>Nissan X-Trail</h4>
            <p class="price">Rp 580.000.000</p>
            <div class="info">
              <span>📅 2023</span>
              <span>🚗 12.000 km</span>
              <span>⚙ Automatic</span>
              <span>⛽ Bensin</span>
            </div>
            <button class="detail-btn">Lihat Detail</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Navbar from "@/components/NavbarLanding.vue";
</script>

<style scoped>
/* GENERAL */
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f3f3f3;
}

/* HERO */
.hero {
  padding: 80px 40px;
  background: linear-gradient(#d6c27a, #f3f3f3);
}

.hero h1 {
  font-size: 48px;
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
  background: #caa63a;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

/* CARD */
.card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-6px);
}

/* IMAGE */
.image {
  position: relative;
  height: 170px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* BADGE */
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.green {
  background: green;
}

.dark {
  background: black;
}

/* BODY */
.card-body {
  padding: 16px;
}

.price {
  color: #caa63a;
  font-weight: bold;
  margin: 5px 0;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  margin-bottom: 10px;
}

/* BUTTON */
.detail-btn {
  width: 100%;
  background: #caa63a;
  border: none;
  padding: 10px;
  border-radius: 8px;
  color: white;
}

.detail-btn.outline {
  background: transparent;
  border: 1px solid #ccc;
  color: black;
}
</style>
