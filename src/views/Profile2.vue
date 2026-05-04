<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <span class="back" @click="goBack">← Edit Profile</span>
      <p>Kelola informasi profil Anda</p>
    </div>

    <!-- INFORMASI PROFIL -->
    <div class="card">
      <div class="card-header">
        <div class="icon-circle">👤</div>
        <div>
          <h3>Informasi Profil</h3>
          <p>Update nama lengkap Anda</p>
        </div>
      </div>

      <div class="form">
        <label>Nama Lengkap</label>
        <input type="text" value="John Doe" />

        <label>Email</label>
        <input type="email" value="john.doe@email.com" />

        <label>No. Handphone</label>
        <input type="text" value="0812 5678 3421" />
      </div>

      <div class="actions">
        <button class="btn-outline" @click="goCancel">Batal</button>

        <button class="btn-primary" @click="goSave">
          <img src="/src/assets/icon-save.svg" class="icon-btn" />
          Simpan
        </button>
      </div>
    </div>

    <!-- GANTI PASSWORD -->
    <div class="card">
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

      <div class="form">
        <!-- PASSWORD SAAT INI -->
        <label>Password Saat Ini</label>
        <div class="input-icon">
          <img src="/src/assets/icon-lock.svg" />
          <input type="password" placeholder="Masukkan Password Saat Ini" />
        </div>

        <!-- PASSWORD BARU -->
        <label>Password Baru</label>
        <div class="input-icon">
          <img src="/src/assets/icon-lock.svg" />
          <input
            type="password"
            placeholder="Masukkan Password Baru (min. 6 karakter)"
          />
        </div>

        <!-- KONFIRMASI -->
        <label>Konfirmasi Password Baru</label>
        <div class="input-icon">
          <img src="/src/assets/icon-lock.svg" />
          <input type="password" placeholder="Konfirmasi Password Baru" />
        </div>
      </div>

      <div class="actions">
        <button class="btn-outline" @click="goCancel">Batal</button>

        <button class="btn-primary" @click="goChangePassword">
          🔒 Ganti Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goSave = () => {
  router.push("/home"); // bebas
};

const goCancel = () => {
  router.push("/home");
};

const goChange = () => {
  router.push("/change-password"); // opsional page lain
};

const goChangePassword = () => {
  router.push("/home"); // setelah submit
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

/* CARD */
.card {
  background: white;
  border-radius: 14px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
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
}

.icon-lock {
  width: 22px;
}

/* FORM */
.form input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background: #f9f9f9;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
.form input:focus {
  border-color: #caa63a;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(202, 166, 58, 0.15);
}
.form input::placeholder {
  color: #aaa;
}

/* INPUT ICON */
.input-icon {
  display: flex;
  align-items: center;
  background: #eee;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
}

.input-icon img {
  width: 18px;
}

.input-icon input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
}

/* ACTION */
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

.change {
  color: red;
  cursor: pointer;
}
</style>
