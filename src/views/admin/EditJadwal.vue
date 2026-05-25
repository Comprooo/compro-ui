<template>
  <div class="edit-jadwal-page">
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
              <input
                type="number"
                min="0"
                max="23"
                v-model="startHour"
                class="time-input active"
              />

              <span class="colon">:</span>

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
              <input
                type="number"
                min="0"
                max="23"
                v-model="endHour"
                class="time-input active"
              />

              <span class="colon">:</span>

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
        </div>
      </div>

      <!-- BUTTON -->
      <button class="submit-btn" @click="updateJadwal">Perbarui Jadwal</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const slotId = route.params.id;

// DATE
const selectedDate = ref(new Date());

// TIME
const startHour = ref("00");
const startMinute = ref("00");

const endHour = ref("00");
const endMinute = ref("00");

// LOCATION
const locationId = ref(null);
const locationName = ref("");
const address = ref("");
const mapLink = ref("");

const goBack = () => {
  router.push("/admin/jadwal");
};

onMounted(() => {
  // ambil query dari halaman sebelumnya
  const {
    date,
    time,
    location_id,
    location_name,
    address: locationAddress,
    map_link,
  } = route.query;

  // DATE
  if (date) {
    selectedDate.value = new Date(date);
  }

  // TIME
  if (time) {
    const [start, end] = time.split(" - ");

    const [sh, sm] = start.split(":");
    const [eh, em] = end.split(":");

    startHour.value = sh;
    startMinute.value = sm;

    endHour.value = eh;
    endMinute.value = em;
  }

  // LOCATION
  locationId.value = location_id || null;
  locationName.value = location_name || "";
  address.value = locationAddress || "";
  mapLink.value = map_link || "";
});

const updateJadwal = async () => {
  try {
    const formattedDate = new Date(selectedDate.value)
      .toISOString()
      .split("T")[0];

    const formattedStartTime =
      `${String(startHour.value).padStart(2, "0")}:${String(
        startMinute.value
      ).padStart(2, "0")}`;

    const formattedEndTime =
      `${String(endHour.value).padStart(2, "0")}:${String(
        endMinute.value
      ).padStart(2, "0")}`;

    // VALIDASI
    if (formattedStartTime >= formattedEndTime) {
      return Swal.fire({
        icon: "warning",
        title: "Waktu tidak valid",
        text: "Waktu akhir harus lebih besar dari waktu awal.",
      });
    }

    await axios.patch(
      `http://localhost:8000/api/v1/admin/available-slots/${slotId}`,
      {
        location_id: String(locationId.value),
        date: formattedDate,
        time_start: formattedStartTime,
        time_end: formattedEndTime,
        quota: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      icon: "success",
      title: "Jadwal berhasil diperbarui!",
      text: "Data jadwal appointment berhasil disimpan.",
      confirmButtonColor: "#d4af37",
    });

    router.push("/admin/jadwal");

  } catch (err) {
    console.error(err.response?.data || err);
    console.log(err.response.data)

    Swal.fire({
      icon: "error",
      title: "Gagal update jadwal",
      text: err.response?.data?.message || "Terjadi kesalahan",
    });
  }
};
</script>

<style scoped>
.edit-jadwal-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", sans-serif;
}

/* SWEET ALERT */
:global(.my-actions) {
  width: 100%;
  display: flex !important;
  justify-content: center !important;
  margin-top: 24px !important;
}

:global(.swal2-styled) {
  margin: 0 !important;
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
  width: 720px;

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

  margin-bottom: 16px;
}

/* VCALENDAR */
:deep(.vc-container) {
  width: 320px;

  border-radius: 16px;
  border: 1px solid #d4af37;

  font-family: "Segoe UI", sans-serif;

  box-shadow: none;
}

:deep(.vc-header) {
  padding-top: 16px;
}

:deep(.vc-title) {
  font-size: 18px;
  font-weight: 700;
}

:deep(.vc-weekdays) {
  margin-top: 8px;
}

:deep(.vc-day-content) {
  width: 32px;
  height: 32px;

  font-size: 14px;
}

:deep(.vc-highlight) {
  background: #d4af37 !important;
}

:deep(.vc-weeks) {
  padding-bottom: 12px;
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
  text-align: center !important;

  padding: 12px 36px !important;

  font-size: 18px !important;
  font-weight: 600 !important;

  font-family: "Segoe UI", sans-serif !important;
}
</style>
