<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();

/* =========================
   ROUTER
========================= */
const goBack = () => {
  router.back();
};

/* =========================
   IMAGE
========================= */
const fileInput = ref(null);

const previewImage = ref("");
const uploadedImage = ref("");

const chooseImage = () => {
  fileInput.value.click();
};

const handleUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  try {
    previewImage.value = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://localhost:8000/api/v1/upload/image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    uploadedImage.value =
      res.data.data.url ||
      res.data.data.image_url ||
      Object.values(res.data.data)[0];

    Swal.fire({
      icon: "success",
      title: "Upload berhasil",
      text: "Gambar berhasil diupload",
      confirmButtonColor: "#00c853",
    });
  } catch (err) {
    console.error(err);
    console.log(err.response?.data);
    console.log(err.response?.status);

    Swal.fire({
      icon: "error",
      title: "Upload gagal",
      text: "Gagal upload gambar",
      confirmButtonColor: "#ff1e1e",
    });
  }
};

/* =========================
   FORM
========================= */
const form = ref({
  brand: "",
  model: "",
  price: "",

  year: "",
  mileage: "",
  transmission: "",
  fuel: "",
  color: "",
  type: "",

  deskripsi: "",
  fitur: "",
});

const selectedStatus = ref("Tersedia");

/* =========================
   ADD KATALOG
========================= */
const goUpload = async () => {
  if (!uploadedImage.value) {
    Swal.fire({
      icon: "warning",
      title: "Upload gambar terlebih dahulu",
      confirmButtonColor: "#d4af37",
    });

    return;
  }

  const result = await Swal.fire({
    title: "Unggah katalog mobil?",
    text: "Pastikan data mobil sudah benar",
    icon: "question",

    showCancelButton: true,

    confirmButtonText: "Ya, Unggah",
    cancelButtonText: "Batal",

    confirmButtonColor: "#00c853",
    cancelButtonColor: "#ff1e1e",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.post(
      "http://localhost:8000/api/v1/admin/cars",
      {
        brand: form.value.brand,
        model: form.value.model,

        price: Number(
          String(form.value.price).replace(/\./g, "")
        ),

        condition: "",

        specifications: {
          year: Number(form.value.year),
          transmission: form.value.transmission,
          color: form.value.color,
          mileage: form.value.mileage,
          fuel: form.value.fuel,
          type: form.value.type,
        },

        features: form.value.fitur
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),

        images: [uploadedImage.value],

        description: form.value.deskripsi,

        status: selectedStatus.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Katalog berhasil ditambahkan",
      confirmButtonColor: "#00c853",
    });

    router.push("/admin/katalog");
  } catch (err) {
    console.error(err);
    console.log(err.response?.data);
    console.log(err.response?.status);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menambahkan katalog",
      confirmButtonColor: "#ff1e1e",
    });
  }
};
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
            v-model="form.brand"
          />
        </div>

        <div class="form-group">
          <label>Model Kendaraan</label>

          <input
            type="text"
            placeholder="Masukkan model kendaraan"
            v-model="form.model"
          />
        </div>

        <!-- HARGA -->
        <div class="form-group">
          <label>Harga Kendaraan</label>

          <input
            type="text"
            placeholder="Masukkan harga kendaraan"
            v-model="form.price"
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

                  <input v-model="form.year" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-mesin.svg" />

                <div class="spec-content">
                  <span>Transmisi</span>

                  <input v-model="form.transmission" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-warna.svg" />

                <div class="spec-content">
                  <span>Warna</span>

                  <input v-model="form.color" />
                </div>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="spec-column">
              <div class="spec-item">
                <img src="/src/assets/admin/icon-km.svg" />

                <div class="spec-content">
                  <span>Kilometer</span>

                  <input v-model="form.mileage" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-bensin.svg" />

                <div class="spec-content">
                  <span>Bahan Bakar</span>

                  <input v-model="form.fuel" />
                </div>
              </div>

              <div class="spec-item">
                <img src="/src/assets/admin/icon-car2.svg" />

                <div class="spec-content">
                  <span>Tipe</span>

                  <input v-model="form.type" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="modern-group">
          <div class="modern-label">
            <h4>Deskripsi Mobil</h4>

            <p>
              Tambahkan penjelasan singkat mengenai kondisi dan keunggulan mobil
            </p>
          </div>

          <textarea
            v-model="form.deskripsi"
            class="modern-textarea"
            placeholder="Contoh:
        Mobil kondisi sangat baik, service rutin, pajak hidup, cocok untuk keluarga..."
          ></textarea>
        </div>

        <!-- FITUR -->
        <div class="modern-group">
          <div class="modern-label">
            <h4>Fitur Mobil</h4>

            <p>
              Pisahkan fitur menggunakan tanda koma (,)
            </p>
          </div>

          <textarea
            v-model="form.fitur"
            class="modern-textarea small"
            placeholder="Contoh:
        Sunroof, Camera 360, Cruise Control, ABS, Airbags"
          ></textarea>

          <!-- PREVIEW -->
          <div
            v-if="form.fitur"
            class="feature-preview"
          >
            <span
              v-for="(item, index) in form.fitur
                .split(',')
                .map(f => f.trim())
                .filter(f => f)"
              :key="index"
              class="feature-chip"
            >
              {{ item }}
            </span>
          </div>
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

/* MODERN GROUP */
.modern-group {
  margin-top: 24px;

  background: white;

  border-radius: 18px;

  padding: 22px;

  border: 1px solid #ececec;
}

/* LABEL */
.modern-label h4 {
  font-size: 18px;
  font-weight: 700;

  color: #111;

  margin-bottom: 6px;
}

.modern-label p {
  font-size: 14px;
  color: #777;

  margin-bottom: 16px;
}

/* TEXTAREA */
.modern-textarea {
  width: 100%;
  min-height: 140px;

  border: 1px solid #e5e5e5;
  border-radius: 14px;

  background: #fafafa;

  padding: 16px;

  font-size: 15px;
  line-height: 1.7;

  resize: none;

  transition: 0.2s;
}

.modern-textarea.small {
  min-height: 100px;
}

.modern-textarea:focus {
  border-color: #d4af37;
  background: white;

  box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.12);
}

/* FEATURE PREVIEW */
.feature-preview {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;

  margin-top: 18px;
}

.feature-chip {
  background: #f4efe0;
  color: #9b7b16;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;
}
</style>
