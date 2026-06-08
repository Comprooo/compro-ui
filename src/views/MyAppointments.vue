<template>
  <div class="page">
    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <div class="container">
      <h1>My Appointments</h1>
      <p class="subtitle">Lihat semua jadwal pertemuan Anda</p>

      <!-- STATS -->
      <div class="stats">
        <div class="card">
          <p>Total</p>
          <h2>{{ summary.total }}</h2>
        </div>

        <div class="card">
          <p>Pending</p>
          <h2 class="grey">{{summary.pending }}</h2>
        </div>

        <div class="card">
          <p>Confirmed</p>
          <h2 class="green">{{ summary.confirmed }}</h2>
        </div>

        <div class="card">
          <p>Declined</p>
          <h2 class="red">{{ summary.cancelled }}</h2>
        </div>
      </div>

      <!-- EMPTY -->
      <div
        v-if="appointments.length === 0"
        class="empty-wrapper"
      >
        <div class="empty-header">
          <h3>Daftar Appointments</h3>
          <p>Jadwal pertemuan untuk cek kondisi mobil</p>
        </div>

        <div class="empty-box">
          <img src="/src/assets/apo-putih.svg" class="empty-icon" />

          <h2>Belum ada appointment</h2>

          <span>
            Mulai jelajahi katalog mobil dan buat jadwal pertemuan
          </span>

          <button @click="goKatalog">
            Lihat Katalog
          </button>
        </div>
      </div>

      <!-- APPOINTMENTS -->
      <div
        v-else
        class="appointment-wrapper"
      >
        <div class="header">
          <h3>Daftar Appointments</h3>
          <p>Jadwal pertemuan untuk cek kondisi mobil</p>
        </div>

        <div
          v-for="item in appointments"
          :key="item.id"
          class="appointment-card"
        >
          <!-- IMAGE -->
          <img
            :src="item.car.thumbnail"
            class="car-image"
          />

          <!-- CONTENT -->
          <div class="appointment-content">

            <!-- TOP -->
            <div class="top-row">
              <div>
                <h2>
                  {{ item.car.specifications?.year }}
                  {{ item.car.brand }}
                  {{ item.car.model }}
                  {{ item.car.specifications?.transmission }}
                </h2>

                <h3>
                  Rp {{ formatPrice(item.car.price) }}
                </h3>
              </div>

              <span
                class="status"
                :class="item.status"
              >
                {{ item.status }}
              </span>
            </div>

            <!-- INFO -->
            <div class="info-grid">

              <div class="info-item">
                📅
                {{ item.slot?.date ? formatDate(item.slot.date) : "-" }}
              </div>

              <div class="info-item">
                🕘
                {{ item.slot?.time || "-" }}
              </div>

              <div class="info-item">
                📞
                {{ item.phone || "-" }}
              </div>

              <div class="info-item">
                ✉️
                {{ item.email || "-" }}
              </div>

            </div>

            <div class="info-location">
              <div class="info-item">
                📍
                {{ item.slot?.location?.location_name }} -
                {{ item.slot?.location?.address }}
                <a
                  v-if="item.slot?.location?.map_link"
                  :href="item.slot.location.map_link"
                  target="_blank"
                  class="map-link"
                >
                  (Lihat di Maps)
                </a>
              </div>
            </div>

            <!-- NOTES -->
            <div
              v-if="item.notes"
              class="message-box"
            >
              <strong>Pesan:</strong>

              <p>{{ item.notes }}</p>
            </div>

            <!-- DECLINED ALERT -->
            <div
              v-if="item.status === 'cancelled'"
              class="declined-alert"
            >
              <strong>
                ⚠ Appointment Ditolak
              </strong>

              <p>
                Jadwal tidak tersedia,
                mohon pilih waktu lain
              </p>
            </div>

            <!-- BUTTONS -->
            <div class="button-group">

              <!-- DETAIL -->
              <button
                class="detail-btn"
                @click="goDetail(item.car.car_id)"
              >
                Lihat Detail Mobil
              </button>

              <!-- PENDING -->
              <template v-if="item.status === 'pending'">

                <button
                  class="cancel-btn"
                  @click="cancelAppointment(item.id)"
                >
                  ✕ Cancel Appointment
                </button>

              </template>

              <!-- DECLINED -->
              <template v-if="item.status === 'cancelled'">

                <button
                  class="reschedule-btn"
                  @click="goReschedule(item.id)"
                >
                  ↻ Reschedule
                </button>

              </template>

              <!-- CONFIRMED -->
              <template v-if="item.status === 'confirmed'">

                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  class="wa-btn"
                >
                  💬 Hubungi via WhatsApp
                </a>

              </template>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const loading = ref(false);
const appointments = ref([]);
const summary = ref({
  total: 0,
  pending: 0,
  completed: 0,
  cancelled: 0,
});

/* FETCH APPOINTMENTS */
const fetchAppointments = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      "https://backend-autocatalog.vercel.app/api/v1/schedules/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    summary.value = res.data.data.summary;
    appointments.value = res.data.data.appointments;

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAppointments();
});

/* FORMAT */
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/* ROUTE */
const goKatalog = () => router.push("/katalog");
const goDetail = (id) => {
  router.push(`/detail/${id}`);
};

const goReschedule = (id) => {
  router.push(`/reschedule/${id}`);
};

const cancelAppointment = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Batalkan Appointment?",
      text: "Appointment akan diubah menjadi cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#9e9e9e",
      confirmButtonText: "Ya, batalkan",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    loading.value = true;

    const res = await axios.patch(
      `https://backend-autocatalog.vercel.app/api/v1/schedules/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    Swal.fire({
      icon: "success",
      title: "Appointment Dibatalkan",
      text: "Status berhasil diubah menjadi cancelled",
      confirmButtonColor: "#caa63a",
    });

    // refresh data
    await fetchAppointments();

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal Cancel Appointment",
      text: err.response?.data?.message || "Terjadi kesalahan",
      confirmButtonColor: "#caa63a",
    });

  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
/* PAGE */
.page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* CONTAINER */
.container {
  width: 760px;
  margin: 34px auto;
}

/* TITLE */
.container h1 {
  font-size: 48px;
  font-weight: 700;
}

.subtitle {
  color: #7d7d7d;
  margin-top: 8px;
  font-size: 16px;
}

/* STATS */
.stats {
  display: flex;
  gap: 16px;
  margin-top: 34px;
}

.card {
  width: 200px;
  height: 170px;
  border: 1px solid #efdba1;
  border-radius: 18px;
  background: white;
  padding: 24px;
}

.card p {
  color: #6e6e6e;
  line-height: 1.4;
  font-size: 15px;
}

.card h2 {
  margin-top: 48px;
  font-size: 34px;
  color: #d0a92d;
}

.grey{
  color: #3b3b39 !important;
}
.green {
  color: #16c14c !important;
}

.red {
  color: #f44336 !important;
}

/* EMPTY WRAPPER */
.empty-wrapper {
  margin-top: 30px;
  border: 1px solid #f0e0b0;
  border-radius: 18px;
  background: white;
  min-height: 400px;
  padding: 26px;
}

/* HEADER */
.empty-header h3 {
  font-size: 18px;
}

.empty-header p {
  margin-top: 6px;
  color: #777;
}

/* EMPTY BOX */
.empty-box {
  height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ICON */
.empty-icon {
  width: 74px;
  opacity: 0.35;
}

/* TEXT */
.empty-box h2 {
  margin-top: 18px;
  font-size: 20px;
}

.empty-box span {
  margin-top: 10px;
  color: #808080;
  font-size: 15px;
}

/* BUTTON */
.empty-box button {
  margin-top: 22px;
  width: 116px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #d4af37;
  color: black;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.empty-box button:hover {
  opacity: 0.9;
}

/* APPOINTMENT WRAPPER */
.appointment-wrapper {
  margin-top: 24px;
  border: 1px solid #f0dfb2;
  border-radius: 18px;
  background: white;
  padding: 20px;
}

.header h3 {
  font-size: 20px;
}

.header p {
  color: #777;
  margin-top: 5px;
}

/* CARD */
.appointment-card {
  margin-top: 24px;
  border: 1px solid #e5c86d;
  border-radius: 18px;
  padding: 18px;
  display: flex;
  gap: 18px;
  transition: 0.2s;
}

.appointment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* IMAGE */
.car-image {
  width: 220px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
}

/* INFO */
.appointment-content {
  flex: 1;
}

/* TOP */
.top-row {
  display: flex;
  justify-content: space-between;
}

.top-row h2 {
  font-size: 22px;
}

.top-row h3 {
  margin-top: 6px;
  color: #d0a92d;
  font-size: 18px;
}

/* STATUS */
.status {
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-left: 12px;
}

.status.pending {
  background: #edece9;
  color: #3b3b39;
}

.status.confirmed {
  background: #d4edda;
  color: #155724;
}

.status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.info-grid {
  margin-top: 16px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-location {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  margin-top: 15px;
  padding: 12px;
  border: 1px solid #e0cfa4;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.map-link {
  display: inline-block;
  margin-top: 12px;
  color: #caa63a;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
}

.map-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.message-box {
  margin-top: 14px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 12px;
}

.message-box p {
  margin-top: 16px;
  color: #565353;
}

.declined-alert {
  margin-top: 14px;
  background: #f8d7da;
  border-radius: 10px;
  padding: 12px;
}

.declined-alert strong {
  color: #721c24;
}

.declined-alert p {
  color: red;
}

/* BUTTONS */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.detail-btn {
  height: 38px;
  padding: 0 16px;
  border: none;
  background: #d4af37;
  border-radius: 10px;
  cursor: pointer;
  border-color: #3b3b39;

}

.detail-btn:hover {
  background: #caa63a;
  color: white;
  border: none;
}

.reschedule-btn {
  height: 38px;
  padding: 0 16px;
  border: none;
  background: #d4af37;
  border-radius: 10px;
  cursor: pointer;
  border-color: #3b3b39;

}

.reschedule-btn:hover {
  background: #caa63a;
  color: white;
}

.cancel-btn {
  height: 38px;
  padding: 0 16px;
  border: 1px solid #ddd;
  background: rgb(247, 59, 59);
  border-radius: 10px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #f44336;
  color: white;
  border: none;
}

.wa-btn {
  height: 38px;
  padding: 0 18px;
  background: #00b83e;
  color: black;
  text-decoration: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border-color: #3b3b39;
}

.wa-btn:hover {
  background: #00a231;
  color: white;
  border: none;
}
</style>
