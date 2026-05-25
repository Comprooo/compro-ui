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
              <input v-model="searchQuery" type="text" placeholder="Search..." />
            </div>
          </div>

          <!-- BUTTON -->
          <button class="add-btn" @click="goTambahJadwal">
            + Tambah Jadwal
          </button>
        </div>

        <div v-if="loading" class="loading">
          Loading...
        </div>
        <!-- TABLE -->
        <div v-else class="table-wrapper">
          <!-- HEADER -->
          <div class="table-header">
            <div>Tanggal</div>
            <div>Jam</div>
            <div>Lokasi</div>
            <div>Aksi</div>
          </div>
            <div
              class="table-row"
              v-for="(item, index) in filteredSchedules"
              :key="item.slot_id"
              :class="{ white: index % 2 !== 0 }"
            >
              <div>{{ formatDate(item.date) }}</div>

              <div>{{ item.time }}</div>

              <div class="location-info">
                <h4>{{ item.location?.location_name }}</h4>

                <p>
                  {{ item.location?.address }}
                </p>

                <a
                  :href="item.location?.map_link"
                  target="_blank"
                  class="map-link"
                >
                  Lihat Maps
                </a>
              </div>

              <div class="action">
                <img
                  src="/src/assets/admin/icon-edit.svg"
                  class="edit-icon"
                  @click="goEdit(item)"
                />

                <img
                  src="/src/assets/admin/icon-trash.svg"
                  class="trash-icon"
                  @click="deleteJadwal(item.slot_id)"
                />
              </div>
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
import Swal from "sweetalert2";

const router = useRouter();

const selectedShow = ref("4");
const schedules = ref([]);
const loading = ref(false);
const searchQuery = ref("");

const filteredSchedules = computed(() => {
  let filtered = schedules.value.filter((item) => {
    const keyword = searchQuery.value.toLowerCase();

    return (
      item.location?.location_name
        ?.toLowerCase()
        .includes(keyword) ||
      item.location?.address
        ?.toLowerCase()
        .includes(keyword) ||
      item.time?.toLowerCase()
        .includes(keyword)
    );
  });

  return filtered.slice(0, Number(selectedShow.value));
});

onMounted(() => {
  fetchSchedules();
});

const fetchSchedules = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      "http://localhost:8000/api/v1/schedules/available",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    schedules.value = res.data.data;

    console.log(schedules.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteJadwal = async (id) => {
  const result = await Swal.fire({
    title: "Anda yakin ingin menghapus jadwal?",
    background: "#fff",
    confirmButtonText: "Ya, Hapus",
    showCancelButton: true,
    cancelButtonText: "Batal",
    reverseButtons: true,

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "red-btn",
      cancelButton: "green-btn",
    },
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `http://localhost:8000/api/v1/admin/available-slots/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      title: "Berhasil",
      text: "Jadwal berhasil dihapus",
      icon: "success",
      showConfirmButton: false,
      timer: 1800,
    });

    // refresh data
    fetchSchedules();

  } catch (err) {
    console.error(err);

    Swal.fire({
      title: "Gagal",
      text: "Gagal menghapus jadwal",
      icon: "error",
      confirmButtonColor: "#ff1e1e",
    });
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/* ROUTER */
const goTambahJadwal = () => {
  router.push("/admin/tambahjadwal");
};

const goEdit = (item) => {
  router.push({
    path: `/admin/editjadwal/${item.slot_id}`,
    query: {
      date: item.date,
      time: item.time,
      location_id: item.location?.id,
      location_name: item.location?.location_name,
      address: item.location?.address,
      map_link: item.location?.map_link,
    },
  });
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
  width: 55px;
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

/* LOCATION */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.location-info h4 {
  font-size: 15px;
  font-weight: 700;
  color: #111;
}

.location-info p {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.map-link {
  width: fit-content;

  font-size: 13px;
  font-weight: 600;

  color: #d4af37;

  text-decoration: none;

  transition: 0.2s;
}

.map-link:hover {
  text-decoration: underline;
  opacity: 0.8;
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
