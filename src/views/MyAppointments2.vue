<template>
  <div class="page">
    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <div class="container">
      <!-- TITLE -->
      <div class="header">
        <h1>My Appointments</h1>
        <p>Lihat semua jadwal pertemuan Anda</p>
      </div>

      <!-- STATS -->
      <div class="stats">
        <div class="stat">
          <p>Total Appointments</p>
          <h2>1</h2>
        </div>
        <div class="stat">
          <p>Pending</p>
          <h2>1</h2>
        </div>
        <div class="stat">
          <p>Confirmed</p>
          <h2 class="green">0</h2>
        </div>
      </div>

      <!-- LIST -->
      <div class="list">
        <div class="list-header">
          <h3>Daftar Appointments</h3>
          <p>Jadwal pertemuan untuk cek kondisi mobil</p>
        </div>

        <!-- CARD -->
        <div class="card">
          <!-- LEFT IMAGE -->
          <img src="/src/assets/avanza.png" class="car-img" />

          <!-- CENTER -->
          <div class="card-content">
            <h4>Toyota Avanza</h4>
            <p class="price">Rp 250.000.000</p>

            <div class="info">
              <span>📅 8 April 2026</span>
              <span>⏰ 09:00 WIB</span>
            </div>

            <div class="info">
              <span>📞 0812345678</span>
              <span>✉ nama@gmail</span>
            </div>

            <div class="actions">
              <button class="cancel">Cancel</button>
              <button class="detail" @click="goDetail">
                Lihat Detail Mobil
              </button>
            </div>
          </div>

          <!-- STATUS -->
          <div class="status">pending</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goDetail = () => {
  router.push("/detail");
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f6f6f6;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* CONTAINER */
.container {
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 28px;
}

.header p {
  color: gray;
}

/* STATS */
.stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.stat {
  flex: 1;
  max-width: 250px;
  border: 1px solid #e5c96b;
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  background: white;
}

.stat h2 {
  margin-top: 10px;
  color: #caa63a;
}

.green {
  color: #16a34a;
}

/* LIST */
.list {
  background: white;
  border-radius: 16px;
  border: 1px solid #f1d48a;
  padding: 25px;
}

.list-header h3 {
  margin-bottom: 5px;
}

.list-header p {
  color: gray;
  font-size: 14px;
  margin-bottom: 20px;
}

/* CARD */
.card {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #e5c96b;
  border-radius: 14px;
  padding: 20px;
  position: relative;
}

/* IMAGE */
.car-img {
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

/* CONTENT */
.card-content {
  flex: 1;
}

.price {
  color: #caa63a;
  font-weight: bold;
  margin: 5px 0 10px;
}

.info {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
}

/* ACTIONS */
.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.cancel {
  background: #f1f1f1;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
}

.detail {
  background: #caa63a;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  color: white;
}

/* STATUS */
.status {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #eee;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
}
</style>
