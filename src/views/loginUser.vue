<template>
  <div class="container">
    <div class="card">
      <!-- LEFT SIDE (FORM) -->
      <div class="left">
        <h1 class="title">Login</h1>

        <form @submit.prevent="handleLogin" class="form">
          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <div class="input-wrapper">
              <img src="/src/assets/email-icon.svg" class="icon" />
              <input
                type="email"
                v-model="email"
                placeholder="nama@email.com"
              />
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleLogin = () => {
  if (email.value && password.value) {
    alert("Login berhasil!");
    console.log(email.value, password.value);
    router.push("/home");
  } else {
    alert("Isi semua field!");
  }
};

const forgotPassword = () => {
  alert("Fitur belum tersedia");
};

const handleRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
/* BACKGROUND */
.container {
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
