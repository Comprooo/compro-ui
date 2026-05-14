<template>
  <div class="page">
    <!-- BACK -->
    <div class="back" @click="goBack">← Kembali ke Detail Mobil</div>

    <!-- CARD MOBIL -->
    <div class="car-card">
      <img :src="car.images?.[0]" />

      <div class="car-info">
        <h2>{{car.specifications?.year}} {{ car.brand }} {{ car.model }} {{ car.specifications?.transmission }}</h2>
        <h3>Rp {{ formatPrice(car.price) }}</h3>

        <ul>
          <li>Tahun: {{ car.specifications?.year }}</li>
          <li>Kilometer: {{ car.specifications?.mileage }}</li>
          <li>Transmisi: {{ car.specifications?.transmission }}</li>
          <li>Bahan Bakar: {{ car.specifications?.fuel }}</li>
        </ul>
      </div>
    </div>

    <!-- FORM -->
    <div class="form-card">
      <h3>Jadwalkan Pertemuan</h3>
      <p>
        Buat jadwal untuk bertemu dengan penjual dan cek kondisi Toyota Avanza
      </p>

      <div class="form-input">

        <!-- INPUT -->
        <div class="form-group">
          <label>Nama Lengkap *</label>
          <input v-model="fullName" type="text" placeholder="Masukkan nama lengkap" />
        </div>

        <div class="form-group">
          <label>No. Handphone *</label>
          <input v-model="phone" type="text" placeholder="08xx xxxx xxxx" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="email@example.com" />
        </div>

        <!-- TANGGAL -->
        <div class="form-group">
          <label>Pilih Tanggal Pertemuan *</label>
          <p class="hint">Pilih dari tanggal yang tersedia</p>

          <div class="tanggal-grid">
            <div
              v-for="date in availableDates"
              :key="date"
              :class="['tanggal-item', selectedDate === date ? 'active' : '']"
              @click="selectDate(date)"
            >
              📅 {{ formatDate(date) }}
            </div>
          </div>
        </div>

        <!-- JAM -->
        <div class="form-group" v-if="selectedDate">
          <label>Pilih Waktu Pertemuan *</label>
          <p class="hint">Waktu tersedia untuk {{ selectedDate }}</p>

          <div class="jam-grid">
            <div
              v-for="time in availableTimes"
              :key="time"
              :class="['jam-item', selectedTime === time ? 'active' : '']"
              @click="selectTime(time)"
            >
              ⏱ {{ time }}
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
            v-model="notes" 
            placeholder="Tambahkan catatan atau pertanyaan...">
          </textarea>
        </div>
      </div>

      <!-- BUTTON -->
      <button class="submit-btn" @click="submitForm">
        Buat Jadwal Pertemuan
      </button>
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
const car = ref({});
const slot = ref([]);
const loading = ref(false);

/* FETCH DETAIL MOBIL */
const fetchCar = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `http://localhost:8000/api/v1/cars/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    car.value = res.data.data;        
    console.log(car.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const fetchSlots = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `http://localhost:8000/api/v1/schedules/available`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    slot.value = res.data.data;
    console.log("Available slots:", res.data.data);
  } catch (err) {
    console.error("Error fetching slots:", err);
  }finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCar();
  fetchSlots();
});

/* FORMAT HARGA */
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

/* STATE */
const fullName = ref("");
const phone = ref("");
const email = ref("");
const selectedDate = ref(null);
const selectedTime = ref(null);
const selectedSlotId = ref(null);
const selectedLocation = ref("");
const selectedLocationLink = ref("");
const notes = ref("");

/* DATA */
const availableDates = computed(() => {
  return [...new Set(slot.value.map(item => item.date))];
});

const availableTimes = computed(() => {
  if (!selectedDate.value) return [];

  return slot.value
    .filter(item => item.date === selectedDate.value)
    .map(item => item.time);
});

/* ACTION */
const selectDate = (date) => {
  selectedDate.value = date;
  selectedTime.value = null;

  const selectedSlot = slot.value.find(
    item => item.date === date
  );

  if (selectedSlot) {
    selectedLocation.value =
      `${selectedSlot.location.location_name} - ${selectedSlot.location.address}`;
    selectedLocationLink.value = 
      `${selectedSlot.location.map_link}`;
  }
};

const selectTime = (time) => {
  selectedTime.value = time;

  const selectedSlot = slot.value.find(
    item =>
      item.date === selectedDate.value &&
      item.time === time
  );

  if (selectedSlot) {
    selectedSlotId.value = selectedSlot.slot_id;

    selectedLocation.value =
      `${selectedSlot.location.location_name} - ${selectedSlot.location.address}`;

    selectedLocationLink.value =
      selectedSlot.location.map_link;
  }
};

const submitForm = async () => {
  if (!fullName.value || !phone.value || !email.value) {
    Swal.fire({
      icon: "warning",
      title: "Field Belum Lengkap",
      text: "Semua field wajib diisi!",
      confirmButtonColor: "#caa63a",
    });
    return;
  }

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
      car_id: route.params.id,
      slot_id: selectedSlotId.value,
      email: email.value,
      phone: phone.value,
      notes: notes.value  || "-",
    };

    console.log(payload);

    const res = await axios.post(
      "http://localhost:8000/api/v1/schedules",
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
    router.push(`/success/${scheduleId}`);
  } catch (err) {
    console.error(err);

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

const goBack = () => {
  router.push(`/detail/${route.params.id}`);
};
</script>

<style scoped>
/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 30px;
  font-family:  "Segoe UI", sans-serif;
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
  margin-top: 16px;
  padding-left: 18px;
  color: #666;
  line-height: 2;
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

.form-card h3 {
  font-size: 26px;
}

.form-card p {
  margin-top: 6px;
  color: #777;
}

.form-input {
  margin-top: 30px;
  border: 1px solid #b1b0ae;
  border-radius: 12px;
  padding: 20px;
}

/* FORM GROUP */
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
