<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <div class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Manajemen Appointments" />

      <!-- CONTENT -->
      <div class="content">
        <!-- STATS -->
        <div class="stats">
          <div class="stat-card">
            <p>Jumlah Appointments</p>
            <h2 class="gold">3</h2>
          </div>

          <div class="stat-card">
            <p>Ditolak</p>
            <h2 class="red">1</h2>
          </div>

          <div class="stat-card">
            <p>Tertunda</p>
            <h2 class="gray">1</h2>
          </div>

          <div class="stat-card">
            <p>Dikonfirmasi</p>
            <h2 class="green">1</h2>
          </div>
        </div>

        <!-- HEADER -->
        <div class="header-section">
          <h2>Daftar Appointments</h2>

          <div class="search-box">
            <img src="/src/assets/admin/icon-search.svg" />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <!-- CARD 1 -->
        <div class="appointment-card">
          <div class="top-right confirmed">Dikonfirmasi</div>

          <div class="left">
            <img src="/src/assets/avanza.png" class="car-image" />
          </div>

          <div class="middle">
            <h3>Toyota Avanza</h3>
            <h4>Nama : namamu</h4>

            <div class="info-grid">
              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>8 April 2026</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar.svg" />
                <span>09:00 WIB</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-callungu.png" />
                <span>0812345678</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-msghijau.png" />
                <span>nama@gmai</span>
              </div>
            </div>
          </div>

          <div class="right">
            <button @click="goDetail">Lihat Detail Informasi</button>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="appointment-card">
          <div class="top-right rejected">Ditolak</div>

          <div class="left">
            <img src="/src/assets/avanza.png" class="car-image" />
          </div>

          <div class="middle">
            <h3>Toyota Avanza</h3>
            <h4>Nama : yourname</h4>

            <div class="info-grid">
              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>11 April 2026</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar.svg" />
                <span>09:00 WIB</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-callungu.png" />
                <span>0812345678</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-msghijau.png" />
                <span>youw@gmail</span>
              </div>
            </div>
          </div>

          <div class="right">
            <button @click="goDetail">Lihat Detail Informasi</button>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="appointment-card">
          <div class="top-right pending">Tertunda</div>

          <div class="left">
            <img src="/src/assets/civic.png" class="car-image" />
          </div>

          <div class="middle">
            <h3>Honda Civic Type R</h3>
            <h4>Nama : namakau</h4>

            <div class="info-grid">
              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>10 April 2026</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar.svg" />
                <span>16:00 WIB</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-callungu.png" />
                <span>0812345678</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-msghijau.png" />
                <span>namku@gme</span>
              </div>
            </div>
          </div>

          <div class="right">
            <button @click="goDetail">Lihat Detail Informasi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const router = useRouter();

/* ROUTER */
const goDetail = () => {
  router.push("/admin/detailapo");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  background: #f5f6fa;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.main-content {
  flex: 1;
}

.content {
  padding: 36px;
}

/* STATS */
.stats {
  display: flex;
  gap: 18px;
  margin-bottom: 42px;
}

.stat-card {
  flex: 1;
  background: white;
  border: 1px solid #e4c25c;
  border-radius: 16px;
  padding: 24px;
}

.stat-card p {
  color: #707070;
  margin-bottom: 26px;
  font-size: 15px;
}

.stat-card h2 {
  font-size: 22px;
  font-weight: 700;
}

.gold {
  color: #d4af37;
}

.red {
  color: red;
}

.green {
  color: #00c853;
}

.gray {
  color: #b8b8b8;
}

/* HEADER */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-section h2 {
  font-size: 22px;
  font-weight: 700;
}

/* SEARCH */
.search-box {
  width: 220px;
  height: 44px;
  background: white;
  border: 1px solid #d6d6d6;
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
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
  font-size: 15px;
}

/* CARD */
.appointment-card {
  background: white;
  border: 1px solid #e4c25c;
  border-radius: 16px;

  padding: 22px;

  display: flex;
  align-items: center;
  gap: 22px;

  margin-bottom: 22px;

  position: relative;
}

.car-image {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}

.middle {
  flex: 1;
}

.middle h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.middle h4 {
  color: #666;
  margin-bottom: 18px;
  font-size: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 220px);
  gap: 12px 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #707070;
}

.info-item img {
  width: 18px;
  height: 18px;
}

/* BUTTON */
.right button {
  background: #d4af37;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.right button:hover {
  opacity: 0.9;
}

/* STATUS */
.top-right {
  position: absolute;
  top: 18px;
  right: 18px;

  padding: 5px 14px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;
}

.confirmed {
  background: #00c853;
  color: white;
}

.rejected {
  background: red;
  color: white;
}

.pending {
  background: #f1f1f1;
  color: #444;
}
</style>
