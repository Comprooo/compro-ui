<template>
  <div class="layout">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <div class="main">
      <!-- TOPBAR -->
      <AdminTopbar title="Dashboard Statistik" />

      <div class="content">
        <!-- FILTER -->
        <div class="filter-wrapper">
          <button class="filter-btn" @click="toggleFilter">
            <img src="/src/assets/admin/icon-filter.svg" />
            Filter
          </button>

          <!-- DROPDOWN -->
          <div v-if="showFilter" class="dropdown">
            <div
              class="dropdown-item"
              :class="{ active: selectedFilter === 'mingguan' }"
              @click="selectFilter('mingguan')"
            >
              Week
            </div>

            <div
              class="dropdown-item"
              :class="{ active: selectedFilter === 'bulanan' }"
              @click="selectFilter('bulanan')"
            >
              Month
            </div>

            <div
              class="dropdown-item"
              :class="{ active: selectedFilter === 'tahunan' }"
              @click="selectFilter('tahunan')"
            >
              Year
            </div>
          </div>
        </div>

        <!-- CHART CARD -->
        <div class="chart-card">
          <h3>
            DATA BANYAKNYA PELANGGAN <br />
            YANG MENDAFTAR APPOINTMENT TAHUN INI
          </h3>

          <!-- CHART -->
          <div class="chart">
            <div
              v-for="(item, index) in chartData"
              :key="index"
              class="bar-group"
            >
              <div
                class="bar"
                :style="{ height: Math.max(item.value * 40, 6) + 'px' }"
              >
                <span>{{ item.value }}</span>
              </div>

              <p>{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const showFilter = ref(false);
const selectedFilter = ref("tahunan");

const loading = ref(false);

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

const selectFilter = (type) => {
  selectedFilter.value = type;
  showFilter.value = false;

  fetchStats();
};

// CHART DATA
const chartData = ref([]);

onMounted(() => {
  fetchStats();
});

const fetchStats = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      "https://backend-autocatalog.vercel.app/api/v1/admin/stats",
      {
        params: {
          filter: selectedFilter.value,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      }
    );

    console.log("FULL RESPONSE:", res.data);

    const data = res.data.data || {};
    const periods = data.periods || [];

    chartData.value = periods.map((item, index) => {
      const totalAppointments =
        (item.appointments?.pending || 0) +
        (item.appointments?.confirmed || 0) +
        (item.appointments?.cancelled || 0) +
        (item.appointments?.completed || 0);

      return {
        label: item.label,
        value: totalAppointments,
        gold: index % 2 === 1,
      };
    });
  } catch (err) {
    console.error("STATUS:", err.response?.status);
    console.error("ERROR DATA:", err.response?.data);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

.main {
  flex: 1;
}

.content {
  padding: 50px 60px;
}

/* FILTER */
.filter-wrapper {
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 35px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 10px;

  background: #d4af37;
  color: white;

  border: none;
  border-radius: 12px;

  padding: 12px 22px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.filter-btn:hover {
  opacity: 0.9;
}

.filter-btn img {
  width: 18px;
}

/* DROPDOWN */
.dropdown {
  position: absolute;
  top: 58px;
  right: 0;

  width: 160px;

  background: white;

  border-radius: 14px;

  overflow: hidden;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  z-index: 20;
}

.dropdown-item {
  padding: 14px 18px;

  cursor: pointer;

  font-weight: 500;

  transition: 0.2s;
}

.dropdown-item:hover {
  background: #f8f8f8;
}

.dropdown-item.active {
  background: #d4af37;
  color: white;
}

/* CARD */
.chart-card {
  max-width: 760px;

  margin: auto;

  background: #ece2b9;

  border-radius: 28px;

  padding: 40px;

  box-shadow: 0 10px 24px rgba(149, 117, 205, 0.12);
}

.chart-card h3 {
  font-size: 22px;
  font-weight: 800;

  color: #111;

  line-height: 1.5;

  margin-bottom: 50px;
}

/* CHART */
.chart {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  gap: 18px;

  height: 320px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar {
  width: 46px;
  background: #d4af37;
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: 0.3s;
}

.bar span {
  position: absolute;
  top: -24px;
  left: 50%;

  transform: translateX(-50%);

  font-size: 13px;
  font-weight: 700;

  color: #111;
}

.bar-group p {
  margin-top: 12px;

  font-size: 12px;
  font-weight: 700;

  color: #111;
}
</style>
