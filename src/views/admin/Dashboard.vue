<template>
  <div class="dashboard-page">
    <!-- SIDEBAR -->
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
        <div class="menu-item active" @click="goDashboard">
          <img src="/src/assets/admin/icon-home.svg" />
          <span>Dashboard</span>
        </div>

        <div class="menu-item" @click="goKatalog">
          <img src="/src/assets/admin/icon-car.svg" />
          <span>Katalog</span>
        </div>

        <div class="menu-item" @click="goAppointment">
          <img src="/src/assets/admin/icon-calendar.svg" />
          <span>Appointment</span>
        </div>

        <div class="menu-item" @click="goJadwal">
          <img src="/src/assets/admin/icon-jadwal.svg" />
          <span>Jadwal</span>
        </div>

        <div class="menu-item" @click="goStatistik">
          <img src="/src/assets/admin/icon-statistik.svg" />
          <span>Statistik</span>
        </div>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="main-content">
      <!-- TOPBAR -->
      <div class="topbar">
        <h1>Dashboard</h1>

        <div class="top-actions">
          <!-- NOTIF -->
          <div class="notif-btn" @click="goNotif">
            <img src="/src/assets/admin/icon-notif.svg" />
          </div>

          <!-- PROFILE -->
          <div class="profile-btn" @click="goProfile">
            <img src="/src/assets/logo-profile.png" />
          </div>
        </div>
      </div>

      <!-- HERO -->
      <div class="hero-card">
        <h1>Selamat Datang, Admin!</h1>

        <p>Ini adalah ringkasan performa rental mobil anda</p>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat-item">
          <span class="dot yellow"></span>
          <p><strong>6</strong> Total Produk</p>
        </div>

        <div class="stat-item">
          <span class="dot green"></span>
          <p><strong>0</strong> Tersedia</p>
        </div>

        <div class="stat-item">
          <span class="dot red"></span>
          <p><strong>6</strong> Terjual</p>
        </div>
      </div>

      <!-- HEADER -->
      <div class="section-header">
        <h2>Pemesanan Terakhir</h2>

        <!-- SEARCH -->
        <div class="search-box">
          <img src="/src/assets/admin/icon-search.svg" />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <!-- GRID -->
      <div class="cars-grid">
        <!-- CARD 1 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/camry.png" class="car-image" />

            <div class="date-badge">7/2/2026</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Toyota Camry</h3>

            <h2>Rp 550.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2022</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>15.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Automatic</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/hrv.png" class="car-image" />

            <div class="date-badge">4/1/2026</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Honda CR-V</h3>

            <h2>Rp 650.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2023</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>8.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Automatic</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/mazdacx5.png" class="car-image" />

            <div class="date-badge">31/12/2025</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Mazda CX-5</h3>

            <h2>Rp 480.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2021</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>25.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Automatic</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 4 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/avanza.png" class="car-image" />

            <div class="date-badge">27/11/2025</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Toyota Avanza</h3>

            <h2>Rp 250.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2022</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>20.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Automatic</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 5 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/civic.png" class="car-image" />

            <div class="date-badge">11/11/2025</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Honda Civic Type R</h3>

            <h2>Rp 950.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2023</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>3.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Manual</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>

        <!-- CARD 6 -->
        <div class="car-card">
          <div class="image-wrapper">
            <img src="/src/assets/nissanxtrail.png" class="car-image" />

            <div class="date-badge">16/10/2025</div>

            <div class="status-badge">Terjual</div>
          </div>

          <div class="card-content">
            <h3>Nissan X-Trail</h3>

            <h2>Rp 580.000.000</h2>

            <div class="specs">
              <div class="spec">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>2023</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-km.svg" />
                <span>12.000 km</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-mesin.svg" />
                <span>Automatic</span>
              </div>

              <div class="spec">
                <img src="/src/assets/admin/icon-bensin.svg" />
                <span>Bensin</span>
              </div>
            </div>

            <button class="detail-btn" @click="goDetail">Lihat Detail</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

/* ROUTING */
const goDashboard = () => router.push("/admin/dashboard");
const goKatalog = () => router.push("/admin/katalog");
const goAppointment = () => router.push("/admin/appointment");
const goJadwal = () => router.push("/admin/jadwal");
const goStatistik = () => router.push("/admin/statistik");
const goNotif = () => router.push("/admin/notif");
const goProfile = () => router.push("/admin/profile");
const goDetail = () => router.push("/admin/detail");
</script>

<style scoped>
/* PAGE */
.dashboard-page {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #ececec;
  padding: 24px 0;
}

/* LOGO */
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

/* MENU */
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
  opacity: 0.7;
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

/* MAIN */
.main-content {
  flex: 1;
}

/* TOPBAR */
.topbar {
  height: 88px;
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 36px;

  border-bottom: 1px solid #ececec;
}

.topbar h1 {
  color: #2f3a74;
  font-size: 24px;
}

/* TOP ACTION */
.top-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notif-btn,
.profile-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;
}

.notif-btn:hover,
.profile-btn:hover {
  transform: scale(1.05);
}

.notif-btn img {
  width: 22px;
}

/* PROFILE FIX */
.profile-btn img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

/* HERO */
.hero-card {
  margin: 34px 36px 0;
  background: #d4af37;
  border-radius: 24px;

  padding: 42px;
  color: white;
}

.hero-card h1 {
  font-size: 54px;
  font-weight: 700;
}

.hero-card p {
  margin-top: 12px;
  font-size: 20px;
}

/* STATS */
.stats {
  display: flex;
  justify-content: center;
  gap: 40px;

  margin-top: 26px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.yellow {
  background: #d4af37;
}

.green {
  background: #22c55e;
}

.red {
  background: #ef4444;
}

/* HEADER */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 40px 36px 20px;
}

.section-header h2 {
  font-size: 22px;
  color: #111;
}

/* SEARCH */
.search-box {
  width: 220px;
  height: 44px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 12px;

  display: flex;
  align-items: center;

  padding: 0 14px;
}

.search-box img {
  width: 18px;
  opacity: 0.5;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 14px;
}

/* GRID */
.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 26px;

  padding: 0 36px 40px;
}

/* CARD */
.car-card {
  background: white;
  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  transition: 0.25s;
}

.car-card:hover {
  transform: translateY(-4px);
}

/* IMAGE */
.image-wrapper {
  position: relative;
}

.car-image {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

.date-badge {
  position: absolute;
  top: 12px;
  left: 12px;

  background: white;
  color: #444;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 600;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;

  background: white;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 700;
}

/* CONTENT */
.card-content {
  padding: 18px;
}

.card-content h3 {
  font-size: 20px;
  color: #111;
}

.card-content h2 {
  margin-top: 8px;

  color: #d4af37;
  font-size: 20px;
}

/* SPECS */
.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 14px;

  margin-top: 18px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #777;
  font-size: 14px;
}

.spec img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* BUTTON */
.detail-btn {
  width: 100%;
  height: 42px;

  margin-top: 20px;

  background: white;

  border: 1px solid #ead79c;
  border-radius: 10px;

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;
}

.detail-btn:hover {
  background: #d4af37;
  color: white;
}
</style>
