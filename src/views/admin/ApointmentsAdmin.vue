<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <div class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Manajemen Appointments" />

      <div v-if="loading">
        Loading...
      </div>

      <!-- CONTENT -->
      <div class="content">
        <!-- STATS -->
        <div class="stats">
          <div class="stat-card">
            <p>Jumlah Appointments</p>
            <h2 class="gold">{{ summary.total }}</h2>
          </div>

          <div class="stat-card">
            <p>Tertunda</p>
            <h2 class="gray">{{ summary.pending }}</h2>
          </div>

          <div class="stat-card">
            <p>Dikonfirmasi</p>
            <h2 class="green">{{ summary.confirmed }}</h2>
          </div>

          <div class="stat-card">
            <p>Ditolak</p>
            <h2 class="red">{{ summary.cancelled }}</h2>
          </div>
        </div>

        <!-- HEADER -->
        <div class="header-section">
          <h2>Daftar Appointments</h2>

          <div class="search-box">
            <img src="/src/assets/admin/icon-search.svg" />
            <input v-model="searchQuery" type="text" placeholder="Search" />
          </div>
        </div>

        <!-- APPOINTMENT LIST -->
        <div
          class="appointment-card"
          v-for="item in filteredAppointments"
          :key="item.id"
        >
          <!-- STATUS -->
          <div
            class="top-right"
            :class="{
              confirmed: item.status === 'confirmed',
              rejected: item.status === 'cancelled',
              pending: item.status === 'pending',
            }"
          >
            {{ item.status }}
          </div>

          <!-- IMAGE -->
          <div class="left">
            <img
              :src="item.car?.thumbnail"
              class="car-image"
            />
          </div>

          <!-- CONTENT -->
          <div class="middle">
            <h3>
              {{ item.car?.brand }} {{ item.car?.model }}
            </h3>

            <h4>Nama : {{ item.user?.username }}</h4>

            <div class="info-grid">
              <div class="info-item">
                <img src="/src/assets/admin/icon-calendar2.svg" />
                <span>{{ formatDate(item?.slot?.date) }}</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-jam.svg" />
                <span>{{ (item?.slot?.time) }}</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-callungu.png" />
                <span>{{ item.phone }}</span>
              </div>

              <div class="info-item">
                <img src="/src/assets/icon-msghijau.png" />
                <span>{{ item.email }}</span>
              </div>
            </div>
          </div>

          <!-- BUTTON -->
          <div class="right">
            <button @click="goDetail(item.id)">
              Lihat Detail Informasi
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const router = useRouter();
const appointments = ref([]);
const summary = ref({
  total: 0,
  pending: 0,
  confirmed: 0,
  cancelled: 0,
  completed: 0,
});

const loading = ref(false);
const searchQuery = ref("");
const filteredAppointments = computed(() => {
  return appointments.value.filter((item) => {
    const keyword = searchQuery.value.toLowerCase();

    return (
      item.car?.brand?.toLowerCase().includes(keyword) ||
      item.car?.model?.toLowerCase().includes(keyword) ||
      item.email?.toLowerCase().includes(keyword) ||
      item.phone?.toLowerCase().includes(keyword) ||
      item.status?.toLowerCase().includes(keyword)
    );
  });
});

onMounted(() => {
  fetchAppointments();
});

const fetchAppointments = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      "https://backend-autocatalog.vercel.app/api/v1/admin/schedules",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    summary.value = res.data.data.summary;
    appointments.value = res.data.data.appointments;
    console.log(summary.value);
    console.log(appointments.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const goDetail = (id) => {
  router.push(`/admin/detailapo/${id}`);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  background: #f5f6fa;
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.main-content {
  flex: 1;
}

.content {
  padding: 36px;
}

/* STATS */
.stats {
  display: flex;
  gap: 18px;
  margin-bottom: 42px;
}

.stat-card {
  flex: 1;
  background: white;
  border: 1px solid #e4c25c;
  border-radius: 16px;
  padding: 24px;
}

.stat-card p {
  color: #707070;
  margin-bottom: 26px;
  font-size: 15px;
}

.stat-card h2 {
  font-size: 22px;
  font-weight: 700;
}

.gold {
  color: #d4af37;
}

.red {
  color: red;
}

.green {
  color: #00c853;
}

.gray {
  color: #b8b8b8;
}

/* HEADER */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-section h2 {
  font-size: 22px;
  font-weight: 700;
}

/* SEARCH */
.search-box {
  width: 220px;
  height: 44px;
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 12px;

  display: flex;
  align-items: center;

  padding: 0 14px;
}

.search-box img {
  width: 18px;
  opacity: 0.5;
}

.search-box input {
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
  font-size: 15px;
}

/* CARD */
.appointment-card {
  background: white;
  border: 1px solid #e4c25c;
  border-radius: 16px;

  padding: 22px;

  display: flex;
  align-items: center;
  gap: 22px;

  margin-bottom: 22px;

  position: relative;
}

.car-image {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}

.middle {
  flex: 1;
}

.middle h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.middle h4 {
  color: #666;
  margin-bottom: 18px;
  font-size: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 220px);
  gap: 12px 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #707070;
}

.info-item img {
  width: 18px;
  height: 18px;
}

/* BUTTON */
.right button {
  margin-top: 80px;
  height: 40px;
  background: #d4af37;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.right button:hover {
  opacity: 0.9;
}

/* STATUS */
.top-right {
  position: absolute;
  top: 18px;
  right: 18px;

  padding: 5px 14px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;
}

.confirmed {
  background: #00c853;
  color: white;
}

.rejected {
  background: red;
  color: white;
}

.pending {
  background: #f1f1f1;
  color: #444;
}
</style>
