<template>
  <div class="page">
    <!-- TOPBAR -->
    <div class="topbar">
      <!-- BACK -->
      <div class="back-btn" @click="goDashboard">
        <span>←</span>
        <p>Kembali ke Dashboard</p>
      </div>

      <!-- DELETE -->
      <button class="trash-btn" @click="deleteNotif">
        <img src="/src/assets/admin/icon-trashred.svg" />
      </button>
    </div>

    <!-- CONTENT -->
    <div class="empty-wrapper">
      <img src="/src/assets/admin/muka.png" class="empty-icon" />

      <h1>Notifikasi Kosong</h1>

      <p>Tidak ada notifikasi yang masuk untuk saat ini</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

/* ROUTER */
const goDashboard = () => {
  router.push("/admin/dashboard");
};

/* DELETE */
const deleteNotif = () => {
  Swal.fire({
    title: "Hapus semua notifikasi?",
    text: "Semua notifikasi akan dihapus permanen.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",

    reverseButtons: true,

    background: "#ffffff",

    confirmButtonColor: "#ff1d1d",
    cancelButtonColor: "#16c24a",

    customClass: {
      popup: "notif-popup",
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

  border-bottom: 1px solid #ece7d6;

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
  color: #111;
}

.back-btn p {
  font-size: 20px;
  color: #111;
}

/* DELETE BUTTON */
.trash-btn {
  background: transparent;
  border: none;

  cursor: pointer;

  transition: 0.2s;
}

.trash-btn:hover {
  transform: scale(1.08);
}

.trash-btn img {
  width: 42px;
}

/* EMPTY */
.empty-wrapper {
  min-height: calc(100vh - 92px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: translateY(-50px);
}

/* ICON */
.empty-icon {
  width: 110px;

  opacity: 0.55;

  margin-bottom: 18px;
}

/* TITLE */
.empty-wrapper h1 {
  font-size: 34px;
  font-weight: 700;

  color: #767676;

  margin-bottom: 10px;

  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

/* DESC */
.empty-wrapper p {
  font-size: 24px;

  color: #8d8d8d;
}

/* SWEET ALERT */
:global(.notif-popup) {
  border-radius: 18px;
  font-family: "Segoe UI", sans-serif;
}
</style>
