<script setup>
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.push("/admin/katalog");
};

const selectedStatus = ref("tersedia");

/* IMAGE UPLOAD */
const imagePreview = ref("/src/assets/civic.png");
const fileInput = ref(null);

const openExplorer = () => {
  fileInput.value.click();
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  }
};

const form = ref({
  nama: "Honda Civic Type R",
  harga: "950.000.000",
  tahun: "2023",
  km: "3.000 Km",
  transmisi: "Manual",
  bensin: "Bensin",
  warna: "Silver",
  tipe: "Sedan",
  deskripsi: "",
  fitur: "",
});

/* EDIT FEATURE */
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

/* UPDATE */
const updateCatalog = async () => {
  if (selectedStatus.value === "terjual") {
    const result = await Swal.fire({
      title:
        "Katalog anda dalam status 'Terjual' apakah anda yakin ingin perbarui katalog?",
      text: "Jika anda teruskan, anda tidak dapat perbarui katalog anda",
      background: "#fff",
      confirmButtonText: "Ya, Perbarui Katalog",
      showCancelButton: true,
      cancelButtonText: "Lain Kali",
      reverseButtons: true,

      customClass: {
        popup: "custom-popup",
        title: "custom-title",
        confirmButton: "green-btn",
        cancelButton: "red-btn",
      },
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "Katalog berhasil diperbarui",
        icon: "success",
        confirmButtonColor: "#00c853",
      });

      router.push("/admin/katalog");
    }

    return;
  }

  const result = await Swal.fire({
    title: "Anda yakin ingin perbarui katalog?",
    background: "#fff",
    confirmButtonText: "Ya, Perbarui Katalog",
    showCancelButton: true,
    cancelButtonText: "Lain Kali",
    reverseButtons: true,

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "green-btn",
      cancelButton: "red-btn",
    },
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Katalog berhasil diperbarui",
      icon: "success",
      confirmButtonColor: "#00c853",
    });

    router.push("/admin/katalog");
  }
};

/* DELETE */
const deleteCatalog = async () => {
  const result = await Swal.fire({
    title: "Anda yakin ingin menghapus katalog?",
    background: "#fff",
    confirmButtonText: "Ya, Hapus Katalog",
    showCancelButton: true,
    cancelButtonText: "Lain Kali",
    reverseButtons: true,

    customClass: {
      popup: "custom-popup",
      title: "custom-title",
      confirmButton: "red-btn",
      cancelButton: "green-btn",
    },
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Katalog berhasil dihapus",
      icon: "success",
      confirmButtonColor: "#00c853",
    });

    router.push("/admin/katalog");
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
          <label>Nama Kendaraan</label>

          <input type="text" v-model="form.nama" />
        </div>

        <!-- HARGA -->
        <div class="form-group">
          <label>Harga Kendaraan</label>

          <input type="text" v-model="form.harga" />
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
        <div class="form-group">
          <label>Deskripsi</label>

          <textarea
            class="fixed-textarea"
            placeholder="Tambahkan deskripsi mobil"
            v-model="form.deskripsi"
          ></textarea>
        </div>

        <!-- FITUR -->
        <div class="form-group">
          <label>Fitur</label>

          <textarea
            class="fixed-textarea"
            placeholder="Tambahkan fitur mobil"
            v-model="form.fitur"
          ></textarea>
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
