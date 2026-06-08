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
          <!-- START TIME -->
          <div class="time-box">
            <p class="time-label">MASUKKAN WAKTU AWAL</p>

            <div class="time-wrapper">
              <!-- HOUR -->
              <input
                type="number"
                min="0"
                max="23"
                v-model="startHour"
                class="time-input active"
              />

              <span class="colon">:</span>

              <!-- MINUTE -->
              <input
                type="number"
                min="0"
                max="59"
                v-model="startMinute"
                class="time-input"
              />
            </div>

            <div class="time-desc">
              <span>Jam</span>
              <span>Menit</span>
            </div>
          </div>

            <!-- END TIME -->
          <div class="time-box">
            <p class="time-label">MASUKKAN WAKTU AKHIR</p>

            <div class="time-wrapper">
              <!-- HOUR -->
              <input
                type="number"
                min="0"
                max="23"
                v-model="endHour"
                class="time-input active"
              />

              <span class="colon">:</span>

              <!-- MINUTE -->
              <input
                type="number"
                min="0"
                max="59"
                v-model="endMinute"
                class="time-input"
              />
            </div>

            <div class="time-desc">
              <span>Jam</span>
              <span>Menit</span>
            </div>
          </div>
        </div>

        <!-- ACTION BUTTON -->
        <div class="time-actions">
          <button class="cancel-btn" @click="resetTime">
            CANCEL
          </button>

          <button class="ok-btn" @click="addSchedule">
            TAMBAH
          </button>
        </div>
        
        <!-- TIME LIST -->
        <div class="schedule-list">
          <div
            v-for="(schedule, index) in schedules"
            :key="index"
            class="schedule-item"
          >
            <div class="schedule-time"> 
            <img src="/src/assets/icon-jam.svg" />
              {{ schedule.time_start }} - {{ schedule.time_end }}
            </div>
            <button class="delete-btn" @click="removeSchedule(index)">
              <img src="/src/assets/admin/icon-trashred.svg" />
            </button>
          </div>
        </div>
      </div>

      <!-- LOKASI -->
      <div class="section">
        <h3>Lokasi Appointment</h3>
        <div class="location-card">
          <div class="input-group">
            <label>Nama Lokasi</label>
            <input
              type="text"
              v-model="locationName"
              class="lokasi-input"
              placeholder="Contoh: Showroom Utama Bandung"
            />
          </div>

          <div class="input-group">
            <label>Alamat Lengkap</label>
            <textarea
              v-model="address"
              class="lokasi-textarea"
              placeholder="Masukkan alamat lengkap lokasi"
            ></textarea>
          </div>

          <div class="input-group">
            <label>Google Maps Link</label>

            <div class="map-wrapper">
              <input
                type="text"
                v-model="mapLink"
                class="lokasi-input"
                placeholder="https://maps.google.com/..."
              />

              <a
                v-if="mapLink"
                :href="mapLink"
                target="_blank"
                class="map-preview-btn"
              >
                Buka Maps
              </a>
            </div>
          </div>

          <button class="location-submit-btn" @click="createLocation">
            Simpan Lokasi
          </button>
        </div>
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
import axios from "axios";
const router = useRouter();

const selectedDate = ref(new Date());

const startHour = ref("00");
const startMinute = ref("00");

const endHour = ref("00");
const endMinute = ref("00");

const schedules = ref([]);

const locationId = ref(null);
const locationName = ref();
const address = ref();
const mapLink = ref();

const goBack = () => {
  router.push("/admin/jadwal");
};

const addSchedule = () => {
  const start = `${String(startHour.value).padStart(2, "0")}:${String(
    startMinute.value
  ).padStart(2, "0")}`;

  const end = `${String(endHour.value).padStart(2, "0")}:${String(
    endMinute.value
  ).padStart(2, "0")}`;

  // validasi
  if (start >= end) {
    return Swal.fire({
      icon: "warning",
      title: "Waktu tidak valid",
      text: "Waktu akhir harus lebih besar dari waktu awal.",
    });
  }

  // cek duplicate
  const exists = schedules.value.some(
    (item) =>
      item.time_start === start &&
      item.time_end === end
  );

  if (exists) {
    return Swal.fire({
      icon: "warning",
      title: "Jadwal sudah ada",
    });
  }

  schedules.value.push({
    time_start: start,
    time_end: end,
  });

  // reset input
  resetTime();
};

const removeSchedule = (index) => {
  schedules.value.splice(index, 1);
};

const resetTime = () => {
  startHour.value = "00";
  startMinute.value = "00";

  endHour.value = "00";
  endMinute.value = "00";
};

const submitJadwal = async () => {
  try {

    if (!locationId.value) {
      return Swal.fire({
        icon: "warning",
        title: "Lokasi belum dibuat",
        text: "Silakan buat lokasi terlebih dahulu.",
      });
    }

    if (schedules.value.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Belum ada jadwal",
        text: "Tambahkan minimal 1 jadwal.",
      });
    }

    const formattedDate = new Date(selectedDate.value)
      .toISOString()
      .split("T")[0];

    // multiple request
    const requests = schedules.value.map((schedule) => {
      return axios.post(
        "https://backend-autocatalog.vercel.app/api/v1/admin/available-slots",
        {
          location_id: locationId.value,
          date: formattedDate,
          time_start: schedule.time_start,
          time_end: schedule.time_end,
          quota: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    });

    await Promise.all(requests);

    await Swal.fire({
      icon: "success",
      title: "Semua jadwal berhasil dibuat!",
      text: `${schedules.value.length} jadwal berhasil ditambahkan.`,
      confirmButtonColor: "#d4af37",
    });

    router.push("/admin/jadwal");

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal membuat jadwal",
      text: "Periksa kembali data anda.",
    });
  }
};

const createLocation = async () => {
  try {
    const res = await axios.post(
      "https://backend-autocatalog.vercel.app/api/v1/admin/locations",
      {
        location_name: locationName.value,
        address: address.value,
        map_link: mapLink.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res.data);

    // simpan location id
    locationId.value = res.data.data.id;

    Swal.fire({
      icon: "success",
      title: "Lokasi berhasil dibuat",
      text: "Sekarang anda bisa membuat jadwal.",
      confirmButtonColor: "#d4af37",
    });

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal membuat lokasi",
    });
  }
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

.time-footer img{
  width: 30px;
}

.clock-icon {
  font-size: 28px;
}

.footer-btns {
  display: flex;
  gap: 24px;
}

/* TIME ACTION */
.time-actions {
  display: flex;
  justify-content: flex-end;
  gap: 18px;

  margin-top: 24px;
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

/* SCHEDULE LIST */
.schedule-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 14px;

  margin-top: 22px;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  margin: 10px
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
  padding-left: 8px;
  padding-right: 8px;
}

.schedule-item img{
  width: 20px;
}

.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.delete-btn img {
  width: 24px;
}


/* LOCATION CARD */
.location-card {
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 18px;

  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-group label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.lokasi-textarea {
  width: 95%;
  min-height: 120px;

  border: none;
  outline: none;

  background: white;

  border-radius: 10px;

  padding: 16px;

  font-size: 16px;
  font-family: "Segoe UI", sans-serif;

  resize: none;

  border: 1px solid #ddd;
}

/* MAP */
.map-wrapper {
  display: flex;
  gap: 14px;
}

.map-preview-btn {
  min-width: 140px;
  height: 62px;

  background: #00c853;
  color: white;

  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  font-weight: 600;

  transition: 0.2s;
}

.map-preview-btn:hover {
  background: #00b248;
}

/* LOCATION BUTTON */
.location-submit-btn {
  width: 100%;
  height: 58px;

  border: none;
  border-radius: 12px;

  background: #111;
  color: white;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.location-submit-btn:hover {
  opacity: 0.92;
}

/* INPUT */
.lokasi-input {
  width: 95%;
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
