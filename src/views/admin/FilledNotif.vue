<template>
  <div class="page">
    <!-- TOPBAR -->
    <div class="topbar">
      <!-- BACK -->
      <div class="back-btn" @click="goDashboard">
        <span>←</span>
        <p>Kembali ke Dashboard</p>
      </div>

      <!-- DELETE ALL -->
      <button class="delete-all-btn" @click="deleteAllNotif">
        <img src="/src/assets/admin/icon-trashred.svg" />
      </button>
    </div>

    <!-- NOTIFICATION LIST -->
    <div class="notif-wrapper">
      <!-- CARD -->
      <div class="notif-card" v-for="(item, index) in notifList" :key="index">
        <!-- IMAGE -->
        <img :src="item.image" class="car-image" />

        <!-- CONTENT -->
        <div class="notif-content">
          <h2>{{ item.car }}</h2>

          <h3>Nama : {{ item.name }}</h3>

          <!-- INFO -->
          <div class="info-grid">
            <div class="info-item">
              <img src="/src/assets/admin/icon-calendar2.svg" />
              <span>{{ item.date }}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-jam.svg" />
              <span>{{ item.time }}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-callungu.png" />
              <span>{{ item.phone }}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-msghijau.png" />
              <span>{{ item.email }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="notif-right">
          <!-- STATUS -->
          <div class="status">
            {{ item.status }}
          </div>

          <!-- DETAIL -->
          <button class="detail-btn" @click="goDetail">
            Lihat Detail Informasi
          </button>
        </div>

        <!-- DELETE -->
        <button class="trash-btn" @click="deleteNotif(item.car)">
          <img src="/src/assets/admin/icon-trashred.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

/* DATA */
const notifList = [
  {
    car: "Toyota Avanza",
    name: "namamu",
    date: "8 April 2026",
    time: "09:00 WIB",
    phone: "0812345678",
    email: "nama@gmail",
    status: "Tertunda",
    image: "/src/assets/avanza.png",
  },

  {
    car: "Toyota Avanza",
    name: "yourname",
    date: "11 April 2026",
    time: "09:00 WIB",
    phone: "0812345678",
    email: "youw@gmail",
    status: "Tertunda",
    image: "/src/assets/avanza.png",
  },

  {
    car: "Honda Civic Type R",
    name: "namakau",
    date: "10 April 2026",
    time: "16:00 WIB",
    phone: "0812345678",
    email: "namku@gmail",
    status: "Tertunda",
    image: "/src/assets/civic.png",
  },
];

/* ROUTER */
const goDashboard = () => {
  router.push("/admin/dashboard");
};

const goDetail = () => {
  router.push("/admin/detail");
};

/* DELETE SINGLE */
const deleteNotif = (name) => {
  Swal.fire({
    title: "Hapus Notif?",
    text: `Notif "${name}" akan dihapus.`,
    showCancelButton: true,

    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Tidak",

    reverseButtons: true,

    background: "#ffffff",

    confirmButtonColor: "#d4af37",
    cancelButtonColor: "#ffffff",

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      htmlContainer: "custom-html",
      actions: "custom-actions",
      confirmButton: "confirm-btn",
      cancelButton: "cancel-btn",
    },
  });
};

/* DELETE ALL */
const deleteAllNotif = () => {
  Swal.fire({
    title: "Hapus Notif?",
    text: "Semua notifikasi akan dihapus. Apakah Anda yakin?",

    showCancelButton: true,

    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Tidak",

    reverseButtons: true,

    background: "#ffffff",

    confirmButtonColor: "#d4af37",
    cancelButtonColor: "#ffffff",

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      htmlContainer: "custom-html",
      actions: "custom-actions",
      confirmButton: "confirm-btn",
      cancelButton: "cancel-btn",
    },
  });
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

  border-bottom: 1px solid #e9e3cf;

  padding: 0 44px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

/* DELETE ALL */
.delete-all-btn {
  background: transparent;
  border: none;

  cursor: pointer;
}

.delete-all-btn img {
  width: 42px;
}

/* WRAPPER */
.notif-wrapper {
  width: 100%;
  max-width: 1140px;

  margin: 34px auto;

  display: flex;
  flex-direction: column;
  gap: 26px;
}

/* CARD */
.notif-card {
  position: relative;

  background: white;

  border: 1px solid #e2c567;

  border-radius: 16px;

  padding: 26px 24px;

  display: flex;
  align-items: flex-start;
  gap: 26px;
}

/* IMAGE */
.car-image {
  width: 190px;
  height: 126px;

  border-radius: 14px;

  object-fit: cover;
}

/* CONTENT */
.notif-content {
  flex: 1;
}

.notif-content h2 {
  font-size: 22px;
  font-weight: 700;

  color: #111;

  margin-bottom: 8px;
}

.notif-content h3 {
  font-size: 18px;
  font-weight: 700;

  color: #707070;

  margin-bottom: 22px;
}

/* INFO */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 16px 34px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-item img {
  width: 18px;
  height: 18px;

  object-fit: contain;

  opacity: 0.7;
}

.info-item span {
  color: #757575;
  font-size: 16px;
}

/* RIGHT */
.notif-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 126px;
}

/* STATUS */
.status {
  background: #f2f2f2;

  padding: 6px 14px;

  border-radius: 999px;

  font-size: 14px;
  font-weight: 600;

  color: #333;
}

/* DETAIL */
.detail-btn {
  height: 44px;

  padding: 0 20px;

  border: none;
  border-radius: 12px;

  background: #d4af37;

  color: #111;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.detail-btn:hover {
  transform: translateY(-2px);
}

/* TRASH */
.trash-btn {
  position: absolute;

  left: 28px;
  bottom: 18px;

  background: transparent;
  border: none;

  cursor: pointer;
}

.trash-btn img {
  width: 22px;
}

/* SWEET ALERT */
:global(.custom-popup) {
  border-radius: 14px !important;
  padding: 16px 18px 20px !important;
  font-family: "Segoe UI", sans-serif;
}

/* TITLE */
:global(.custom-title) {
  font-size: 18px !important;
  text-align: left !important;
  color: #111 !important;
  padding-bottom: 6px !important;
}

/* TEXT */
:global(.custom-html) {
  font-size: 14px !important;
  color: #777 !important;
  text-align: left !important;
  margin-top: 0 !important;
}

/* BUTTON WRAPPER */
:global(.custom-actions) {
  width: 100%;
  justify-content: flex-end !important;
  gap: 10px;
}

/* CONFIRM */
:global(.confirm-btn) {
  border-radius: 8px !important;
  padding: 10px 18px !important;
  font-weight: 600 !important;
  color: #111 !important;
}

/* CANCEL */
:global(.cancel-btn) {
  border-radius: 8px !important;
  padding: 10px 18px !important;
  border: 1px solid #d9d9d9 !important;
  color: #111 !important;
}
</style>
