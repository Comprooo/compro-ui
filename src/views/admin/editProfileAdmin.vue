<template>
  <div class="edit-profile-page">
    <!-- HEADER -->
    <div class="topbar">
      <div class="back-wrapper" @click="goBack">
        <span class="back-icon">←</span>

        <div>
          <h2>Edit Profil</h2>
          <p>Kelola informasi profil Anda</p>
        </div>
      </div>
    </div>

    <!-- PROFILE CARD -->
    <div class="card">
      <div class="card-header">
        <div class="header-left">
          <div class="header-icon">
            <img src="/src/assets/profile-icon.svg" alt="" />
          </div>

          <div>
            <h3>Informasi Profil</h3>
            <p>Update nama lengkap Anda</p>
          </div>
        </div>
      </div>

      <!-- FORM -->
      <div class="form-group">
        <label>Nama Lengkap</label>

        <div class="input-wrapper">
          <img src="/src/assets/profile-icon.svg" alt="" />
          <input type="text" v-model="profile.name" />
        </div>
      </div>

      <div class="form-group">
        <label>Email</label>

        <div class="input-wrapper">
          <img src="/src/assets/email-icon.svg" alt="" />
          <input type="email" v-model="profile.email" />
        </div>
      </div>

      <div class="form-group">
        <label>No. Handphone</label>

        <div class="input-wrapper">
          <img src="/src/assets/telp-icon.svg" alt="" />
          <input type="text" v-model="profile.phone" />
        </div>
      </div>

      <div class="form-group">
        <label>Instagram</label>

        <div class="input-wrapper">
          <img src="/src/assets/icon-igputih.svg" alt="" />
          <input type="text" v-model="profile.instagram" />
        </div>
      </div>

      <!-- BUTTON -->
      <div class="button-row">
        <button class="cancel-btn" @click="goProfile">Batal</button>

        <button class="save-btn" @click="saveProfile">
          <img src="/src/assets/icon-save.svg" alt="" />
          Simpan
        </button>
      </div>
    </div>

    <!-- PASSWORD CARD -->
    <div class="card password-card">
      <div class="card-header">
        <div class="header-left">
          <div class="header-icon">
            <img src="/src/assets/icon-lock.svg" alt="" />
          </div>

          <div>
            <h3>Ganti Password</h3>
            <p>Update password akun Anda</p>
          </div>
        </div>

        <button class="expand-btn" @click="showPassword = !showPassword">
          {{ showPassword ? "Tutup" : "Ganti" }}
        </button>
      </div>

      <!-- EXPAND -->
      <transition name="expand">
        <div v-if="showPassword" class="password-content">
          <div class="form-group">
            <label>Password Saat Ini</label>

            <div class="input-wrapper">
              <input
                type="password"
                placeholder="Masukkan Password Saat Ini"
                v-model="password.oldPassword"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Password Baru</label>

            <div class="input-wrapper">
              <input
                type="password"
                placeholder="Masukkan Password Baru (min. 6 karakter)"
                v-model="password.newPassword"
              />
            </div>
          </div>

          <div class="form-group">
            <label>Konfirmasi Password Baru</label>

            <div class="input-wrapper">
              <input
                type="password"
                placeholder="Konfirmasi Password Baru"
                v-model="password.confirmPassword"
              />
            </div>
          </div>

          <div class="button-row">
            <button class="cancel-btn" @click="showPassword = false">
              Batal
            </button>

            <button class="save-btn" @click="changePassword">
              <img src="/src/assets/icon-lock.svg" alt="" />
              Ganti Password
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showPassword = ref(false);

const profile = ref({
  name: "John Doe",
  email: "john.doe@gmail.com",
  phone: "0812 5678 3421",
  instagram: "adminjohn",
});

const password = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const goBack = () => {
  router.push("/admin/profileadmin");
};

const goProfile = () => {
  router.push("/admin/profileadmin");
};

const saveProfile = () => {
  Swal.fire({
    html: `
      <div class="custom-success-alert">
        <div class="success-circle">
          ✓
        </div>

        <h2>Profile berhasil diperbarui!</h2>

        <p>Informasi profile berhasil disimpan.</p>

        <button class="success-btn">
          Kembali
        </button>
      </div>
    `,
    showConfirmButton: false,
    background: "#d4af37",
    width: 500,
    padding: "40px 30px",
    customClass: {
      popup: "success-popup",
    },
  });

  setTimeout(() => {
    const btn = document.querySelector(".success-btn");

    if (btn) {
      btn.addEventListener("click", () => {
        Swal.close();
        router.push("/admin/profileadmin");
      });
    }
  }, 100);
};

const changePassword = () => {
  Swal.fire({
    html: `
      <div class="custom-success-alert">
        <div class="success-circle">
          ✓
        </div>

        <h2>Password berhasil diganti!</h2>

        <p>Password akun berhasil diperbarui.</p>

        <button class="success-btn">
          Kembali
        </button>
      </div>
    `,
    showConfirmButton: false,
    background: "#d4af37",
    width: 500,
    padding: "40px 30px",
    customClass: {
      popup: "success-popup",
    },
  });

  setTimeout(() => {
    const btn = document.querySelector(".success-btn");

    if (btn) {
      btn.addEventListener("click", () => {
        Swal.close();
        router.push("/admin/profileadmin");
      });
    }
  }, 100);
};
</script>

<style scoped>
.edit-profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* TOPBAR */
.topbar {
  height: 90px;
  background: white;
  border-bottom: 1px solid #e6e6e6;

  display: flex;
  align-items: center;

  padding: 0 34px;
}

.back-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;

  cursor: pointer;
}

.back-icon {
  font-size: 28px;
}

.back-wrapper h2 {
  font-size: 20px;
  font-weight: 700;
}

.back-wrapper p {
  font-size: 14px;
  color: #666;
}

/* CARD */
.card {
  width: 760px;

  margin: 38px auto;

  background: white;

  border-radius: 18px;
  border: 1px solid #ecd78f;

  padding: 34px;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.password-card {
  margin-top: 0;
}

/* HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 36px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.header-icon {
  width: 56px;
  height: 56px;

  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
}

.header-icon img {
  width: 26px;
}

.header-left h3 {
  font-size: 20px;
  font-weight: 700;
}

.header-left p {
  font-size: 15px;
  color: #666;
}

/* FORM */
.form-group {
  margin-bottom: 26px;
}

.form-group label {
  display: block;

  font-size: 16px;
  font-weight: 600;

  margin-bottom: 10px;
}

.input-wrapper {
  width: 100%;
  height: 52px;

  background: #f1f1f1;

  border-radius: 10px;

  display: flex;
  align-items: center;

  padding: 0 7px;
  gap: 12px;
}

.input-wrapper img {
  width: 22px;
  opacity: 0.7;
}

.input-wrapper input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  font-size: 16px;
  font-family: "Segoe UI", sans-serif;
}

/* BUTTONS */
.button-row {
  display: flex;
  gap: 16px;

  margin-top: 34px;
}

.cancel-btn,
.save-btn {
  flex: 1;
  height: 52px;

  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.cancel-btn {
  background: white;
  border: 1px solid #e2d5a3;
}

.save-btn {
  border: none;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.save-btn img {
  width: 20px;
}

.cancel-btn:hover,
.save-btn:hover {
  opacity: 0.9;
}

/* EXPAND BTN */
.expand-btn {
  border: none;
  background: transparent;

  color: red;
  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
}

/* ANIMATION */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 700px;
}

/* SUCCESS ALERT */
:global(.success-popup) {
  border-radius: 22px !important;
}

:global(.custom-success-alert) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

:global(.success-circle) {
  width: 110px;
  height: 110px;

  border-radius: 50%;
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 60px;
  font-weight: 700;
  color: #19c15f;

  margin-bottom: 24px;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

:global(.custom-success-alert h2) {
  font-size: 32px;
  font-weight: 700;
  color: white;

  margin-bottom: 12px;
}

:global(.custom-success-alert p) {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.92);

  margin-bottom: 34px;
}

:global(.success-btn) {
  width: 180px;
  height: 52px;

  border: none;
  border-radius: 12px;

  background: white;
  color: #d4af37;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

:global(.success-btn:hover) {
  transform: scale(1.03);
}
</style>
