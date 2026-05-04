<template>
  <div class="page">

    <!-- BACK -->
    <div class="back">
      ← Kembali ke Detail Mobil
    </div>

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
        <p><strong>Tanggal:</strong> Jumat, 10 April 2026</p>
        <p><strong>Waktu:</strong> 10:00 WIB</p>
        <p><strong>Nama:</strong> nanana</p>
        <p><strong>No. HP:</strong> 0812345678</p>
      </div>

      <!-- BUTTON -->
      <button class="back-btn" @click="goKatalog">
        Kembali ke Katalog
      </button>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goKatalog = () => {
  router.push('/katalog')
}
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
  margin-top: 10px;
  padding-left: 18px;
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