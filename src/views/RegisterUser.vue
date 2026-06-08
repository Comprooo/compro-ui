<template>
  <div class="container">
    <div class="card">
      <!-- LEFT -->
      <div class="left">
        <h2>Welcome Back !</h2>
        <p>Sudah punya akun? Login untuk melanjutkan</p>

        <button @click="goLogin" class="login-btn">Login</button>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <h1 class="title">Registration</h1>

        <form @submit.prevent="handleRegister" class="form">
          <!-- Nama -->
          <div class="form-group">
            <label>Username</label>
            <div class="input-wrapper">
              <img src="/src/assets/profile-icon.svg" />
              <input v-model="name" placeholder="Username" />
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <div class="input-wrapper">
              <img src="/src/assets/email-icon.svg" class="icon" />
              <input v-model="email" placeholder="nama@email.com" />
            </div>
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label>No. Handphone</label>
            <div class="input-wrapper">
              <img src="/src/assets/telp-icon.svg" />
              <input v-model="phone" placeholder="08xx xxxx xxxx" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <img src="/src/assets/lock-icon.svg" />
              <input
                type="password"
                v-model="password"
                placeholder="Minimal 6 karakter"
              />
            </div>
          </div>

          <!-- Confirm -->
          <div class="form-group">
            <label>Konfirmasi Password</label>
            <div class="input-wrapper">
              <img src="/src/assets/lock-icon.svg" />
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Ketik ulang password"
              />
            </div>
          </div>

          <!-- BUTTON -->
          <button type="submit" class="register-btn">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = async () => {
  if (
    !name.value ||
    !email.value ||
    !phone.value ||
    !password.value ||
    !confirmPassword.value
  ) {
  Swal.fire({
    icon: "warning",
    title: "Field Belum Lengkap",
    text: "Semua field wajib diisi!",
    confirmButtonColor: "#caa63a",
  });
    return;
  }

  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: "warning",
      title: "Password Tidak Sama",
      text: "Password dan konfirmasi password tidak cocok",
      confirmButtonColor: "#caa63a",
    });
    return;
  }

  await fetchRegister();
};

const fetchRegister = async () => {
  try {
    const response = await axios.post('https://backend-autocatalog.vercel.app/api/v1/auth/register', {
      username: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      password_confirm: confirmPassword.value
    });
    console.log(response.data);
    Swal.fire({
      icon: "success",
      title: "Register Berhasil 🎉",
      text: "Akun Anda telah berhasil dibuat",
      confirmButtonColor: "#caa63a",
    });
    setTimeout(() => {
      router.push("/");
    }, 1800);
  } catch (error) {
    alert("Gagal register: " +  (error.response?.data?.message || error.message));
  }
};

const goLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
/* BACKGROUND */
.container {
  position: fixed;
  inset: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5a5a5a;
}

/* CARD */
.card {
  display: flex;
  width: 900px;
  min-height: 460px;
  border-radius: 12px;
  overflow: hidden;
}

/* LEFT */
.left {
  width: 50%;
  background: #caa63a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 30px;
}

.left h2 {
  font-size: 36px;
}

.left p {
  font-size: 14px;
  max-width: 260px;
}

.login-btn {
  margin-top: 20px;
  background: white;
  color: #caa63a;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
}

/* RIGHT */
.right {
  width: 50%;
  background: #eeeeee;
  padding: 30px 40px; /* dikurangi atasnya */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* INI KUNCI */
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* FIX UTAMA DI SINI */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  color: #333;
}

/* INPUT */
.input-wrapper {
  display: flex;
  align-items: center;
  background: #e6e6e6;
  border-radius: 10px;
  padding: 0 12px;
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 12px;
  font-size: 14px;
}

.icon {
  opacity: 0.6;
}

/* BUTTON */
.register-btn {
  margin-top: 8px;
  background: #caa63a;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.register-btn:hover {
  opacity: 0.9;
}
</style>
