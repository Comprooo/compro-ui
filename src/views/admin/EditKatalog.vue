<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const selectedStatus = ref("tersedia");

/* =========================
   ROUTING
========================= */
const goBack = () => {
  router.back();
};

/* =========================
   IMAGE UPLOAD
========================= */
const imagePreview = ref("/src/assets/civic.png");
const fileInput = ref(null);

const openExplorer = () => {
  fileInput.value.click();
};

const uploadedImage = ref("");

const handleImageUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  try {
    imagePreview.value = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://backend-autocatalog.vercel.app/api/v1/upload/image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ambil url hasil upload
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
  price: 0,
  condition: "",

  tahun: "",
  km: "",
  transmisi: "",
  bensin: "",
  warna: "",
  tipe: "",

  deskripsi: "",
  fitur: "",
});

/* =========================
   FETCH DETAIL MOBIL
========================= */
const fetchCarDetail = async () => {
  try {
    loading.value = true;

    const res = await axios.get(
      `https://backend-autocatalog.vercel.app/api/v1/cars/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const car = res.data.data;

    form.value = {
      brand: car.brand || "",
      model: car.model || "",
      price: car.price || 0,
      condition: car.condition || "",

      tahun: car.specifications?.year || "",
      km: car.specifications?.mileage || "",
      transmisi: car.specifications?.transmission || "",
      bensin: car.specifications?.fuel || "",
      warna: car.specifications?.color || "",
      tipe: car.specifications?.type || "",

      deskripsi: car.description || "",
      fitur: car.features?.join(", ") || "",
    };

    selectedStatus.value = car.status?.toLowerCase() || "tersedia";

    imagePreview.value = car.thumbnail || "/src/assets/civic.png";
    uploadedImage.value = car.thumbnail || "";
  } catch (err) {
    console.error(err);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal mengambil detail mobil",
      confirmButtonColor: "#ff1e1e",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCarDetail();
});

/* =========================
   EDIT FEATURE
========================= */
const editFeature = async (key, label) => {
  const result = await Swal.fire({
    title: `Edit ${label}`,
    input: "text",
    inputValue: form.value[key],
    confirmButtonText: "Simpan",
    confirmButtonColor: "#00c853",
    showCancelButton: true,
    cancelButtonText: "Batal",
  });

  if (result.isConfirmed) {
    form.value[key] = result.value;
  }
};

/* =========================
   UPDATE
========================= */
const updateCatalog = async () => {
  const result = await Swal.fire({
    title: "Anda yakin ingin perbarui katalog?",
    background: "#fff",
    confirmButtonText: "Ya, Perbarui",
    showCancelButton: true,
    cancelButtonText: "Batal",
    reverseButtons: true,

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "green-btn",
      cancelButton: "red-btn",
    },
  });

  if (!result.isConfirmed) return;

  try {
    await axios.put(
      `https://backend-autocatalog.vercel.app/api/v1/admin/cars/${route.params.id}`,
      {
        brand: form.value.brand,
        model: form.value.model,
        price: Number(
          String(form.value.price).replace(/\./g, "")
        ),

        condition: form.value.condition,

        specifications: {
          year: Number(form.value.tahun),
          transmission: form.value.transmisi,
          color: form.value.warna,
          mileage: form.value.km,
          fuel: form.value.bensin,
          type: form.value.tipe,
        },

        features: form.value.fitur
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),

        images: uploadedImage.value
          ? [uploadedImage.value]
          : [],

        description: form.value.deskripsi,

        status:
          selectedStatus.value === "tersedia"
            ? "Tersedia"
            : "Terjual",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      title: "Berhasil",
      text: "Katalog berhasil diperbarui",
      icon: "success",
      showConfirmButton: false,
      timer: 1800,
    });

      setTimeout(() =>{
      router.push("/admin/katalog");
    },1000);

  } catch (err) {
    console.error(err);

    Swal.fire({
      title: "Gagal",
      text: "Gagal memperbarui katalog",
      icon: "error",
      confirmButtonColor: "#ff1e1e",
    });
  }
};

/* =========================
   DELETE
========================= */
const deleteCatalog = async () => {
  const result = await Swal.fire({
    title: "Anda yakin ingin menghapus katalog?",
    background: "#fff",
    confirmButtonText: "Ya, Hapus",
    showCancelButton: true,
    cancelButtonText: "Batal",
    reverseButtons: true,

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "red-btn",
      cancelButton: "green-btn",
    },
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `https://backend-autocatalog.vercel.app/api/v1/admin/cars/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await Swal.fire({
      title: "Berhasil",
      text: "Katalog berhasil dihapus",
      icon: "success",
      showConfirmButton: false,
      timer:1800,
    });

    setTimeout(() =>{
      router.push("/admin/katalog");
    },1800);  
  
  } catch (err) {
    console.error(err);

    Swal.fire({
      title: "Gagal",
      text: "Gagal menghapus katalog",
      icon: "error",
      confirmButtonColor: "#ff1e1e",
    });
  }
};
</script>

<template>
  <div class="page">
    <!-- BACK -->
    <div class="back-btn" @click="goBack">← Kembali ke Daftar Katalog</div>

    <div class="container">
      <!-- IMAGE -->
      <div class="image-wrapper">
        <img :src="imagePreview" class="car-image" />

        <button class="add-image-btn" @click="openExplorer">+</button>

        <input
          type="file"
          ref="fileInput"
          hidden
          accept="image/*"
          @change="handleImageUpload"
        />
      </div>

      <!-- FORM -->
      <div class="form-card">
        <!-- NAMA -->
        <div class="form-group">
          <label>Brand</label>

          <input type="text" v-model="form.brand" />
        </div>

        <div class="form-group">
          <label>Model</label>

          <input type="text" v-model="form.model" />
        </div>

        <!-- HARGA -->
        <div class="form-group">
          <label>Harga Kendaraan</label>

          <input type="number" v-model="form.price" />
        </div>

        <!-- SPESIFIKASI -->
        <div class="form-group">
          <label>Spesifikasi Kendaraan</label>

          <p class="helper">
            Masukkan spesifikasi kendaraan yang akan anda jual
          </p>

          <div class="spec-card">
            <!-- TAHUN -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-calendar2.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Tahun</p>

                  <span @click="editFeature('tahun', 'Tahun')"> ✏️ </span>
                </div>

                <input v-model="form.tahun" />
              </div>
            </div>

            <!-- KM -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-km.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Kilometer</p>

                  <span @click="editFeature('km', 'Kilometer')"> ✏️ </span>
                </div>

                <input v-model="form.km" />
              </div>
            </div>

            <!-- TRANSMISI -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-mesin.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Transmisi</p>

                  <span @click="editFeature('transmisi', 'Transmisi')">
                    ✏️
                  </span>
                </div>

                <input v-model="form.transmisi" />
              </div>
            </div>

            <!-- BENSIN -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-bensin.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Bahan Bakar</p>

                  <span @click="editFeature('bensin', 'Bahan Bakar')">
                    ✏️
                  </span>
                </div>

                <input v-model="form.bensin" />
              </div>
            </div>

            <!-- WARNA -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-warna.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Warna</p>

                  <span @click="editFeature('warna', 'Warna')"> ✏️ </span>
                </div>

                <input v-model="form.warna" />
              </div>
            </div>

            <!-- TIPE -->
            <div class="spec-item">
              <img src="/src/assets/admin/icon-car2.svg" />

              <div class="feature-box">
                <div class="feature-title">
                  <p>Tipe</p>

                  <span @click="editFeature('tipe', 'Tipe')"> ✏️ </span>
                </div>

                <input v-model="form.tipe" />
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

          <!-- PREVIEW FITUR -->
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

        <!-- STATUS -->
        <div class="status-wrapper">
          <button
            class="status-btn"
            :class="{ active: selectedStatus === 'tersedia' }"
            @click="selectedStatus = 'tersedia'"
          >
            Tersedia
          </button>

          <button
            class="status-btn sold"
            :class="{ active: selectedStatus === 'terjual' }"
            @click="selectedStatus = 'terjual'"
          >
            Terjual
          </button>
        </div>

        <!-- BUTTON -->
        <button class="update-btn" @click="updateCatalog">
          Perbarui Katalog
        </button>

        <button class="delete-btn" @click="deleteCatalog">Hapus Katalog</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f6f6f6;
  font-family: "Segoe UI", sans-serif;
}

.back-btn {
  padding: 22px 40px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
}

.container {
  width: 680px;
  margin: 40px auto;
}

/* IMAGE */
.image-wrapper {
  position: relative;
}

.car-image {
  width: 100%;
  border-radius: 18px;
}

.add-image-btn {
  position: absolute;
  top: 14px;
  right: 14px;

  width: 46px;
  height: 46px;

  border-radius: 50%;
  border: none;

  background: rgba(255, 255, 255, 0.8);

  font-size: 28px;
  color: #555;

  cursor: pointer;
}

/* CARD */
.form-card {
  margin-top: 18px;

  background: white;

  border-radius: 18px;

  padding: 26px;

  border: 1px solid #ececec;
}

/* GROUP */
.form-group {
  margin-bottom: 18px;
}

.form-group label {
  font-size: 16px;
  font-weight: 600;
  color: #111;

  display: block;

  margin-bottom: 10px;
}

.helper {
  color: #777;
  margin-bottom: 14px;
}

input,
textarea {
  width: 100%;

  background: #f7f7f7;

  border: none;
  border-radius: 5px;

  padding: 7px;

  font-size: 15px;

  outline: none;
}

/* FIX TEXTAREA */
.fixed-textarea {
  height: 140px;
  resize: none;
}

/* MODERN INPUT GROUP */
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

/* SPEC */
.spec-card {
  border: 1px solid #dcb64b;
  border-radius: 16px;

  padding: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 18px 28px;
}

.spec-item {
  display: flex;
  gap: 12px;
}

.spec-item img {
  width: 22px;
  margin-top: 2px;
}

.spec-item p {
  font-size: 14px;
  color: #777;
  margin-bottom: 4px;
}

.spec-item input {
  padding: 0;
  background: transparent;
  font-weight: 700;
  font-size: 16px;
}

.feature-box {
  width: 100%;
}

.feature-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 4px;
}

.feature-title span {
  cursor: pointer;
  font-size: 16px;

  transition: 0.2s;
}

.feature-title span:hover {
  transform: scale(1.1);
}

/* STATUS */
.status-wrapper {
  display: flex;
  gap: 18px;

  margin-top: 26px;
}

.status-btn {
  flex: 1;

  padding: 14px;

  border-radius: 10px;

  border: 1px solid #d4af37;

  background: white;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.status-btn.active {
  background: #00c853;
  color: white;
  border: none;
}

/* BUTTON */
.update-btn {
  width: 100%;

  margin-top: 18px;

  background: #d4af37;
  color: black;

  border: none;
  border-radius: 10px;

  padding: 14px;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
}

.delete-btn {
  width: 100%;

  margin-top: 16px;

  background: #ff1e1e;
  color: white;

  border: none;
  border-radius: 10px;

  padding: 14px;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;
}
</style>

<style>
.custom-popup {
  border-radius: 14px !important;
  padding: 18px !important;
}

.custom-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
}

.green-btn {
  background: #00c853 !important;
  color: white !important;

  border-radius: 6px !important;

  width: 100% !important;
}

.red-btn {
  background: #ff1e1e !important;
  color: white !important;

  border-radius: 6px !important;

  width: 100% !important;
}


</style>
