<template>
  <div class="page">
    <!-- TOPBAR -->
    <div class="topbar">
      <div class="back-btn" @click="goBack">
        <span>←</span>
        <p>Kembali ke Daftar Appointments</p>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="container">
      <!-- IMAGE -->
      <img :src="appointment.car?.thumbnail" class="banner-image" />

      <!-- CARD -->
      <div class="card">
        <!-- NAMA -->
         <div class="field">
            <label>Nama Pelanggan</label>
            <div class="input-box">{{ appointment.user?.username }}</div>
         </div>
        <!-- MOBIL -->
        <div class="field">
          <label>Nama Kendaraan</label>

          <div class="input-box">{{appointment?.car?.brand}} {{ appointment?.car?.model }}</div>
        </div>

        <!-- APPOINTMENT -->
        <div class="field">
          <label>Informasi Appointments</label>

          <p class="desc">
            Informasi data pelanggan dan jadwal appointment yang diajukan
          </p>

          <div class="info-box">
            <div class="info-item">
              <img src="/src/assets/admin/icon-calendar2.svg" />
              <span>{{ formatDate(appointment?.slot?.date) }}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-jam.svg" />
              <span>{{ appointment?.slot?.time }}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-callungu.png" />
              <span>{{appointment?.phone}}</span>
            </div>

            <div class="info-item">
              <img src="/src/assets/icon-msghijau.png" />
              <span>{{ appointment?.email }}</span>
            </div>
          </div>
        </div>

        <!-- LOKASI -->
        <div class="field">
          <label>Lokasi Appointment</label>
            <div class="location-box">
              <div class="location-header">
                <img src="/src/assets/admin/icon-location.svg" class="location-icon" />
                <div>
                  <h4>
                    {{ appointment?.slot?.location?.location_name }}
                  </h4>
                  <p>
                    {{ appointment?.slot?.location?.address }}
                  </p>
                </div>
              </div>
              <a
                :href="appointment?.slot?.location?.map_link"
                target="_blank"
                class="map-link"
              >
                Lihat Lokasi di Google Maps
              </a>
            </div>        
        </div>

        <!-- PESAN -->
        <div class="field">
          <label>Pesan (Opsional)</label>

          <div class="textarea-box">
            {{appointment?.notes}}
          </div>
        </div>

        <!-- STATUS -->
        <div class="status-wrapper">
          <button
            class="status-btn"
            :class="{ active: selectedStatus === 'confirmed' }"
            @click="selectedStatus = 'confirmed'"
          >
            Konfirmasi
          </button>

          <button
            class="status-btn reject"
            :class="{ activeReject: selectedStatus === 'cancelled' }"
            @click="selectedStatus = 'cancelled'"
          >
            Tolak
          </button>
        </div>

        <!-- UPDATE -->
        <button class="update-btn" @click="updateStatus">
          Perbarui Status Appointment
        </button>

        <!--DELETE-->
        <button class="delete-btn" @click="deleteAppointment">
          Hapus Appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const appointment = ref({});
const loading = ref(false);
const selectedStatus = ref("confirmed");

onMounted(() => {
  fetchDetail();
});

/* FETCH DETAIL APPOINTMENT */
const fetchDetail = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `https://backend-autocatalog.vercel.app/api/v1/admin/schedules/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    appointment.value = res.data.data;

    // set status awal sesuai API
    selectedStatus.value = appointment.value.status;

    console.log(appointment.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

/* UPDATE STATUS */
const updateStatus = async () => {
  try {
    await axios.patch(
      `https://backend-autocatalog.vercel.app/api/v1/admin/schedules/${route.params.id}/status`,
      {
        status: selectedStatus.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Status appointment berhasil diperbarui",
      showConfirmButton: false,
      timer:1800,
    });

    setTimeout(() =>{
      router.push("/admin/appointment");
    },1800);
    
  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal memperbarui status",
    });
  }
};

/* DELETE STATUS */
const deleteAppointment = async () => {
  try {
    const result = await Swal.fire({
      title: "Hapus Appointment?",
      text: "Data appointment akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    await axios.delete(
      `https://backend-autocatalog.vercel.app/api/v1/admin/schedules/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Appointment berhasil dihapus",
      showConfirmButton: false,
      timer:1800,
    });

    setTimeout(() =>{
      router.push("/admin/appointment");
    },1800);

  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menghapus appointment",
    });
  }
};

/* ROUTER */
const goBack = () => {
  router.push("/admin/appointment");
};

/* FORMAT */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7f7f7;

  font-family: "Segoe UI", sans-serif;
}

/* TOPBAR */
.topbar {
  height: 92px;

  background: white;

  border-bottom: 1px solid #e8e1cc;

  display: flex;
  align-items: center;

  padding: 0 44px;
}

/* BACK */
.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
}

.back-btn span {
  font-size: 24px;
}

.back-btn p {
  font-size: 20px;
  color: #111;
}

/* CONTAINER */
.container {
  width: 100%;
  max-width: 920px;

  margin: 44px auto 80px;
}

/* IMAGE */
.banner-image {
  width: 100%;
  height: 420px;

  object-fit: cover;

  border-radius: 16px;

  margin-bottom: 22px;
}

/* CARD */
.card {
  background: white;

  border-radius: 18px;

  padding: 30px;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

/* FIELD */
.field {
  margin-bottom: 24px;
}

.field label {
  display: block;

  font-size: 18px;
  font-weight: 700;

  color: #111;

  margin-bottom: 10px;
}

/* DESC */
.desc {
  color: #7b7b7b;
  font-size: 16px;

  margin-bottom: 14px;
}

/* LOCATION */
.location-box {
  background: #fafafa;

  border: 1px solid #e2c567;
  border-radius: 14px;

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 18px;
}

.location-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.location-icon {
  width: 22px;
  height: 22px;

  margin-top: 2px;
}

.location-header h4 {
  font-size: 18px;
  font-weight: 700;

  color: #111;

  margin-bottom: 6px;
}

.location-header p {
  color: #666;
  line-height: 1.6;

  font-size: 15px;
}

.map-link {
  width: fit-content;

  background: #d4af37;
  color: white;

  text-decoration: none;

  padding: 10px 18px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s;
}

.map-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* INPUT */
.input-box,
.textarea-box {
  width: 100%;

  background: #f6f6f6;

  border-radius: 10px;

  padding: 16px 18px;

  color: #222;

  font-size: 16px;
}

.textarea-box {
  min-height: 82px;
}

/* INFO BOX */
.info-box {
  border: 1px solid #e2c567;

  border-radius: 14px;

  padding: 22px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 22px 30px;
}

/* ITEM */
.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-item img {
  width: 18px;
  height: 18px;

  object-fit: contain;

  opacity: 0.7;
}

.info-item span {
  color: #727272;
  font-size: 16px;
}

/* STATUS */
.status-wrapper {
  display: flex;
  gap: 20px;

  margin-bottom: 22px;
}

/* BUTTON */
.status-btn {
  flex: 1;

  height: 50px;

  border-radius: 10px;
  border: 1px solid #d9d9d9;

  background: white;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.status-btn.active {
  background: #09c742;
  color: white;

  border: none;

  box-shadow: 0 4px 12px rgba(9, 199, 66, 0.25);
}

.reject.activeReject {
  background: #ff2d2d;
  color: white;

  border: none;

  box-shadow: 0 4px 12px rgba(255, 45, 45, 0.25);
}

/* UPDATE */
.update-btn {
  width: 100%;
  height: 52px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  color: #111;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.update-btn:hover {
  transform: translateY(-2px);
}

/* DELETE */
.delete-btn {
  width: 100%;
  height: 52px;

  margin-top: 14px;

  border: none;
  border-radius: 10px;

  background: #ff2d2d;

  color: white;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.delete-btn:hover {
  opacity: 0.9;
}

/* ALERT */
:global(.custom-popup) {
  border-radius: 16px !important;

  padding: 24px 20px !important;
}

:global(.success-alert) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

:global(.success-icon) {
  width: 52px;

  margin-bottom: 14px;
}

:global(.success-alert h2) {
  font-size: 20px;
  font-weight: 700;

  color: #111;

  margin-bottom: 22px;
}

:global(.back-alert-btn) {
  width: 100%;
  height: 42px;

  border-radius: 8px;
  border: 1px solid #d4af37;

  background: white;

  font-size: 14px;

  cursor: pointer;

  transition: 0.2s;
}

:global(.back-alert-btn:hover) {
  background: #d4af37;
  color: white;
}
</style>
