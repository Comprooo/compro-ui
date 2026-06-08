<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <span class="back" @click="goBack">← Kembali ke profile</span>
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
        <input type="text" placeholder="Nama lengkap" v-model="profile.username" />

        <label>Email</label>
        <input type="email" placeholder="nama@email.com" v-model="profile.email" />

        <label>No. Handphone</label>
        <input type="text" placeholder="08xx xxxx xxxx" v-model="profile.phone" />
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

        <span class="change" @click="togglePassword">
          {{ showPasswordForm ? "Tutup" : "Ganti" }}
        </span>
      </div>
          <div v-if="showPasswordForm" class="password-form">
      <label>Password Saat Ini</label>
      <div class="input-icon">
        <img src="/src/assets/icon-lock.svg" />
        <input type="password" placeholder="Masukkan Password Saat Ini" v-model="password.current" /> 
      </div>
      

      <label>Password Baru</label>
      <div class="input-icon">
        <img src="/src/assets/icon-lock.svg" />
        <input type="password" placeholder="Masukkan Password Baru (min. 6 karakter)" v-model="password.new" />
      </div>

      <label>Konfirmasi Password Baru</label>
      <div class="input-icon">
        <img src="/src/assets/icon-lock.svg" />
        <input type="password" placeholder="Konfirmasi Password Baru" v-model="password.confirm" />
      </div>

      <div class="actions">
        <button class="btn-outline" @click="goCancel">
          Batal
        </button>

        <button class="btn-primary" @click="goChange">
          🔒 Ganti Password
        </button>
      </div>
    </div>
    </div>


  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const profile = ref({
  username: "",
  email: "",
  phone: ""
});

const password = ref({
  current: "",
  new: "",
  confirm: ""
});

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // pastikan ada

    const response = await fetch("https://backend-autocatalog.vercel.app/api/v1/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    console.log(result);

    if (result.status === "success") {
      profile.value = result.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("https://backend-autocatalog.vercel.app/api/v1/auth/me", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: profile.value.username,
        email: profile.value.email,
        phone: profile.value.phone,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: "Profile berhasil diupdate"
      });
      router.push("/viewprofile");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: result.message || "Gagal update profile"
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: "Terjadi kesalahan saat mengupdate profile"
    });
  }
};

const updatePassword = async () => {
  try {
    const token = localStorage.getItem("token");

    // VALIDASI FRONTEND
    if (!password.value.current || !password.value.new || !password.value.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: "Semua field password wajib diisi"
      });
      return;
    }

    if (password.value.new !== password.value.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: "Konfirmasi password tidak sama"
      });
      return;
    }

    const response = await fetch("https://backend-autocatalog.vercel.app/api/v1/auth/change-password", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: password.value.current,
        new_password: password.value.new,
        confirm_password: password.value.confirm,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: "Password berhasil diubah"
      });

      // reset form
      password.value = {
        current: "",
        new: "",
        confirm: ""
      };
      router.push("/viewprofile");
      showPasswordForm.value = false;

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: result.message || "Gagal ganti password",
      });
    }

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: "Terjadi kesalahan saat mengganti password"
    });
  }
};

const router = useRouter();

const goSave = () => {
  updateProfile();
};

const goCancel = () => {
  router.push("/viewprofile"); 
};

const goBack = () => {
  router.back();
};
const goChange = () => {
  updatePassword();
};

const showPasswordForm = ref(false);

const togglePassword = () => {
  showPasswordForm.value = !showPasswordForm.value;
};

onMounted(() => {
    fetchProfile();
  });
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

.password-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.password-form input {
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #eee;
}
</style>
