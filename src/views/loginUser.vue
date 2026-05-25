<template>
  <div class="container">
    <div class="card">
      <!-- LEFT SIDE (FORM) -->
      <div class="left">
        <h1 class="title">Login</h1>

        <form @submit.prevent="handleLogin" class="form">
          <!-- Email -->
          <div class="form-group">
            <label>Username</label>
            <div class="input-wrapper">
              <img src="/src/assets/profile-icon.svg" />
              <input v-model="name" placeholder="Username" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <img src="/src/assets/lock-icon.svg" />

              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••"
              />

              <!-- 👁️ TOGGLE BUTTON -->
              <button
                type="button"
                class="eye-btn"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "🙈" : "👁️" }}
              </button>
            </div>
          </div>

          <!-- Forgot -->
          <div class="forgot">
            <a href="#" @click.prevent="forgotPassword">Lupa password?</a>
          </div>

          <!-- Button -->
          <button type="submit" class="login-btn">Login</button>
        </form>
      </div>

      <!-- RIGHT SIDE -->
      <div class="right">
        <h2>Hello, welcome!</h2>
        <p>Belum punya akun? Daftar sekarang untuk memulai</p>

        <button @click="handleRegister" class="register-btn">Register</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const name = ref("");
const password = ref("");
const showPassword = ref(false);

onMounted(() => {
  if (route.query.auth === "required") {
    Swal.fire({
      icon: "warning",
      title: "Login Diperlukan",
      text: "Silakan login terlebih dahulu",
      confirmButtonColor: "#caa63a"
    });
  }
});

const handleLogin = async () => {
if (!name.value || !password.value) {
  Swal.fire({
    icon: "warning",
    title: "Field Belum Lengkap",
    text: "Username dan password wajib diisi",
    confirmButtonColor: "#caa63a",
  });
  return;

}
  await fetchLogin();
};

const forgotPassword = () => {
Swal.fire({
    icon: "warning",
    title: "Fitur Belum Tersedia",
    confirmButtonColor: "#caa63a",
  });};

const handleRegister = () => {
  router.push("/register");
};

const fetchLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/auth/login', {
      username: name.value,
      password: password.value
    });
    console.log(response.data);
    const token = response.data.data.access_token;
    const role = response.data.data.role;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: "Selamat datang kembali",
      confirmButtonColor: "#caa63a",
      timer: 1800,
      showConfirmButton: false,
    });

    setTimeout(() => {
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/home");
      }
    }, 1800);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: "Periksa username dan password Anda.",
      confirmButtonColor: "#caa63a",
    });
  }
};
</script>

<style scoped>
/* BACKGROUND */
.container {
  position: fixed;
  inset: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5a5a5a;
  box-sizing: border-box;
}

/* CARD */
.card {
  display: flex;
  width: 900px;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

/* LEFT */
.left {
  width: 50%;
  padding: 50px;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
}

/* FORM */
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
}

/* INPUT */
.input-wrapper {
  display: flex;
  align-items: center;
  background: #ddd;
  border-radius: 8px;
  padding: 10px;
}

.input-wrapper input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  margin-left: 8px;
}

.icon {
  opacity: 0.6;
}

/* 👁️ TOGGLE BUTTON (TAMBAHAN SAJA) */
.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 8px;
  opacity: 0.6;
}

.eye-btn:hover {
  opacity: 1;
}

/* FORGOT */
.forgot {
  text-align: right;
}

.forgot a {
  font-size: 13px;
  color: #caa63a;
  text-decoration: none;
}

/* LOGIN BUTTON */
.login-btn {
  margin-top: 10px;
  background: #caa63a;
  border: none;
  padding: 12px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.login-btn:hover {
  opacity: 0.9;
}

/* RIGHT */
.right {
  width: 50%;
  background: #caa63a;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px;
}

.right h2 {
  font-size: 36px;
}

.right p {
  font-size: 14px;
  max-width: 260px;
}

/* REGISTER BUTTON */
.register-btn {
  margin-top: 20px;
  background: white;
  color: #caa63a;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
}
</style>
