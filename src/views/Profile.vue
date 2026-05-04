<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <span class="back" @click="goBack">← Kembali ke Detail Mobil</span>
      <h2>Edit Profile</h2>
      <p>Kelola informasi profil Anda</p>
    </div>

    <!-- CARD PROFILE -->
    <div class="card">
      <div class="card-header">
        <div class="icon-circle">👤</div>
        <div>
          <h3>Informasi Profil</h3>
          <p>Update Profile Anda</p>
        </div>
      </div>

      <div class="form">
        <label>Nama Lengkap</label>
        <input type="text" placeholder="Nama lengkap" />

        <label>Email</label>
        <input type="email" placeholder="nama@email.com" />

        <label>No. Handphone</label>
        <input type="text" placeholder="08xx xxxx xxxx" />
      </div>

      <div class="actions">
        <button class="btn-outline" @click="goCancel">Batal</button>

        <button class="btn-primary" @click="goSave">
          <img src="/src/assets/icon-save.svg" class="icon-btn" />
          Simpan
        </button>
      </div>
    </div>

    <!-- CARD PASSWORD -->
    <div class="card small">
      <div class="card-header space">
        <div class="left">
          <div class="icon-circle">
            <img src="/src/assets/icon-lock.svg" class="icon-lock" />
          </div>

          <div>
            <h3>Ganti Password</h3>
            <p>Update password akun Anda</p>
          </div>
        </div>

        <span class="change" @click="goChange">Ganti</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goSave = () => {
  router.push("/home"); // redirect bebas (sementara ke home)
};

const goCancel = () => {
  router.push("/home"); // bisa ke profile / home
};

const goBack = () => {
  router.back();
};
const goChange = () => {
  router.push("/profile2");
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
  color: #333;
  font-size: 14px;
}

.header h2 {
  margin: 10px 0 5px;
}

.header p {
  color: #777;
  font-size: 14px;
}

/* CARD */
.card {
  background: white;
  border-radius: 14px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.small {
  padding: 20px;
}

/* HEADER CARD */
.card-header {
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
}

.space {
  justify-content: space-between;
}

.left {
  display: flex;
  gap: 15px;
  align-items: center;
}

/* ICON */
.icon-circle {
  width: 50px;
  height: 50px;
  background: #d4af37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
}

.icon-lock {
  width: 22px;
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form input {
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #eee;
  outline: none;
}

/* ACTIONS */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.btn-outline {
  padding: 10px 30px;
  border-radius: 10px;
  border: 1px solid #d4af37;
  background: white;
  cursor: pointer;
}

.btn-primary {
  padding: 10px 30px;
  border-radius: 10px;
  background: #d4af37;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.icon-btn {
  width: 16px;
}

/* CHANGE TEXT */
.change {
  color: red;
  cursor: pointer;
  font-size: 14px;
}
</style>
