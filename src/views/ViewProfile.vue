<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <span class="back" @click="goBack">← Profile</span>
      <p>informasi akun Anda</p>
    </div>

    <!-- PROFILE CARD -->
    <div class="card">
      <!-- TOP -->
      <div class="card-top">
        <div class="avatar">
          <img src="/src/assets/icon-profilekuningkecil.svg" />
        </div>

        <h2>John Doe</h2>
        <p>Member AutoKatalog</p>
      </div>

      <!-- CONTENT -->
      <div class="card-body">
        <h4>Informasi Pribadi</h4>

        <!-- ITEM -->
        <div class="item">
          <div class="icon gold">
            <img src="/src/assets/icon-profilekuning.svg" />
          </div>
          <div>
            <span>Nama Lengkap</span>
            <strong>John Doe</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon green">
            <img src="/src/assets/icon-msghijau.png" />
          </div>
          <div>
            <span>Email</span>
            <strong>john.doe@gmail.com</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon purple">
            <img src="/src/assets/icon-callungu.png" />
          </div>
          <div>
            <span>Nomor Telepon</span>
            <strong>0812 3456 7657</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon orange">
            <img src="/src/assets/icon-calenderyellow.svg" />
          </div>
          <div>
            <span>Bergabung Sejak</span>
            <strong>15 Januari 2026</strong>
          </div>
        </div>

        <!-- BUTTON -->
        <button class="btn-edit" @click="goEdit">
          <img src="/src/assets/icon-edit.png" />
          Edit Profile
        </button>
      </div>
    </div>

    <!-- TIPS -->
    <div class="tips">
      <strong>Tips:</strong>
      Pastikan informasi profil Anda selalu up-to-date agar penjual dapat
      menghubungi Anda dengan mudah untuk jadwal viewing
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goEdit = () => {
  router.push("/profile");
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 40px;
  font-family: "Segoe UI", sans-serif;
}

/* HEADER */
.header {
  margin-bottom: 20px;
}

.back {
  cursor: pointer;
  font-weight: bold;
}

.header p {
  color: #777;
}

/* CARD */
.card {
  max-width: 700px;
  margin: auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* TOP */
.card-top {
  background: #caa63a;
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.avatar {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 30px;
}

/* BODY */
.card-body {
  background: white;
  padding: 30px;
}

.card-body h4 {
  margin-bottom: 20px;
}

/* ITEM */
.item {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}

.item span {
  font-size: 12px;
  color: #777;
}

.item strong {
  display: block;
}

/* ICON */
.icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon img {
  width: 18px;
}

.gold {
  background: #f4e2a4;
}
.green {
  background: #d4f5d4;
}
.purple {
  background: #eadcff;
}
.orange {
  background: #ffe2b3;
}

/* BUTTON */
.btn-edit {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  background: #caa63a;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.btn-edit img {
  width: 18px;
}

/* TIPS */
.tips {
  max-width: 700px;
  margin: 30px auto;
  background: #fff4d6;
  border: 1px solid #f1d58a;
  padding: 20px;
  border-radius: 12px;
  color: #a07a1f;
}
</style>
