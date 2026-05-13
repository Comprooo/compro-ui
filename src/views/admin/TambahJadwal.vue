<template>
  <div class="tambah-jadwal-page">
    <!-- HEADER -->
    <div class="topbar">
      <div class="back-wrapper" @click="goBack">
        <span class="back-icon">←</span>
        <h2>Kembali ke Jadwal Appointments</h2>
      </div>
    </div>

    <!-- CARD -->
    <div class="main-card">
      <!-- TANGGAL -->
      <div class="section">
        <h3>Pilih Tanggal Pertemuan</h3>

        <VDatePicker
          v-model="selectedDate"
          color="yellow"
          borderless
          transparent
          expanded
        />
      </div>

      <!-- WAKTU -->
      <div class="section">
        <h3>Pilih Waktu Pertemuan</h3>

        <div class="time-section">
          <!-- TIME PICKER -->
          <div class="time-box">
            <p class="time-label">MASUKKAN WAKTU</p>

            <div class="time-wrapper">
              <!-- HOUR -->
              <input
                type="number"
                min="0"
                max="23"
                v-model="hour"
                class="time-input active"
              />

              <span class="colon">:</span>

              <!-- MINUTE -->
              <input
                type="number"
                min="0"
                max="59"
                v-model="minute"
                class="time-input"
              />
            </div>

            <div class="time-desc">
              <span>Jam</span>
              <span>Menit</span>
            </div>

            <div class="time-footer">
              <span class="clock-icon">🕒</span>

              <div class="footer-btns">
                <button class="cancel-btn">CANCEL</button>
                <button class="ok-btn" @click="addSchedule">OK</button>
              </div>
            </div>
          </div>

          <!-- TIME LIST -->
          <div
            v-for="(schedule, index) in schedules"
            :key="index"
            class="schedule-item"
          >
            <div class="schedule-time">🕒 {{ schedule }}</div>

            <button class="delete-btn" @click="removeSchedule(index)">
              <img src="/src/assets/admin/icon-trashred.svg" />
            </button>
          </div>
        </div>
      </div>

      <!-- LOKASI -->
      <div class="section">
        <h3>Lokasi Appointment</h3>

        <input type="text" v-model="lokasi" class="lokasi-input" />
      </div>

      <!-- BUTTON -->
      <button class="submit-btn" @click="submitJadwal">Tambahkan Jadwal</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const selectedDate = ref(new Date());

const hour = ref("11");
const minute = ref("00");

const lokasi = ref("Rumah abang");

const schedules = ref(["10:00"]);

const goBack = () => {
  router.push("/admin/jadwal");
};

const addSchedule = () => {
  const formattedHour = String(hour.value).padStart(2, "0");
  const formattedMinute = String(minute.value).padStart(2, "0");

  schedules.value.push(`${formattedHour}:${formattedMinute}`);
};

const removeSchedule = (index) => {
  schedules.value.splice(index, 1);
};

const submitJadwal = () => {
  Swal.fire({
    icon: "success",
    title: "Jadwal berhasil ditambahkan!",
    text: "Data jadwal appointment berhasil disimpan.",
    confirmButtonText: "Kembali",
    confirmButtonColor: "#d4af37",
    background: "#ffffff",

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      htmlContainer: "custom-text",
      confirmButton: "custom-button",
      actions: "my-actions",
    },
  }).then(() => {
    router.push("/admin/jadwal");
  });
};
</script>

<style scoped>
.tambah-jadwal-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* HEADER */
.topbar {
  height: 92px;
  background: white;
  border-bottom: 1px solid #e8e8e8;

  display: flex;
  align-items: center;

  padding: 0 44px;
}

.back-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;

  cursor: pointer;
}

.back-icon {
  font-size: 28px;
}

.back-wrapper h2 {
  font-size: 20px;
  font-weight: 500;
}

/* CARD */
.main-card {
  width: 760px;

  margin: 42px auto;

  background: white;

  border-radius: 18px;
  border: 1px solid #ecd78f;

  padding: 28px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* SECTION */
.section {
  margin-bottom: 32px;
}

.section h3 {
  font-size: 18px;
  font-weight: 600;

  margin-bottom: 18px;
}

/* VCALENDAR */
:deep(.vc-container) {
  width: 320px;
  border-radius: 16px;
  border: 1px solid #d4af37;
  box-shadow: none;
}

:deep(.vc-title) {
  font-size: 20px;
  font-weight: 700;
}

:deep(.vc-highlight) {
  background: #d4af37 !important;
}

/* TIME */
.time-section {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.time-box {
  width: 320px;

  background: white;

  border-radius: 10px;

  padding: 26px;

  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.12);
}

.time-label {
  font-size: 12px;
  letter-spacing: 2px;
  color: #777;

  margin-bottom: 22px;
}

.time-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 12px;
}

.time-input {
  width: 100px;
  height: 90px;

  border: none;
  outline: none;

  border-radius: 4px;

  background: #efefef;

  text-align: center;

  font-size: 58px;
  font-weight: 300;

  font-family: "Segoe UI", sans-serif;
}

.time-input.active {
  border: 2px solid #d4af37;
  background: white;
  color: #d4af37;
}

.colon {
  font-size: 56px;
  font-weight: 300;
}

.time-desc {
  display: flex;
  gap: 98px;

  color: #666;
  font-size: 14px;

  margin-bottom: 36px;
}

.time-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clock-icon {
  font-size: 28px;
}

.footer-btns {
  display: flex;
  gap: 24px;
}

.cancel-btn,
.ok-btn {
  width: 110px;
  height: 46px;

  border: none;
  border-radius: 10px;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

/* CANCEL */
.cancel-btn {
  background: #ff4d4f;
  color: white;
}

.cancel-btn:hover {
  background: #eb3d3f;
}

/* OK */
.ok-btn {
  background: #00c853;
  color: white;
}

.ok-btn:hover {
  background: #00b248;
}

/* SCHEDULE */
.schedule-item {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 10px;
}

.schedule-time {
  height: 40px;
  min-width: 130px;

  background: #d4af37;

  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 20px;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete-btn img {
  width: 24px;
}

/* INPUT */
.lokasi-input {
  width: 100%;
  height: 62px;

  border: none;
  outline: none;

  background: #f3f3f3;

  border-radius: 8px;

  padding: 0 18px;

  font-size: 18px;
  font-family: "Segoe UI", sans-serif;
}

/* BUTTON */
.submit-btn {
  width: 100%;
  height: 58px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  font-size: 22px;
  font-weight: 500;

  cursor: pointer;

  transition: 0.2s;
}

.submit-btn:hover {
  opacity: 0.92;
}

/* SWEET ALERT */
:global(.custom-popup) {
  border-radius: 20px !important;
  padding: 34px 26px !important;
}

:global(.custom-title) {
  text-align: center !important;

  font-size: 32px !important;
  font-weight: 700 !important;

  font-family: "Segoe UI", sans-serif !important;
}

:global(.custom-text) {
  text-align: center !important;

  font-size: 18px !important;

  font-family: "Segoe UI", sans-serif !important;
}

:global(.custom-button) {
  border-radius: 12px !important;

  padding: 12px 36px !important;

  font-size: 18px !important;
  font-weight: 600 !important;

  font-family: "Segoe UI", sans-serif !important;
}

:global(.my-actions) {
  width: 100%;
  display: flex !important;
  justify-content: center !important;
  margin-top: 24px !important;
}

:global(.swal2-styled) {
  margin: 0 !important;
}
</style>
