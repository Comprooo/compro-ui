<template>
  <div class="page">
    <NavbarUser v-if="isLogin" />
    <NavbarLanding v-else />

    <!-- HERO -->
    <section class="hero">
      <span class="badge">TENTANG AUTOKATALOG</span>

      <h1>
        Platform <span>Premium</span><br />
        Jual Beli Mobil
      </h1>

      <p>
        Kami menghubungkan pembeli dan penjual mobil bekas berkualitas dengan
        sistem yang aman, transparan, dan terpercaya.
      </p>
    </section>

    <!-- STORY -->
    <section class="story">
      <h2>Kisah <span>Kami</span></h2>

      <p>
        AutoKatalog adalah platform inovatif yang hadir dengan visi untuk
        mengubah cara masyarakat dalam membeli dan menjual mobil bekas. Kami
        memahami bahwa proses transaksi kendaraan seringkali dipenuhi dengan
        ketidakpastian, mulai dari kualitas mobil hingga kepercayaan antara
        pembeli dan penjual.
      </p>

      <p>
        Oleh karena itu, kami berkomitmen untuk menghadirkan pengalaman yang
        lebih transparan, aman, dan terpercaya.
      </p>

      <p>
        Kami percaya bahwa setiap orang berhak mendapatkan akses ke informasi
        yang jelas dan akurat sebelum mengambil keputusan. Dengan menghadirkan
        kurasi mobil berkualitas serta proses inspeksi yang terstandarisasi.
      </p>

      <p>
        Lebih dari sekadar platform jual beli, AutoKatalog hadir sebagai partner
        terpercaya dalam perjalanan Anda menemukan kendaraan yang tepat.
      </p>
    </section>

    <!-- VALUES -->
    <section class="values">
      <h2>Nilai-Nilai <span>Kami</span></h2>
      <p class="subtitle">
        Prinsip yang memandu setiap keputusan dan tindakan kami
      </p>

      <div class="value-grid">
        <div class="value-card">
          <div class="icon">🎯</div>
          <h4>Fokus Pelanggan</h4>
          <p>Kepuasan pelanggan adalah prioritas utama kami</p>
        </div>

        <div class="value-card">
          <div class="icon">❤️</div>
          <h4>Integritas</h4>
          <p>Transparansi dan kejujuran dalam setiap transaksi</p>
        </div>

        <div class="value-card">
          <div class="icon">📈</div>
          <h4>Inovasi</h4>
          <p>Terus berkembang dengan teknologi terkini</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Siap Bergabung dengan Kami?</h2>
      <p>
        Mulai perjalanan Anda menemukan mobil impian atau jual mobil Anda dengan
        mudah
      </p>

      <div class="cta-buttons">
        <button class="primary" @click="goKatalog">Lihat Katalog</button>
        <button class="secondary" @click="goAI">Chat dengan AI</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import NavbarLanding from "@/components/NavbarLanding.vue";
import NavbarUser from "@/components/Navbar.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const isLogin = ref(false);

onMounted(() => {
  isLogin.value = !!localStorage.getItem("token");
});

const router = useRouter();

const goKatalog = () => router.push("/katalog");
const goAI = () => router.push("/ai");
</script>

<style scoped>
/* SEMUA STYLE TIDAK DIUBAH SAMA SEKALI */

/* GENERAL */
.page {
  font-family: "Segoe UI", sans-serif;
  background: #f3f3f3;
}

/* HERO */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(#d6c27a, #f3f3f3);
}

.badge {
  background: #e7d7a0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.hero h1 {
  font-size: 42px;
  margin: 20px 0;
}

.hero span {
  color: #caa63a;
}

.hero p {
  max-width: 600px;
  margin: auto;
}

/* STORY */
.story {
  text-align: center;
  padding: 60px 20px;
}

.story h2 {
  margin-bottom: 20px;
}

.story span {
  color: #caa63a;
}

.story p {
  max-width: 700px;
  margin: 10px auto;
  color: #555;
}

/* VALUES */
.values {
  text-align: center;
  padding: 60px 20px;
}

.values span {
  color: #caa63a;
}

.subtitle {
  color: #777;
  margin-bottom: 30px;
}

.value-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.value-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 250px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 30px;
  margin-bottom: 10px;
}

/* CTA */
.cta {
  text-align: center;
  padding: 80px 20px;
}

.cta-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.primary {
  background: #caa63a;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.secondary {
  border: 1px solid #ccc;
  padding: 12px 20px;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}
</style>
