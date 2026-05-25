<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <span class="back" @click='router.push("/home")'>← Profile</span>
      <p>informasi akun Anda</p>
    </div>

    <!-- PROFILE CARD -->
    <div class="card">
      <!-- TOP -->
      <div class="card-top">
        <div class="avatar">
          <img src="/src/assets/icon-profilekuningkecil.svg" />
        </div>

        <h2>{{ profile.username }}</h2>
        <p>{{ profile.role }}</p>
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
           <strong>{{ profile.username }}</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon green">
            <img src="/src/assets/icon-msghijau.png" />
          </div>
          <div>
            <span>Email</span>
            <strong>{{ profile.email }}</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon purple">
            <img src="/src/assets/icon-callungu.png" />
          </div>
          <div>
            <span>Nomor Telepon</span>
            <strong>{{ profile.phone }}</strong>
          </div>
        </div>

        <div class="item">
          <div class="icon orange">
            <img src="/src/assets/icon-calenderyellow.svg" />
          </div>
          <div>
            <span>Bergabung Sejak</span>
            <strong>{{ formatDate(profile.created_at) }}</strong>
          </div>
        </div>

        <!-- BUTTON -->
        <button class="btn-edit" @click="goEdit">
          <img src="/src/assets/icon-edit.png" />
          Edit Profile
        </button>
        <button class="btn-logout" @click="handleLogout">
          <img src="/src/assets/icon-logout.png" />
          Logout
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const router = useRouter();

const profile = ref({
  username: "",
  email: "",
  phone: "",
  created_at: "",
  role: ""
});

const fetchProfile = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/auth/me", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Yakin ingin logout?",
    text: "Anda harus login kembali untuk masuk ke akun.",
    icon: "warning",

    showCancelButton: true,
    confirmButtonText: "Ya, Logout",
    cancelButtonText: "Batal",

    confirmButtonColor: "#d9363e",
    cancelButtonColor: "#caa63a",

    reverseButtons: true,

    customClass: {
      popup: "logout-popup",
      title: "logout-title",
      htmlContainer: "logout-text",
      confirmButton: "logout-confirm",
      cancelButton: "logout-cancel",
    }
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8000/api/v1/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await Swal.fire({
      icon: "success",
      title: "Berhasil Logout",
      text: "Sampai jumpa kembali 👋",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem("token");
    router.push("/");
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};

onMounted(() => {
  fetchProfile();
});

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

.btn-logout {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  background: #f30000;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.btn-logout:hover {
  background: #d9363e;
}

.btn-logout img {
  width: 14px;
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

:global(.logout-popup) {
  border-radius: 20px !important;
  padding: 30px 24px !important;
}

:global(.logout-title) {
  font-size: 28px !important;
  font-weight: 700 !important;
}

:global(.logout-text) {
  font-size: 16px !important;
  color: #666 !important;
}

:global(.logout-confirm),
:global(.logout-cancel) {
  border-radius: 10px !important;
  padding: 10px 30px !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}

:global(.swal2-actions) {
  gap: 14px !important;
}
</style>
