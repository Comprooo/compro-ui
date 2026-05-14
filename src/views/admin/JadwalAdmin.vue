<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <div class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Jadwal Appointments" />

      <!-- CONTENT -->
      <div class="content">
        <!-- FILTER -->
        <div class="top-filter">
          <!-- LEFT -->
          <div class="filter-left">
            <span>Show</span>

            <select v-model="selectedShow">
              <option>4</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>

            <span>entries</span>

            <!-- SEARCH -->
            <div class="search-box">
              <img src="/src/assets/admin/icon-search.svg" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <!-- BUTTON -->
          <button class="add-btn" @click="goTambahJadwal">
            + Tambah Jadwal
          </button>
        </div>

        <!-- TABLE -->
        <div class="table-wrapper">
          <!-- HEADER -->
          <div class="table-header">
            <div>Tanggal</div>
            <div>Jam</div>
            <div>Lokasi</div>
            <div>Aksi</div>
          </div>

          <!-- ROW -->
          <div class="table-row">
            <div>18/01/2026</div>
            <div>10:00</div>
            <div>Rumah abang</div>

            <div class="action">
              <img
                src="/src/assets/admin/icon-edit.svg"
                class="edit-icon"
                @click="goEdit"
              />

              <img
                src="/src/assets/admin/icon-trash.svg"
                class="trash-icon"
                @click="goTrash"
              />
            </div>
          </div>

          <!-- ROW -->
          <div class="table-row white">
            <div>02/05/2026</div>
            <div>11:00</div>
            <div>Rumah abang</div>

            <div class="action">
              <img
                src="/src/assets/admin/icon-edit.svg"
                class="edit-icon"
                @click="goEdit"
              />

              <img
                src="/src/assets/admin/icon-trash.svg"
                class="trash-icon"
                @click="goTrash"
              />
            </div>
          </div>

          <!-- ROW -->
          <div class="table-row">
            <div>02/05/2026</div>
            <div>10:00</div>
            <div>Kantor</div>

            <div class="action">
              <img
                src="/src/assets/admin/icon-edit.svg"
                class="edit-icon"
                @click="goEdit"
              />

              <img
                src="/src/assets/admin/icon-trash.svg"
                class="trash-icon"
                @click="goTrash"
              />
            </div>
          </div>

          <!-- ROW -->
          <div class="table-row white">
            <div>20/04/2026</div>
            <div>14:00</div>
            <div>Kantor</div>

            <div class="action">
              <img
                src="/src/assets/admin/icon-edit.svg"
                class="edit-icon"
                @click="goEdit"
              />

              <img
                src="/src/assets/admin/icon-trash.svg"
                class="trash-icon"
                @click="goTrash"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const router = useRouter();

const selectedShow = ref("4");

/* ROUTER */
const goTambahJadwal = () => {
  router.push("/admin/tambahjadwal");
};

const goEdit = () => {
  router.push("/admin/editjadwal");
};

const goTrash = () => {
  router.push("/admin/deletejadwal");
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

.main-content {
  flex: 1;
}

.content {
  padding: 26px 34px;
}

/* TOP FILTER */
.top-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 26px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-left span {
  font-size: 15px;
  color: #222;
}

/* SELECT */
.filter-left select {
  width: 42px;
  height: 34px;

  border: 1px solid #ddd;
  border-radius: 8px;

  padding-left: 10px;

  background: white;
  cursor: pointer;

  outline: none;
}

/* SEARCH */
.search-box {
  width: 300px;
  height: 42px;

  background: white;
  border: 1px solid #cfcfcf;
  border-radius: 10px;

  display: flex;
  align-items: center;

  padding: 0 14px;

  margin-left: 14px;
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

/* BUTTON */
.add-btn {
  background: #d4af37;
  color: white;

  border: none;
  border-radius: 12px;

  padding: 14px 22px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.add-btn:hover {
  opacity: 0.9;
}

/* TABLE */
.table-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

/* HEADER */
.table-header {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.8fr 0.8fr;

  padding: 18px 22px;

  font-weight: 700;
  color: #111;

  border-bottom: 1px solid #ececf1;
}

/* ROW */
.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.8fr 0.8fr;

  align-items: center;

  padding: 20px 22px;

  background: #f7f7fb;

  font-size: 15px;

  border-bottom: 1px solid #ececf1;
}

.table-row.white {
  background: #ffffff;
}
.table-row:last-child {
  border-bottom: none;
}

/* ACTION */
.action {
  display: flex;
  align-items: center;
  gap: 16px;
}

.edit-icon,
.trash-icon {
  width: 24px;
  cursor: pointer;
  transition: 0.2s;
}

.edit-icon:hover,
.trash-icon:hover {
  transform: scale(1.08);
}
</style>
