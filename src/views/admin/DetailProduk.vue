<template>
  <div class="page">
    <!-- BACK -->
    <div class="back-btn" @click="goBack">← Kembali ke Daftar Katalog</div>

    <!-- CONTENT -->
    <div class="content">
      <!-- LEFT -->
      <div class="left">
        <div class="image-wrapper">
          <img src="/src/assets/avanza.png" class="car-image" />

          <div class="status-badge">Terjual</div>
        </div>

        <h1>Toyota Avanza</h1>
        <h2>Rp 250.000.000</h2>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <!-- SPEC -->
        <div class="spec-card">
          <!-- TAHUN -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-calendar2.svg" />

            <div class="spec-info">
              <p>Tahun</p>
              <h4>2022</h4>
            </div>
          </div>

          <!-- KM -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-km.svg" />

            <div class="spec-info">
              <p>Kilometer</p>
              <h4>20.000 km</h4>
            </div>
          </div>

          <!-- TRANSMISI -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-mesin.svg" />

            <div class="spec-info">
              <p>Transmisi</p>
              <h4>Automatic</h4>
            </div>
          </div>

          <!-- BBM -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-bensin.svg" />

            <div class="spec-info">
              <p>Bahan Bakar</p>
              <h4>Bensin</h4>
            </div>
          </div>

          <!-- WARNA -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-warna.svg" />

            <div class="spec-info">
              <p>Warna</p>
              <h4>Grey</h4>
            </div>
          </div>

          <!-- TIPE -->
          <div class="spec-item">
            <img src="/src/assets/admin/icon-car2.svg" />

            <div class="spec-info">
              <p>Tipe</p>
              <h4>MPV</h4>
            </div>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="section">
          <h3>Deskripsi</h3>

          <p class="desc">
            Toyota Avanza 2022 cocok untuk keluarga, irit BBM, service record
            lengkap
          </p>
        </div>

        <!-- FITUR -->
        <div class="section">
          <h3>Fitur</h3>

          <div class="feature-grid">
            <div class="feature">
              <img src="/src/assets/icon-check2.svg" />
              <span>7 Seats</span>
            </div>

            <div class="feature">
              <img src="/src/assets/icon-check2.svg" />
              <span>Dual Airbags</span>
            </div>

            <div class="feature">
              <img src="/src/assets/icon-check2.svg" />
              <span>ABS</span>
            </div>

            <div class="feature">
              <img src="/src/assets/icon-check2.svg" />
              <span>Touchscreen Audio</span>
            </div>

            <div class="feature">
              <img src="/src/assets/icon-check2.svg" />
              <span>Rear Camera</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer-info">Mobil terjual pada tanggal 27 November 2025</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/admin/katalog");
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f6f6f6;
  font-family: "Segoe UI", sans-serif;
  padding-bottom: 50px;
}

/* BACK */
.back-btn {
  padding: 22px 42px;
  border-bottom: 1px solid #e7e7e7;

  font-size: 18px;
  color: #111;

  cursor: pointer;
}

/* CONTENT */
.content {
  display: flex;
  gap: 34px;

  padding: 40px 58px;
}

/* LEFT */
.left {
  width: 56%;
}

.image-wrapper {
  position: relative;
}

.car-image {
  width: 100%;
  height: 540px;

  object-fit: cover;

  border-radius: 18px;
}

.status-badge {
  position: absolute;
  top: 18px;
  right: 18px;

  background: white;
  color: #111;

  padding: 12px 22px;

  border-radius: 10px;

  font-size: 18px;
  font-weight: 600;
}

.left h1 {
  margin-top: 26px;

  font-size: 58px;
  font-weight: 700;

  color: #111;
}

.left h2 {
  margin-top: 10px;

  font-size: 40px;
  font-weight: 700;

  color: #d4af37;
}

/* RIGHT */
.right {
  flex: 1;
}

/* SPEC CARD */
.spec-card {
  border: 1px solid #e3c86d;
  border-radius: 18px;

  padding: 34px 38px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 42px 70px;

  background: white;
}

/* ITEM */
.spec-item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

/* ICON */
.spec-item img {
  width: 30px;
  height: 30px;

  object-fit: contain;

  margin-top: 2px;

  flex-shrink: 0;
}

/* TEXT */
.spec-info {
  display: flex;
  flex-direction: column;
}

.spec-info p {
  font-size: 16px;
  color: #7c7c7c;

  margin: 0 0 8px 0;

  line-height: 1;
}

.spec-info h4 {
  font-size: 20px;
  font-weight: 700;

  color: #111;

  margin: 0;

  line-height: 1.2;
}

/* SECTION */
.section {
  margin-top: 52px;
}

.section h3 {
  font-size: 30px;
  font-weight: 700;

  color: #111;

  margin-bottom: 18px;
}

.desc {
  color: #767676;
  font-size: 18px;

  line-height: 1.8;
}

/* FEATURE */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 22px 80px;

  margin-top: 20px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feature img {
  width: 22px;
}

.feature span {
  font-size: 18px;
  color: #111;
}

/* FOOTER */
.footer-info {
  width: 50%;

  margin: 80px auto 0;

  background: #ececec;

  border-radius: 10px;

  text-align: center;

  padding: 15px;

  font-size: 18px;
  color: #111;
}
</style>
