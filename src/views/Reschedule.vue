<template>
  <div class="page">
    <!-- TOPBAR -->
    <div class="topbar">
      <button class="back-btn" @click="goBack">← Kembali</button>
    </div>

    <!-- CONTENT -->
    <div class="container">
      <!-- TITLE -->
      <div class="heading">
        <h1>Reschedule Appointment</h1>
        <p>Atur ulang jadwal pertemuan Anda</p>
      </div>

      <!-- CAR CARD -->
      <div class="car-card">
        <img src="/src/assets/avanza.png" class="car-image" />

        <div class="car-content">
          <h2>Toyota Avanza</h2>
          <h3>Rp 250.000.000</h3>

          <ul>
            <li>Tahun: 2022</li>
            <li>Kilometer: 20.000 km</li>
            <li>Transmisi: automatic</li>
            <li>Bahan Bakar: bensin</li>
          </ul>
        </div>
      </div>

      <!-- FORM -->
      <div class="form-card">
        <h3>Jadwal Baru</h3>

        <p class="subtitle">
          Pilih tanggal dan waktu baru untuk pertemuan Anda
        </p>

        <!-- NAMA -->
        <div class="form-group">
          <label>Nama Lengkap *</label>

          <input type="text" placeholder="Masukkan nama lengkap" />
        </div>

        <!-- HP -->
        <div class="form-group">
          <label>No. Handphone *</label>

          <input type="text" placeholder="08xx xxxx xxxx" />
        </div>

        <!-- EMAIL -->
        <div class="form-group">
          <label>Email</label>

          <input type="email" placeholder="email@example.com" />
        </div>

        <!-- PILIH HARI -->
        <div class="form-group">
          <label>Pilih Tanggal Pertemuan *</label>

          <p class="small-text">Pilih dari tanggal yang tersedia</p>

          <div class="date-grid">
            <button
              v-for="day in dates"
              :key="day"
              @click="selectedDate = day"
              :class="['date-btn', selectedDate === day ? 'active-date' : '']"
            >
              📅 {{ day }}
            </button>
          </div>
        </div>

        <!-- PILIH JAM -->
        <div v-if="selectedDate" class="form-group">
          <label>Pilih Waktu Pertemuan *</label>

          <p class="small-text">Waktu tersedia untuk {{ selectedDate }}</p>

          <div class="time-grid">
            <button
              v-for="time in times"
              :key="time"
              @click="selectedTime = time"
              :class="['time-btn', selectedTime === time ? 'active-time' : '']"
            >
              🕘 {{ time }}
            </button>
          </div>
        </div>

        <!-- LOKASI -->
        <div class="form-group">
          <label>Lokasi Appointment</label>

          <p class="small-text">
            Lokasi tidak dapat diubah. Tambahkan lokasi lain pada kolom pesan
            jika ingin pindah lokasi
          </p>

          <input
            type="text"
            value="Rumah abang"
            disabled
            class="disabled-input"
          />
        </div>

        <!-- PESAN -->
        <div class="form-group">
          <label>Pesan (Opsional)</label>

          <textarea
            placeholder="Tambahkan catatan atau pertanyaan..."
            v-model="message"
          ></textarea>
        </div>

        <!-- BUTTON -->
        <button class="submit-btn" @click="submitReschedule">
          Buat Jadwal Pertemuan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedDate = ref("");
const selectedTime = ref("");
const message = ref("");

const dates = [
  "Jumat, 10 April 2026",
  "Sabtu, 11 April 2026",
  "Senin, 13 April 2026",
  "Selasa, 14 April 2026",
  "Rabu, 15 April 2026",
  "Kamis, 16 April 2026",
];

const times = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const goBack = () => {
  router.back();
};

const submitReschedule = () => {
  router.push("/successreschedule");
};
</script>

<style scoped>
/* PAGE */
.page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* TOPBAR */
.topbar {
  height: 74px;
  background: white;

  display: flex;
  align-items: center;

  padding: 0 40px;

  border-bottom: 1px solid #ececec;
}

.back-btn {
  border: none;
  background: transparent;

  font-size: 18px;
  cursor: pointer;
}

/* CONTAINER */
.container {
  width: 760px;
  margin: 30px auto 60px;
}

/* HEADING */
.heading h1 {
  font-size: 52px;
  font-weight: 700;
}

.heading p {
  margin-top: 6px;
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

.car-image {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.car-content {
  padding: 20px;
}

.car-content h2 {
  font-size: 22px;
}

.car-content h3 {
  margin-top: 8px;

  color: #d4af37;
  font-size: 20px;
}

.car-content ul {
  margin-top: 16px;
  padding-left: 18px;

  color: #666;
  line-height: 1.9;
}

/* FORM */
.form-card {
  margin-top: 40px;

  background: white;
  border-radius: 16px;

  padding: 26px;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.form-card h3 {
  font-size: 26px;
}

.subtitle {
  margin-top: 6px;
  color: #777;
}

/* GROUP */
.form-group {
  margin-top: 22px;
}

.form-group label {
  display: block;

  margin-bottom: 10px;

  font-weight: 600;
}

/* INPUT */
input,
textarea {
  width: 100%;

  border: none;
  outline: none;

  background: #f3f3f3;

  border-radius: 10px;

  padding: 14px 16px;

  font-size: 15px;

  box-sizing: border-box;
}

textarea {
  min-height: 90px;
  resize: none;
}

/* DISABLED */
.disabled-input {
  background: #ebebeb;
  color: #666;
  cursor: not-allowed;
}

/* SMALL */
.small-text {
  margin-bottom: 10px;
  color: #777;
  font-size: 14px;
}

/* DATE GRID */
.date-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

/* DATE BTN */
.date-btn {
  height: 44px;

  border-radius: 10px;
  border: 1px solid #ead79c;

  background: white;

  cursor: pointer;

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s;
}

.active-date {
  background: #d4af37;
  border: none;
}

/* TIME GRID */
.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* TIME BTN */
.time-btn {
  height: 42px;

  border-radius: 10px;
  border: 1px solid #ead79c;

  background: white;

  cursor: pointer;

  transition: 0.2s;
}

.active-time {
  background: #d4af37;
  border: none;
}

/* SUBMIT */
.submit-btn {
  margin-top: 30px;

  width: 100%;
  height: 48px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
}

.submit-btn:hover {
  opacity: 0.9;
}
</style>
