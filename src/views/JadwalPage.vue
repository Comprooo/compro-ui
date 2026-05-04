<template>
  <div class="page">
    <!-- BACK -->
    <div class="back" @click="goBack">← Kembali ke Detail Mobil</div>

    <!-- CARD MOBIL -->
    <div class="car-card">
      <img src="/src/assets/avanza.png" />

      <div class="car-info">
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
      <h3>Jadwalkan Pertemuan</h3>
      <p>
        Buat jadwal untuk bertemu dengan penjual dan cek kondisi Toyota Avanza
      </p>

      <!-- INPUT -->
      <div class="form-group">
        <label>Nama Lengkap *</label>
        <input type="text" placeholder="Masukkan nama lengkap" />
      </div>

      <div class="form-group">
        <label>No. Handphone *</label>
        <input type="text" placeholder="08xx xxxx xxxx" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="email@example.com" />
      </div>

      <!-- TANGGAL -->
      <div class="form-group">
        <label>Pilih Tanggal Pertemuan *</label>
        <p class="hint">Pilih dari tanggal yang tersedia</p>

        <div class="tanggal-grid">
          <div
            v-for="date in dates"
            :key="date"
            :class="['tanggal-item', selectedDate === date ? 'active' : '']"
            @click="selectDate(date)"
          >
            📅 {{ date }}
          </div>
        </div>
      </div>

      <!-- JAM -->
      <div class="form-group" v-if="selectedDate">
        <label>Pilih Waktu Pertemuan *</label>
        <p class="hint">Waktu tersedia untuk {{ selectedDate }}</p>

        <div class="jam-grid">
          <div
            v-for="time in times"
            :key="time"
            :class="['jam-item', selectedTime === time ? 'active' : '']"
            @click="selectTime(time)"
          >
            ⏱ {{ time }}
          </div>
        </div>
      </div>

      <!-- PESAN -->
      <div class="form-group">
        <label>Pesan (Opsional)</label>
        <textarea placeholder="Tambahkan catatan atau pertanyaan..."></textarea>
      </div>

      <!-- BUTTON -->
      <button class="submit-btn" @click="submitForm">
        Buat Jadwal Pertemuan
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

/* DATA */
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

/* STATE */
const selectedDate = ref(null);
const selectedTime = ref(null);

/* ACTION */
const selectDate = (date) => {
  selectedDate.value = date;
  selectedTime.value = null; // reset jam
};

const selectTime = (time) => {
  selectedTime.value = time;
};

const submitForm = () => {
  if (!selectedDate.value || !selectedTime.value) {
    alert("Pilih tanggal dan jam dulu!");
    return;
  }

  router.push("/success");
};

const goBack = () => {
  router.push("/detail");
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 30px;
  font-family: sans-serif;
}

/* BACK */
.back {
  margin-bottom: 20px;
  cursor: pointer;
}

/* CARD MOBIL */
.car-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 700px;
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.car-card img {
  width: 100%;
}

.car-info {
  padding: 20px;
}

.car-info h3 {
  color: #caa63a;
}

.car-info ul {
  margin-top: 10px;
  padding-left: 18px;
}

/* FORM */
.form-card {
  margin-top: 40x;
  background: white;
  border-radius: 12px;
  padding: 25px;
  max-width: 700px;
  margin: auto;
  border: 1px solid #e2c46f;
}

/* FORM GROUP */
.form-group {
  margin-top: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #eee;
  margin-top: 6px;
}

textarea {
  height: 80px;
}

.hint {
  font-size: 12px;
  color: gray;
}

/* TANGGAL */
.tanggal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.tanggal-item {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: white;
  transition: 0.2s;
}

/* JAM */
.jam-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.jam-item {
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: white;
}

/* ACTIVE */
.active {
  background: #caa63a;
  color: white;
  border: none;
}

/* BUTTON */
.submit-btn {
  margin-top: 20px;
  width: 100%;
  background: #caa63a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
