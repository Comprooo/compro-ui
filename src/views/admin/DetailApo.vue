<template>
  <div class="page">
    <!-- TOPBAR -->
    <div class="topbar">
      <div class="back-btn" @click="goBack">
        <span>←</span>
        <p>Kembali ke Daftar Appointments</p>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="container">
      <!-- IMAGE -->
      <img src="/src/assets/civic.png" class="banner-image" />

      <!-- CARD -->
      <div class="card">
        <!-- NAMA -->
        <div class="field">
          <label>Nama Pelanggan</label>

          <div class="input-box">namakau</div>
        </div>

        <!-- MOBIL -->
        <div class="field">
          <label>Nama Kendaraan</label>

          <div class="input-box">Honda Civic Type R</div>
        </div>

        <!-- APPOINTMENT -->
        <div class="field">
          <label>Informasi Appointments</label>

          <p class="desc">
            Informasi data pelanggan dan jadwal appointment yang diajukan
          </p>

          <div class="info-box">
            <div class="info-item">
              <img src="/src/assets/admin/icon-calendar2.svg" />
              <span>10 April 2026</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-jam.svg" />
              <span>16:00 WIB</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-callungu.png" />
              <span>0812345678</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-msghijau.png" />
              <span>namku@gmail</span>
            </div>
          </div>
        </div>

        <!-- LOKASI -->
        <div class="field">
          <label>Lokasi Appointment</label>

          <div class="input-box">Rumah abang</div>
        </div>

        <!-- PESAN -->
        <div class="field">
          <label>Pesan (Opsional)</label>

          <div class="textarea-box">
            request lokasi appointmentnya di kantor...bole?
          </div>
        </div>

        <!-- STATUS -->
        <div class="status-wrapper">
          <button
            class="status-btn"
            :class="{ active: selectedStatus === 'confirmed' }"
            @click="selectedStatus = 'confirmed'"
          >
            Konfirmasi
          </button>

          <button
            class="status-btn reject"
            :class="{ activeReject: selectedStatus === 'rejected' }"
            @click="selectedStatus = 'rejected'"
          >
            Tolak
          </button>
        </div>

        <!-- UPDATE -->
        <button class="update-btn" @click="updateStatus">
          Perbarui Status Appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const selectedStatus = ref("confirmed");

/* ROUTER */
const goBack = () => {
  router.push("/admin/appointment");
};

/* ALERT */
const updateStatus = () => {
  Swal.fire({
    html: `
      <div class="success-alert">
        <img src="/src/assets/icon-check2.svg" class="success-icon" />

        <h2>Status Appointment Berhasil Diperbarui!</h2>

        <button class="back-alert-btn">
          Kembali ke Daftar Appointments
        </button>
      </div>
    `,

    showConfirmButton: false,

    background: "#ffffff",

    width: 420,

    customClass: {
      popup: "custom-popup",
    },
  });

  setTimeout(() => {
    const btn = document.querySelector(".back-alert-btn");

    if (btn) {
      btn.addEventListener("click", async () => {
        await Swal.close();
        router.push("/admin/appointment");
      });
    }
  }, 100);
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7f7f7;

  font-family: "Segoe UI", sans-serif;
}

/* TOPBAR */
.topbar {
  height: 92px;

  background: white;

  border-bottom: 1px solid #e8e1cc;

  display: flex;
  align-items: center;

  padding: 0 44px;
}

/* BACK */
.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
}

.back-btn span {
  font-size: 24px;
}

.back-btn p {
  font-size: 20px;
  color: #111;
}

/* CONTAINER */
.container {
  width: 100%;
  max-width: 920px;

  margin: 44px auto 80px;
}

/* IMAGE */
.banner-image {
  width: 100%;
  height: 420px;

  object-fit: cover;

  border-radius: 16px;

  margin-bottom: 22px;
}

/* CARD */
.card {
  background: white;

  border-radius: 18px;

  padding: 30px;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

/* FIELD */
.field {
  margin-bottom: 24px;
}

.field label {
  display: block;

  font-size: 18px;
  font-weight: 700;

  color: #111;

  margin-bottom: 10px;
}

/* DESC */
.desc {
  color: #7b7b7b;
  font-size: 16px;

  margin-bottom: 14px;
}

/* INPUT */
.input-box,
.textarea-box {
  width: 100%;

  background: #f6f6f6;

  border-radius: 10px;

  padding: 16px 18px;

  color: #222;

  font-size: 16px;
}

.textarea-box {
  min-height: 82px;
}

/* INFO BOX */
.info-box {
  border: 1px solid #e2c567;

  border-radius: 14px;

  padding: 22px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 22px 30px;
}

/* ITEM */
.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-item img {
  width: 18px;
  height: 18px;

  object-fit: contain;

  opacity: 0.7;
}

.info-item span {
  color: #727272;
  font-size: 16px;
}

/* STATUS */
.status-wrapper {
  display: flex;
  gap: 20px;

  margin-bottom: 22px;
}

/* BUTTON */
.status-btn {
  flex: 1;

  height: 50px;

  border-radius: 10px;
  border: 1px solid #d9d9d9;

  background: white;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.status-btn.active {
  background: #09c742;
  color: white;

  border: none;

  box-shadow: 0 4px 12px rgba(9, 199, 66, 0.25);
}

.reject.activeReject {
  background: #ff2d2d;
  color: white;

  border: none;

  box-shadow: 0 4px 12px rgba(255, 45, 45, 0.25);
}

/* UPDATE */
.update-btn {
  width: 100%;
  height: 52px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  color: #111;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.update-btn:hover {
  transform: translateY(-2px);
}

/* ALERT */
:global(.custom-popup) {
  border-radius: 16px !important;

  padding: 24px 20px !important;
}

:global(.success-alert) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

:global(.success-icon) {
  width: 52px;

  margin-bottom: 14px;
}

:global(.success-alert h2) {
  font-size: 20px;
  font-weight: 700;

  color: #111;

  margin-bottom: 22px;
}

:global(.back-alert-btn) {
  width: 100%;
  height: 42px;

  border-radius: 8px;
  border: 1px solid #d4af37;

  background: white;

  font-size: 14px;

  cursor: pointer;

  transition: 0.2s;
}

:global(.back-alert-btn:hover) {
  background: #d4af37;
  color: white;
}
</style>
