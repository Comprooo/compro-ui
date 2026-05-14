<template>
  <div class="dashboard-page">
    <!-- SIDEBAR -->
    <AdminSidebar />

    <!-- MAIN -->
    <main class="main-content">
      <!-- TOPBAR -->
      <AdminTopbar title="Manajemen Katalog" />

      <!-- CONTENT -->
      <div class="content">
        <!-- HEADER -->
        <div class="section-header">
          <h2>Daftar Katalog</h2>

          <div class="header-actions">
            <!-- SEARCH -->
            <div class="search-box">
              <img src="/src/assets/admin/icon-search.svg" />
              <input type="text" placeholder="Search" />
            </div>

            <!-- BUTTON -->
            <button class="add-btn" @click="goTambah">+ Tambah Katalog</button>
          </div>
        </div>

        <!-- GRID -->
        <div class="cars-grid">
          <!-- CARD 1 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/camry.png" class="car-image" />

              <div class="date-badge">7/2/2026</div>

              <div class="status-badge available">Tersedia</div>
            </div>

            <div class="card-content">
              <h3>Toyota Camry</h3>

              <h2>Rp 550.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2022</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>15.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Automatic</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="edit-btn" @click="goEdit">Edit</button>
            </div>
          </div>

          <!-- CARD 2 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/hrv.png" class="car-image" />

              <div class="date-badge">4/1/2026</div>

              <div class="status-badge sold">Terjual</div>
            </div>

            <div class="card-content">
              <h3>Honda CR-V</h3>

              <h2>Rp 650.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2023</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>8.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Automatic</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="detail-btn" @click="goDetail">Lihat Detail</button>
            </div>
          </div>

          <!-- CARD 3 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/mazdacx5.png" class="car-image" />

              <div class="date-badge">31/12/2025</div>

              <div class="status-badge sold">Terjual</div>
            </div>

            <div class="card-content">
              <h3>Mazda CX-5</h3>

              <h2>Rp 480.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2021</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>25.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Automatic</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="detail-btn" @click="goDetail">Lihat Detail</button>
            </div>
          </div>

          <!-- CARD 4 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/avanza.png" class="car-image" />

              <div class="date-badge">27/11/2025</div>

              <div class="status-badge sold">Terjual</div>
            </div>

            <div class="card-content">
              <h3>Toyota Avanza</h3>

              <h2>Rp 250.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2022</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>20.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Automatic</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="detail-btn" @click="goDetail">Lihat Detail</button>
            </div>
          </div>

          <!-- CARD 5 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/civic.png" class="car-image" />

              <div class="date-badge">11/11/2025</div>

              <div class="status-badge available">Tersedia</div>
            </div>

            <div class="card-content">
              <h3>Honda Civic Type R</h3>

              <h2>Rp 950.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2023</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>3.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Manual</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="edit-btn" @click="goEdit">Edit</button>
            </div>
          </div>

          <!-- CARD 6 -->
          <div class="car-card">
            <div class="image-wrapper">
              <img src="/src/assets/nissanxtrail.png" class="car-image" />

              <div class="date-badge">16/10/2025</div>

              <div class="status-badge available">Tersedia</div>
            </div>

            <div class="card-content">
              <h3>Nissan X-Trail</h3>

              <h2>Rp 580.000.000</h2>

              <div class="specs">
                <div class="spec">
                  <img src="/src/assets/admin/icon-calendar2.svg" />
                  <span>2023</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-km.svg" />
                  <span>12.000 km</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-mesin.svg" />
                  <span>Automatic</span>
                </div>

                <div class="spec">
                  <img src="/src/assets/admin/icon-bensin.svg" />
                  <span>Bensin</span>
                </div>
              </div>

              <button class="edit-btn" @click="goEdit">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminTopbar from "@/components/AdminTopbar.vue";

const router = useRouter();

/* ROUTING */
const goTambah = () => router.push("/admin/addkatalog");
const goEdit = () => router.push("/admin/editkatalog");
const goDetail = () => router.push("/admin/katalog");
</script>

<style scoped>
/* PAGE */
.dashboard-page {
  display: flex;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Segoe UI", sans-serif;
}

/* MAIN */
.main-content {
  flex: 1;
}

/* CONTENT */
.content {
  padding: 32px;
}

/* HEADER */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 28px;
}

.section-header h2 {
  font-size: 22px;
  color: #111;
}

/* ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* SEARCH */
.search-box {
  width: 220px;
  height: 44px;

  background: white;

  border: 1px solid #ddd;
  border-radius: 12px;

  display: flex;
  align-items: center;

  padding: 0 14px;
}

.search-box img {
  width: 18px;
  opacity: 0.5;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 14px;
  background: transparent;
}

/* ADD BUTTON */
.add-btn {
  height: 44px;
  padding: 0 22px;

  border: none;
  border-radius: 12px;

  background: #d4af37;
  color: white;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
}

/* GRID */
.cars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 24px;
}

/* CARD */
.car-card {
  background: white;
  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  transition: 0.25s;
}

.car-card:hover {
  transform: translateY(-4px);
}

/* IMAGE */
.image-wrapper {
  position: relative;
}

.car-image {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

.date-badge {
  position: absolute;
  top: 12px;
  left: 12px;

  background: white;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 700;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;

  padding: 6px 10px;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 700;

  color: white;
}

.available {
  background: #22c55e;
}

.sold {
  background: #111;
}

/* CONTENT */
.card-content {
  padding: 18px;
}

.card-content h3 {
  font-size: 20px;
  color: #111;
}

.card-content h2 {
  margin-top: 8px;

  color: #d4af37;
  font-size: 20px;
}

/* SPECS */
.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 14px;

  margin-top: 18px;
}

.spec {
  display: flex;
  align-items: center;
  gap: 6px;

  color: #777;
  font-size: 14px;
}

.spec img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* BUTTON */
.edit-btn,
.detail-btn {
  width: 100%;
  height: 42px;

  margin-top: 20px;

  border-radius: 10px;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.edit-btn {
  background: #d4af37;
  color: white;
  border: none;
}

.detail-btn {
  background: white;
  border: 1px solid #ead79c;
}

.edit-btn:hover,
.detail-btn:hover {
  transform: translateY(-2px);
}
</style>
