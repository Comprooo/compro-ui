<template>
  <div class="profile-page">
    <!-- HEADER -->
    <div class="topbar">
      <div class="back-section" @click="goBack">
        <span class="back-icon">←</span>

        <div>
          <h2>Profil</h2>
          <p>informasi akun Anda</p>
        </div>
      </div>
    </div>

    <!-- CARD -->
    <div class="profile-card">
      <!-- TOP -->
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="/src/assets/icon-profilekuning.svg" alt="" />
        </div>

        <h1>John Doe</h1>
        <p>Admin AutoKatalog</p>
      </div>

      <!-- CONTENT -->
      <div class="profile-content">
        <h3>Informasi Pribadi</h3>

        <!-- ITEM -->
        <div class="info-item">
          <div class="icon-circle yellow">
            <img src="/src/assets/icon-profilekuning.svg" alt="" />
          </div>

          <div class="info-text">
            <span>Nama Lengkap</span>
            <h4>John Doe</h4>
          </div>
        </div>

        <!-- ITEM -->
        <div class="info-item">
          <div class="icon-circle green">
            <img src="/src/assets/icon-msghijau.png" alt="" />
          </div>

          <div class="info-text">
            <span>Email</span>
            <h4>john.doe@gmail.com</h4>
          </div>
        </div>

        <!-- ITEM -->
        <div class="info-item">
          <div class="icon-circle purple">
            <img src="/src/assets/icon-callungu.png" alt="" />
          </div>

          <div class="info-text">
            <span>Nomor Telepon</span>
            <h4>0812 3456 7657</h4>
          </div>
        </div>

        <!-- ITEM -->
        <div class="info-item">
          <div class="icon-circle orange">
            <img
              src="/src/assets/icon-instagram.svg"
              alt=""
              class="instagram-icon"
            />
          </div>

          <div class="info-text">
            <span>Instagram</span>
            <h4>@adminjohn</h4>
          </div>
        </div>

        <!-- BUTTON -->
        <button class="edit-btn" @click="goEditProfile">
          <img src="/src/assets/admin/icon-edit.svg" alt="" />
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/admin/dashboard");
};

const goEditProfile = () => {
  router.push("/admin/editprofile");
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* TOPBAR */
.topbar {
  height: 92px;
  background: white;
  border-bottom: 1px solid #e7e7e7;

  display: flex;
  align-items: center;

  padding: 0 36px;
}

.back-section {
  display: flex;
  align-items: center;
  gap: 14px;

  cursor: pointer;
}

.back-icon {
  font-size: 28px;
  color: #111;
}

.back-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.back-section p {
  font-size: 14px;
  color: #666;
}

/* CARD */
.profile-card {
  width: 740px;

  margin: 40px auto;

  background: white;
  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

/* HEADER */
.profile-header {
  height: 290px;
  background: #d4af37;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-avatar {
  width: 96px;
  height: 96px;

  background: white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}

.profile-avatar img {
  width: 48px;
}

.profile-header h1 {
  font-size: 22px;
  color: white;
  font-weight: 700;
  margin-bottom: 6px;
}

.profile-header p {
  color: white;
  font-size: 18px;
}

/* CONTENT */
.profile-content {
  padding: 34px 36px 30px;
}

.profile-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 34px;
  color: #111;
}

/* INFO ITEM */
.info-item {
  display: flex;
  align-items: center;
  gap: 18px;

  margin-bottom: 34px;
}

.icon-circle {
  width: 54px;
  height: 54px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-circle img {
  width: 24px;
}

.yellow {
  background: #f6edcf;
}

.green {
  background: #dff5d9;
}

.purple {
  background: #eedcff;
}

.orange {
  background: #ffe5c6;
}

.instagram-icon {
  width: 26px;
}

.info-text span {
  font-size: 16px;
  color: #7b7b7b;
}

.info-text h4 {
  font-size: 19px;
  font-weight: 700;
  color: #111;

  margin-top: 4px;
}

/* BUTTON */
.edit-btn {
  width: 100%;
  height: 56px;

  border: none;
  border-radius: 12px;

  background: #d4af37;
  color: #111;

  font-size: 20px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  margin-top: 30px;

  transition: 0.2s;
}

.edit-btn:hover {
  opacity: 0.9;
}

.edit-btn img {
  width: 22px;
}
</style>
