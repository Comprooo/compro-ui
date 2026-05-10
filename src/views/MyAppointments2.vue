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
          <p>Total<br />Appointments</p>
          <h2>3</h2>
        </div>

        <div class="card">
          <p>Pending</p>
          <h2>1</h2>
        </div>

        <div class="card">
          <p>Confirmed</p>
          <h2 class="green">1</h2>
        </div>

        <div class="card">
          <p>Declined</p>
          <h2 class="red">1</h2>
        </div>
      </div>

      <!-- APPOINTMENTS -->
      <div class="appointment-wrapper">
        <div class="header">
          <h3>Daftar Appointments</h3>
          <p>Jadwal pertemuan untuk cek kondisi mobil</p>
        </div>

        <!-- DECLINED -->
        <div class="appointment-card">
          <img src="/src/assets/civic.png" class="car-image" />

          <div class="appointment-content">
            <div class="top-row">
              <div>
                <h2>Honda Civic Type R</h2>
                <h3>Rp 950.000.000</h3>
              </div>

              <span class="status declined"> declined </span>
            </div>

            <div class="info-grid">
              <div class="info-item">📅 9 Mei 2026</div>

              <div class="info-item">🕘 13:00 WIB</div>

              <div class="info-item">📞 081234567891</div>

              <div class="info-item">✉️ user@example.com</div>
            </div>

            <div class="message-box">
              <strong>Pesan:</strong>
              <p>Ingin cek kondisi interior</p>
            </div>

            <div class="declined-alert">
              <strong>⚠ Appointment Ditolak</strong>
              <p>Jadwal tidak tersedia, mohon pilih waktu lain</p>
            </div>

            <div class="button-group">
              <button class="detail-btn" @click="goDetail">
                Lihat Detail Mobil
              </button>

              <button class="reschedule-btn" @click="goReschedule">
                ↻ Reschedule
              </button>
            </div>

            <button class="cancel-btn" @click="cancelAppointment">
              ✕ Cancel Appointment
            </button>
          </div>
        </div>

        <!-- PENDING -->
        <div class="appointment-card">
          <img src="/src/assets/avanza.png" class="car-image" />

          <div class="appointment-content">
            <div class="top-row">
              <div>
                <h2>Toyota Avanza</h2>
                <h3>Rp 250.000.000</h3>
              </div>

              <span class="status pending"> pending </span>
            </div>

            <div class="info-grid">
              <div class="info-item">📅 8 April 2026</div>

              <div class="info-item">🕘 09:00 WIB</div>

              <div class="info-item">📞 0812345678</div>

              <div class="info-item">✉️ nama@gmail.com</div>
            </div>

            <div class="button-group">
              <button class="cancel-outline" @click="cancelPermanent">
                Cancel
              </button>

              <button class="detail-btn" @click="goDetail">
                Lihat Detail Mobil
              </button>
            </div>
          </div>
        </div>

        <!-- CONFIRMED -->
        <div class="appointment-card">
          <img src="/src/assets/avanza.png" class="car-image" />

          <div class="appointment-content">
            <div class="top-row">
              <div>
                <h2>Toyota Avanza</h2>
                <h3>Rp 250.000.000</h3>
              </div>

              <span class="status confirmed"> confirmed </span>
            </div>

            <div class="info-grid">
              <div class="info-item">📅 12 Mei 2026</div>

              <div class="info-item">🕘 09:00 WIB</div>

              <div class="info-item">📞 081234567891</div>

              <div class="info-item">✉️ user@example.com</div>
            </div>

            <div class="message-box">
              <strong>Pesan:</strong>
              <p>Alamat</p>
            </div>

            <div class="button-group">
              <button class="detail-btn" @click="goDetail">
                Lihat Detail Mobil
              </button>

              <a
                href="https://wa.me/62895703044378"
                target="_blank"
                class="wa-btn"
              >
                💬 Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

/* ROUTING */
const goHome = () => router.push("/");
const goTentang = () => router.push("/about");
const goKatalog = () => router.push("/katalog");
const goAI = () => router.push("/ai");
const goReschedule = () => router.push("/reschedule");
const goProfile = () => router.push("/profile");
const goDetail = () => router.push("/detail");

/* ALERT RESCHEDULE */
const cancelAppointment = () => {
  Swal.fire({
    title: "Cancel Appointment?",
    text: "Appointment akan dibatalkan dan Anda dapat mengatur ulang jadwal baru. Apakah Anda yakin?",
    showCancelButton: true,
    confirmButtonText: "Ya, Reschedule",
    cancelButtonText: "Tidak",
    background: "#fff",
    confirmButtonColor: "#d4af37",
    cancelButtonColor: "#ff4d4f",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      router.push("/appointments");
    }
  });
};

/* ALERT BATALKAN */
const cancelPermanent = () => {
  Swal.fire({
    title: "Batalkan Appointment?",
    text: "Appointment ini akan dibatalkan secara permanen. Apakah Anda yakin?",
    showCancelButton: true,
    confirmButtonText: "Ya, Batalkan",
    cancelButtonText: "Tidak",
    background: "#fff",
    confirmButtonColor: "red",
    cancelButtonColor: "green",
    reverseButtons: true,
  });
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* NAVBAR */
.navbar {
  height: 90px;
  background: white;
  border-bottom: 1px solid #ececec;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 50px;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-circle {
  width: 44px;
  height: 44px;
  background: #d4af37;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-circle img {
  width: 22px;
}

.logo-text strong {
  font-size: 18px;
}

.logo-text p {
  font-size: 12px;
  color: #caa63a;
}

/* MENU */
.menu {
  display: flex;
  gap: 42px;
}

.menu a {
  font-size: 18px;
  cursor: pointer;
}

/* ACTIONS */
.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.ai {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.ai img {
  width: 20px;
}

.appointment-btn {
  border: 1px solid #d4af37;
  background: white;

  height: 40px;
  padding: 0 16px;

  border-radius: 10px;
  cursor: pointer;
}

.profile {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile img {
  width: 100%;
  height: 100%;
}

/* CONTAINER */
.container {
  width: 760px;
  margin: 30px auto;
}

/* TITLE */
.container h1 {
  font-size: 50px;
}

.subtitle {
  color: #7d7d7d;
  margin-top: 6px;
}

/* STATS */
.stats {
  display: flex;
  gap: 14px;
  margin-top: 28px;
}

.card {
  width: 170px;
  height: 150px;

  border: 1px solid #f0dfb2;
  border-radius: 18px;

  background: white;
  padding: 22px;
}

.card p {
  color: #777;
  line-height: 1.4;
}

.card h2 {
  margin-top: 46px;
  font-size: 40px;
  color: #d0a92d;
}

.green {
  color: #18bf47 !important;
}

.red {
  color: #ff2d2d !important;
}

/* WRAPPER */
.appointment-wrapper {
  margin-top: 24px;

  border: 1px solid #f0dfb2;
  border-radius: 18px;

  background: white;
  padding: 20px;
}

.header h3 {
  font-size: 20px;
}

.header p {
  color: #777;
  margin-top: 5px;
}

/* CARD */
.appointment-card {
  margin-top: 24px;

  border: 1px solid #e5c86d;
  border-radius: 18px;

  padding: 18px;

  display: flex;
  gap: 18px;
}

/* IMAGE */
.car-image {
  width: 160px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
}

/* CONTENT */
.appointment-content {
  flex: 1;
}

/* TOP */
.top-row {
  display: flex;
  justify-content: space-between;
}

.top-row h2 {
  font-size: 22px;
}

.top-row h3 {
  margin-top: 6px;
  color: #d0a92d;
  font-size: 18px;
}

/* STATUS */
.status {
  height: 28px;
  padding: 0 12px;

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 600;
}

.declined {
  background: #e52b2b;
  color: white;
}

.pending {
  background: #efefef;
}

.confirmed {
  background: #d4af37;
}

/* INFO */
.info-grid {
  margin-top: 16px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-item {
  color: #777;
}

/* MESSAGE */
.message-box {
  margin-top: 14px;

  background: #f5f5f5;
  border-radius: 10px;

  padding: 12px;
}

.message-box p {
  margin-top: 4px;
  color: #666;
}

/* ALERT */
.declined-alert {
  margin-top: 14px;

  background: #fff1f1;
  border: 1px solid #ffb9b9;

  border-radius: 10px;
  padding: 12px;
}

.declined-alert strong {
  color: #e12c2c;
}

.declined-alert p {
  margin-top: 6px;
  color: #e12c2c;
}

/* BUTTONS */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.detail-btn {
  height: 38px;
  padding: 0 16px;

  border: 1px solid #ddd;
  background: white;

  border-radius: 10px;
  cursor: pointer;
}

.reschedule-btn {
  height: 38px;
  padding: 0 16px;

  border: none;
  background: #d4af37;

  border-radius: 10px;
  cursor: pointer;
}

.cancel-btn {
  margin-top: 10px;

  height: 38px;
  padding: 0 16px;

  border: 1px solid #ddd;
  background: white;

  border-radius: 10px;
  cursor: pointer;
}

.cancel-outline {
  height: 38px;
  width: 120px;

  border: 1px solid #ddd;
  background: white;

  border-radius: 10px;
  cursor: pointer;
}

.wa-btn {
  height: 38px;
  padding: 0 18px;

  background: #00b83e;
  color: black;
  text-decoration: none;

  border-radius: 10px;

  display: flex;
  align-items: center;
}
</style>
