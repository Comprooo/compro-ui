<template>
  <div class="page">
    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT -->
    <div class="container">
      <!-- TITLE -->
      <div class="heading">
        <h1>Reschedule Appointment</h1>
        <p>Atur ulang jadwal pertemuan Anda</p>
      </div>

      <!-- CAR CARD -->
      <div class="car-card">
        <img :src="appointment.car?.images?.[0]"/>

        <div class="car-content">
          <h2>{{appointment.car?.specifications?.year}} {{ appointment.car?.brand }} {{ appointment.car?.model }} {{ appointment.car?.specifications?.transmission }}</h2>
          <h3>Rp {{ formatPrice(appointment.car?.price) }}</h3>
        <ul>
          <li>Tahun: {{ appointment.car?.specifications?.year }}</li>
          <li>Kilometer: {{ appointment.car?.specifications?.mileage }}</li>
          <li>Transmisi: {{ appointment.car?.specifications?.transmission }}</li>
          <li>Bahan Bakar: {{ appointment.car?.specifications?.fuel }}</li>
        </ul>
        </div>
      </div>

      <!-- SUCCESS CARD -->
      <div class="success-card">
        <h2>Jadwal Baru</h2>

        <p class="subtitle">
          Pilih tanggal dan waktu baru untuk pertemuan Anda
        </p>

        <div class="success-box">
          <!-- ICON -->
          <img src="/src/assets/icon-check2.svg" class="check-icon" />

          <!-- TITLE -->
          <h1>Jadwal Berhasil Diubah!</h1>

          <!-- DESC -->
          <p class="desc">
            Jadwal pertemuan Anda telah diperbarui. Penjual akan menghubungi
            Anda segera untuk konfirmasi.
          </p>

          <!-- DETAIL -->
          <div class="detail-box">
            <p><strong>Tanggal:</strong> {{formatDate(appointment.slot?.date)}}</p>

            <p><strong>Waktu:</strong> {{ appointment.slot?.time }}</p>

            <p><strong>Email:</strong> {{ appointment?.email }}</p>

            <p><strong>No. HP:</strong> {{ appointment?.phone }}</p>
          </div>

          <!-- BUTTON -->
          <button class="appointment-btn" @click="goAppointments">
            Lihat My Appointments
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

const router = useRouter();
const route = useRoute();

const appointment = ref({});

const fetchAppointment = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/v1/schedules/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    appointment.value = res.data.data;

    console.log(appointment.value);

  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchAppointment();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const goAppointments = () => {
  router.push("/appointments");
};
</script>

<style scoped>
/* PAGE */
.page {
  min-height: 160vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* CONTAINER */
.container {
  width: 760px;
  margin: 40px auto 60px;
}

/* HEADING */
.heading h1 {
  font-size: 54px;
  font-weight: 700;
  color: #111;
}

.heading p {
  margin-top: 8px;
  color: #777;
  font-size: 18px;
}

/* CARD */
.car-card {
  margin-top: 28px;

  background: white;

  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.car-card img {
  width: 100%;
}

.car-content {
  padding: 22px;
}

.car-content h2 {
  font-size: 22px;
  color: #111;
}

.car-content h3 {
  margin-top: 10px;

  font-size: 20px;
  color: #d4af37;
}

.car-content ul {
  margin-top: 16px;

  padding-left: 18px;

  color: #666;

  line-height: 2;
}

/* SUCCESS CARD */
.success-card {
  margin-top: 36px;

  background: white;

  border-radius: 16px;

  padding: 24px;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.success-card h2 {
  font-size: 30px;
  color: #111;
}

.subtitle {
  margin-top: 6px;

  color: #777;
  font-size: 16px;
}

/* SUCCESS BOX */
.success-box {
  margin-top: 24px;

  border: 1px solid #ead79c;

  border-radius: 14px;

  padding: 40px 24px;

  text-align: center;
}

/* ICON */
.check-icon {
  width: 72px;
  height: 72px;
}

/* SUCCESS TITLE */
.success-box h1 {
  margin-top: 18px;

  font-size: 42px;
  font-weight: 700;

  color: #111;
}

/* DESC */
.desc {
  margin-top: 14px;

  color: #777;

  line-height: 1.7;
  font-size: 16px;
}

/* DETAIL BOX */
.detail-box {
  margin-top: 26px;

  background: #f5f5f5;

  border-radius: 12px;

  padding: 22px;

  text-align: left;
}

.detail-box p {
  margin-bottom: 14px;

  font-size: 16px;
  color: #111;
}

.detail-box p:last-child {
  margin-bottom: 0;
}

/* BUTTON */
.appointment-btn {
  width: 100%;
  height: 52px;

  margin-top: 26px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.appointment-btn:hover {
  opacity: 0.9;
}
</style>
