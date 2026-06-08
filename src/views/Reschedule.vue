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
        <img :src="appointment.car?.images?.[0]" />

        <div class="car-content">
          <h2>{{appointment.car?.specifications?.year}} {{ appointment.car?.brand }} {{ appointment.car?.model }} {{ appointment.car?.specifications?.transmission }}</h2>
          <h3>Rp {{ formatPrice(appointment.car?.price) }}</h3>

          <ul>
            <li>Tahun: {{ appointment.car?.specifications?.year }}</li>
            <li>Kilometer: {{ appointment.car?.specifications?.mileage }} </li>
            <li>Transmisi: {{ appointment.car?.specifications?.transmission }}</li>
            <li>Bahan Bakar: {{ appointment.car?.specifications?.fuel }}</li>
          </ul>
        </div>
      </div>

      <!-- FORM -->
      <div class="form-card">
        <h3>Jadwal Baru</h3>
        <p class="subtitle">
          Pilih tanggal dan waktu baru untuk pertemuan Anda
        </p>
          
        <div class="form-input">
          <!-- HP -->
          <div class="form-group">
            <label>No. Handphone *</label>
            <input v-model="phone" type="text" placeholder="08xx xxxx xxxx" readonly />
          </div>

          <!-- EMAIL -->
          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="email@example.com" readonly />
          </div>

          <!-- PILIH HARI -->
          <div class="form-group">
            <label>Pilih Tanggal Pertemuan *</label>
            <p class="hint">Pilih dari tanggal yang tersedia</p>
            <div class="tanggal-grid">
             <div
                v-for="day in availableDates"
                :key="day"
                @click="selectDate(day)"
                :class="['tanggal-item', selectedDate === day ? 'active' : '']"
              >
                📅 {{ formatDate(day) }}
              </div>
            </div>
          </div>

          <!-- PILIH JAM -->
          <div v-if="selectedDate" class="form-group">
            <label>Pilih Waktu Pertemuan *</label>
            <p class="hint">Waktu tersedia untuk {{ selectedDate }}</p>
            <div class="jam-grid">
              <div
                v-for="slot in availableTimes"
                :key="slot.slot_id"
                @click="selectTime(slot)"
                :class="[
                  'jam-item',
                  selectedSlotId === slot.slot_id ? 'active' : ''
                ]"
              >
                ⏱ {{ slot.time }}
              </div>
            </div>
          </div>

          <!-- LOKASI -->
        <div class="form-group">
          <label>Lokasi Appointment</label>

          <div class="location-box">
            <div class="location-header">
              📍 Lokasi Pertemuan
            </div>

            <div class="location-name">
              {{ selectedLocation || "Pilih tanggal terlebih dahulu" }}
            </div>

            <a
              v-if="selectedLocationLink"
              :href="selectedLocationLink"
              target="_blank"
              class="map-link"
            >
              Buka di Google Maps →
            </a>
          </div>

          <p class="hint">
            Lokasi default dari dealer. Jika ingin perubahan lokasi,
            silakan tambahkan pada kolom pesan.
          </p>
        </div>

          <!-- PESAN -->
          <div class="form-group">
            <label>Pesan (Opsional)</label>
            <textarea
              placeholder="Tambahkan catatan atau pertanyaan..."
              v-model="notes"
            ></textarea>
          </div>
        </div>
        <!-- BUTTON -->
        <button class="submit-btn" @click="submitReschedule">
          Reschedule Jadwal Pertemuan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const appointment = ref({});
const slots = ref([]);

const fullName = ref("");
const phone = ref("");
const email = ref("");
const selectedDate = ref(null);
const selectedTime = ref(null);
const selectedSlotId = ref(null);
const selectedLocation = ref("");
const selectedLocationLink = ref("");
const notes = ref("");

const message = ref("");

/* FETCH APPOINTMENT DETAIL */
const fetchAppointment = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `https://backend-autocatalog.vercel.app/api/v1/schedules/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    appointment.value = res.data.data;
    fullName.value = appointment.value.customer?.name || "";
    phone.value = appointment.value.phone || "";
    email.value = appointment.value.email || "";
    console.log("Appointment:", appointment.value);

  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/* FETCH AVAILABLE SLOT */
const fetchSlots = async () => {
  try {
    const res = await axios.get(
      "https://backend-autocatalog.vercel.app/api/v1/schedules/available",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    slots.value = res.data.data;
    console.log("Available Slots:", slots.value);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchAppointment();
  fetchSlots();
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

/* AVAILABLE DATE */
const availableDates = computed(() => {
  return [...new Set(slots.value.map(item => item.date))];
});

/* AVAILABLE TIME */
const availableTimes = computed(() => {
  if (!selectedDate.value) return [];

  return slots.value.filter(
    slot => slot.date === selectedDate.value
  );
});

/* SELECT DATE */
const selectDate = (date) => {
  selectedDate.value = date;

  selectedTime.value = "";
  selectedSlotId.value = null;

  selectedLocation.value = "";
  selectedLocationLink.value = "";
};

/* SELECT TIME */
const selectTime = (slot) => {
  selectedTime.value = slot.time;
  selectedSlotId.value = slot.slot_id;

  selectedLocation.value =
    `${slot.location.location_name} - ${slot.location.address}`;

  selectedLocationLink.value =
    slot.location?.map_link || "";
};

/* BACK */
const goBack = () => {
  router.back();
};

/* SUBMIT RESCHEDULE */
const submitReschedule = async () => {
  if (!selectedDate.value || !selectedTime.value) {
    Swal.fire({
      icon: "warning",
      title: "Tanggal dan Jam Belum Dipilih",
      text: "Pilih tanggal dan jam dulu!",
      confirmButtonColor: "#caa63a",
    });
    return;
  }

  try {
    loading.value = true;

  const payload = {
    new_slot_id: selectedSlotId.value,
    notes: notes.value || "-",
  };

    console.log(payload);

    const res  = await axios.patch(
      `https://backend-autocatalog.vercel.app/api/v1/schedules/${route.params.id}/reschedule`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Appointment success:", res.data);

   Swal.fire({
      icon: "success",
      title: "Jadwal Berhasil Dibuat!",
      text: "Penjual akan segera untuk konfirmasi.",
      confirmButtonColor: "#caa63a",
    });

    const scheduleId = res.data.data.id;
    router.push(`/successreschedule/${scheduleId}`);
  } catch (err) {
    console.error(err);
    console.log(err.response);
    console.log(err.response?.data);

    Swal.fire({
      icon: "error",
      title: "Gagal Membuat Jadwal",
      text: "Gagal membuat appointment",
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

.car-content {
  padding: 20px;
}

.car-content h3 {
  color: #caa63a;
}

.car-content ul {
  margin-top: 16px;
  padding-left: 18px;
  color: #666;
  line-height: 2;
}

/* FORM */
.form-card {
  margin-top: 40px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  max-width: 700px;
  margin: auto;
  border: 1px solid #e2c46f;
}

.form-card h3 {
  font-size: 26px;
}

.subtitle {
  color: #777;
}

.form-input {
  margin-top: 30px;
  border: 1px solid #b1b0ae;
  border-radius: 12px;
  padding: 20px;
}

/* GROUP */
.form-group {
  margin-top: 15px;
}

.form-group input,
.form-group textarea {
  width: 97%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #eee;
  margin-top: 6px;
  resize: none;
}

.form-group textarea {
  height: 80px;
}

.form-group input[readonly] {
  background: #e7e7e7;
  cursor: not-allowed;
  color: #666;
}

.hint {
  font-size: 12px;
  color: gray;
}

/* TANGGAL */
.tanggal-grid {
  text-align: center;
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

.tanggal-item:hover {
  background: #caa63a;;
  border-color: #caa63a;
  color: white;
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

.jam-item:hover {
  background: #caa63a;;
  border-color: #caa63a;
  color: white;
}

/* LOCATION BOX */
.location-box {
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #f8f8f8;
  border: 1px solid #e2c46f;
}

.location-header {
  font-size: 13px;
  font-weight: 600;
  color: #caa63a;
  margin-bottom: 8px;
}

.location-name {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
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

/* ACTIVE */
.active{
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
