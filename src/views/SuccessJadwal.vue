<template>
  <div class="page">

    <!-- CARD MOBIL -->
    <div class="car-card">
      <img :src="data.car?.images?.[0]" />

      <div class="car-info">
        <h2>{{data.car?.specifications?.year}} {{ data.car?.brand }} {{ data.car?.model }} {{ data.car?.specifications?.transmission }}</h2>
        <h3>Rp {{ formatPrice(data.car?.price) }}</h3>

        <ul>
          <li>Tahun: {{ data.car?.specifications?.year }}</li>
          <li>Kilometer: {{ data.car?.specifications?.mileage }}</li>
          <li>Transmisi: {{ data.car?.specifications?.transmission }}</li>
          <li>Bahan Bakar: {{ data.car?.specifications?.fuel }}</li>
        </ul>
      </div>
    </div>

    <!-- SUCCESS -->
    <div class="success">

      <div class="icon-wrapper">
        <img src="/src/assets/icon-check2.svg" class="check-icon" />
      </div>

      <h2>Jadwal Berhasil Dibuat!</h2>

      <p>
        Terima kasih telah membuat jadwal pertemuan untuk Toyota Avanza.
        Penjual akan menghubungi Anda segera untuk konfirmasi.
      </p>

      <!-- DETAIL -->
      <div class="detail-box">
        <p><strong>Tanggal:</strong> {{ data?.slot?.date }}</p>
        <p><strong>Waktu:</strong> {{ data?.slot?.time }}</p>
        <p><strong>Email:</strong> {{ data?.email }}</p>
        <p><strong>No. HP:</strong> {{ data?.phone }}</p>
      </div>

      <!-- BUTTON -->
      <button class="back-btn" @click="goKatalog">
        Kembali ke Katalog
      </button>

    </div>

  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const data = ref({});
const loading = ref(false);

const fetchSchedule = async () => {
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

    data.value = res.data.data;

    console.log(data.value);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSchedule();
});

const goKatalog = () => {
  router.push('/katalog')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};
</script>

<style scoped>

/* PAGE */
.page {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 30px;
  font-family: sans-serif;
  text-align: center;
}

/* BACK */
.back {
  text-align: left;
  margin-bottom: 20px;
}

/* CARD MOBIL */
.car-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 700px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.car-card img {
  width: 100%;
}

.car-info {
  padding: 20px;
  text-align: left;
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

/* SUCCESS */
.success {
  margin-top: 40px;
}

/* ICON */
.icon-wrapper {
  width: 70px;
  height: 70px;
  margin: auto;
  border-radius: 50%;
  border: 3px solid #22c55e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-icon {
  width: 30px;
}

/* TEXT */
.success h2 {
  margin-top: 15px;
}

.success p {
  margin-top: 10px;
  color: gray;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* DETAIL BOX */
.detail-box {
  background: white;
  padding: 15px;
  border-radius: 12px;
  max-width: 500px;
  margin: 20px auto;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* BUTTON */
.back-btn {
  background: white;
  border: 1px solid #e2c46f;
  padding: 12px 30px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: #caa63a;
  color: white;
}

</style>