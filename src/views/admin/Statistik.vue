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
              :class="{ active: selectedFilter === 'week' }"
              @click="selectFilter('week')"
            >
              Week
            </div>

            <div
              class="dropdown-item"
              :class="{ active: selectedFilter === 'month' }"
              @click="selectFilter('month')"
            >
              Month
            </div>

            <div
              class="dropdown-item"
              :class="{ active: selectedFilter === 'year' }"
              @click="selectFilter('year')"
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
                :class="{ gold: item.gold }"
                :style="{ height: item.value * 14 + 'px' }"
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
import { ref } from "vue";
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const showFilter = ref(false);
const selectedFilter = ref("year");

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

const selectFilter = (type) => {
  selectedFilter.value = type;
  showFilter.value = false;
};

/* CHART DATA */
const chartData = [
  { label: "JAN", value: 2, gold: false },
  { label: "FEB", value: 7, gold: true },
  { label: "MAR", value: 6, gold: false },
  { label: "APR", value: 4, gold: true },
  { label: "MAY", value: 11, gold: false },
  { label: "JUN", value: 6, gold: true },
  { label: "JUL", value: 6, gold: false },
  { label: "AUG", value: 10, gold: true },
  { label: "SEP", value: 13, gold: false },
  { label: "OCT", value: 14, gold: true },
  { label: "NOV", value: 15, gold: false },
  { label: "DES", value: 11, gold: true },
];
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

  background: white;

  border-radius: 8px 8px 0 0;

  position: relative;

  transition: 0.3s;
}

.bar.gold {
  background: #d4af37;
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
