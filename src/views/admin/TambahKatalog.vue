<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

/* ROUTER */
const goBack = () => {
  router.push("/admin/katalog");
};

const goUpload = async () => {
  if (!previewImage.value) {
    Swal.fire({
      icon: "warning",
      title: "Upload gambar terlebih dahulu",
      confirmButtonColor: "#d4af37",
    });

    return;
  }

  await Swal.fire({
    icon: "success",
    title: "Katalog berhasil diunggah",
    confirmButtonColor: "#00c853",
  });

  router.push("/admin/successkatalog");
};

/* IMAGE */
const fileInput = ref(null);

const previewImage = ref("");

const chooseImage = () => {
  fileInput.value.click();
};

const handleUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

/* FORM */
const form = ref({
  nama: "",
  harga: "",
  tahun: "",
  kilometer: "",
  transmisi: "",
  bahanBakar: "",
  warna: "",
  tipe: "",
  deskripsi: "",
  fitur: "",
});
</script>

<template>
  <div class="page">
    <!-- BACK -->
    <div class="back-wrapper">
      <button class="back-btn" @click="goBack">
        ← Kembali ke Daftar Katalog
      </button>
    </div>

    <div class="container">
      <!-- IMAGE -->
      <div class="image-wrapper">
        <img v-if="previewImage" :src="previewImage" class="car-image" />

        <div v-else class="image-placeholder">
          <div class="placeholder-text">🖼️</div>
        </div>

        <!-- BUTTON PLUS -->
        <button class="add-btn" @click="chooseImage">+</button>

        <!-- INPUT -->
        <input
          type="file"
          ref="fileInput"
          hidden
          accept="image/*"
          @change="handleUpload"
        />
      </div>

      <!-- CARD -->
      <div class="card">
        <!-- NAMA -->
        <div class="form-group">
          <label>Nama Kendaraan</label>

          <input
            type="text"
            placeholder="Masukkan nama kendaraan"
            v-model="form.nama"
          />
        </div>

        <!-- HARGA -->
        <div class="form-group">
          <label>Harga Kendaraan</label>

          <input
            type="text"
            placeholder="Masukkan harga kendaraan"
            v-model="form.harga"
          />
        </div>

        <!-- SPESIFIKASI -->
        <div class="form-group">
          <label>Spesifikasi Kendaraan</label>

          <p class="helper">
            Masukkan spesifikasi kendaraan yang akan anda jual
          </p>

          <div class="spec-box">
            <!-- LEFT -->
            <div class="spec-column">
              <div class="spec-item">
                <img src="/src/assets/admin/icon-calendar2.svg" />

                <div class="spec-content">
                  <span>Tahun</span>

                  <input v-model="form.tahun" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-mesin.svg" />

                <div class="spec-content">
                  <span>Transmisi</span>

                  <input v-model="form.transmisi" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-warna.svg" />

                <div class="spec-content">
                  <span>Warna</span>

                  <input v-model="form.warna" />
                </div>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="spec-column">
              <div class="spec-item">
                <img src="/src/assets/admin/icon-km.svg" />

                <div class="spec-content">
                  <span>Kilometer</span>

                  <input v-model="form.kilometer" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-bensin.svg" />

                <div class="spec-content">
                  <span>Bahan Bakar</span>

                  <input v-model="form.bahanBakar" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-car2.svg" />

                <div class="spec-content">
                  <span>Tipe</span>

                  <input v-model="form.tipe" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="form-group">
          <label>Deskripsi</label>

          <textarea
            placeholder="Tambahkan deskripsi mobil"
            v-model="form.deskripsi"
          ></textarea>
        </div>

        <!-- FITUR -->
        <div class="form-group">
          <label>Fitur</label>

          <textarea
            placeholder="Tambahkan fitur mobil"
            v-model="form.fitur"
          ></textarea>
        </div>

        <!-- BUTTON -->
        <button class="upload-btn" @click="goUpload">Unggah Katalog</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7f7f7;
  font-family: "Segoe UI", sans-serif;
}

/* BACK */
.back-wrapper {
  padding: 18px 40px;
  border-bottom: 1px solid #e9e4d7;
  background: white;
}

.back-btn {
  background: transparent;
  border: none;
  cursor: pointer;

  font-size: 17px;
  color: #111;
}

/* CONTAINER */
.container {
  width: 720px;
  margin: 40px auto;
}

/* IMAGE */
.image-wrapper {
  position: relative;
}

.car-image,
.image-placeholder {
  width: 100%;
  height: 390px;

  border-radius: 18px;
}

.car-image {
  object-fit: cover;
}

.image-placeholder {
  background: #d9dde5;

  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-icon {
  width: 170px;
  opacity: 0.45;
}
.placeholder-text {
  font-size: 120px;
  opacity: 0.35;
}

/* BUTTON PLUS */
.add-btn {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border: none;

  background: rgba(255, 255, 255, 0.4);

  color: white;
  font-size: 32px;

  cursor: pointer;
}

/* CARD */
.card {
  margin-top: 28px;

  background: white;

  border-radius: 18px;

  padding: 22px;

  border: 1px solid #e8dcc0;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}

/* FORM */
.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;

  font-size: 16px;
  font-weight: 700;

  margin-bottom: 10px;
}

.helper {
  color: #777;
  margin-bottom: 12px;
}

.form-group input,
.form-group textarea {
  width: 100%;

  border: none;
  outline: none;

  background: #f5f5f5;

  padding: 7px;

  border-radius: 10px;

  font-size: 15px;
}

textarea {
  height: 110px;
  resize: none;
}

/* SPEC */
.spec-box {
  border: 1px solid #d4af37;
  border-radius: 16px;

  padding: 18px;

  display: flex;
  justify-content: space-between;

  gap: 30px;
}

.spec-column {
  flex: 1;
}

.spec-item {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  margin-bottom: 18px;
}

.spec-item img {
  width: 22px;
  margin-top: 3px;
}

.spec-content {
  flex: 1;
}

.spec-content span {
  display: block;

  color: #666;
  font-size: 14px;

  margin-bottom: 4px;
}

.spec-content input {
  border: none;
  outline: none;

  background: transparent;

  border-bottom: 2px solid #333;

  border-radius: 0;

  padding: 2px 0;

  font-weight: 700;

  width: 100%;
}

/* BUTTON */
.upload-btn {
  width: 100%;

  height: 52px;

  border: none;
  border-radius: 10px;

  background: #d4af37;

  font-size: 18px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.upload-btn:hover {
  opacity: 0.92;
}
</style>
