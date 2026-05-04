<template>
  <div class="page">
    <!-- NAVBAR (REPLACED) -->
    <Navbar />

    <!-- HEADER -->
    <div class="header">
      <div class="icon">💬</div>
      <div>
        <h2>AI Assistant</h2>
        <p>Tanyakan apa saja tentang katalog mobil kami</p>
      </div>
    </div>

    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- CHAT BOX -->
      <div class="chat-box">
        <!-- TITLE -->
        <div class="chat-title">
          <div class="circle">🤖</div>
          <div>
            <strong>AI Assistant</strong>
            <p>Pencarian Mobil Cerdas</p>
          </div>
        </div>

        <!-- QUICK -->
        <div class="quick">
          <p>Pertanyaan cepat:</p>
          <div class="quick-list">
            <button>Tampilkan semua mobil</button>
            <button>Mobil apa aja yang available?</button>
            <button>Cari SUV yang tersedia</button>
            <button>Toyota dengan harga terjangkau</button>
          </div>
        </div>

        <!-- CHAT -->
        <div class="chat-area">
          <!-- BOT -->
          <div class="chat left">
            <div class="bubble">
              👋 Halo! Saya AI Assistant AutoKatalog.<br /><br />
              Saya siap membantu Anda menemukan mobil impian!<br /><br />
              Silakan tanya apa saja! 😊
              <span>18.50</span>
            </div>
          </div>

          <!-- USER -->
          <div class="chat right">
            <div class="bubble user">
              Toyota dengan harga terjangkau
              <span>18.50</span>
            </div>
          </div>

          <!-- RESULT -->
          <div class="result">
            <div class="card">
              <div class="image">
                <img src="/src/assets/avanza.png" />
                <span class="badge">Tersedia</span>
              </div>

              <div class="content">
                <h4>Toyota Avanza</h4>
                <p class="price">Rp 250.000.000</p>

                <div class="info">
                  <span>2022</span>
                  <span>20.000 km</span>
                  <span>Automatic</span>
                  <span>Bensin</span>
                </div>

                <button>Lihat Detail</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- INPUT -->
    <div class="input-area">
      <div class="input-box">
        <input placeholder="Tanyakan apa saja" />
        <div class="icons">📷 🎤</div>
        <button>➤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
/* PAGE */
.page {
  background: #f6f6f6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", sans-serif;
}

/* HEADER */
.header {
  display: flex;
  gap: 12px;
  padding: 25px 60px;
  align-items: center;
}

.icon {
  background: #caa63a;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

/* WRAPPER */
.wrapper {
  max-width: 1100px;
  width: 100%;
  margin: auto;
}

/* CHAT BOX */
.chat-box {
  border: 1px solid #e5c96b;
  border-radius: 16px;
  background: white;
  padding: 25px;
}

/* TITLE */
.chat-title {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.circle {
  background: #caa63a;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* QUICK */
.quick p {
  margin-bottom: 10px;
}

.quick-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.quick-list button {
  border: 1px solid #e5c96b;
  padding: 10px 16px;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: 0.2s;
}

.quick-list button:hover {
  background: #caa63a;
  color: white;
}

/* CHAT AREA */
.chat-area {
  margin-top: 25px;
}

.chat {
  display: flex;
  margin-bottom: 20px;
}

.left {
  justify-content: flex-start;
}

.right {
  justify-content: flex-end;
}

.bubble {
  background: #eee;
  padding: 16px;
  border-radius: 12px;
  max-width: 320px;
  line-height: 1.4;
}

.user {
  background: #caa63a;
  color: white;
}

.bubble span {
  display: block;
  font-size: 11px;
  margin-top: 6px;
  opacity: 0.7;
}

/* RESULT FIX */
.result {
  display: flex;
  justify-content: center;
  margin-top: 35px;
}

/* CARD FIX (ANTI GEPENG) */
.card {
  width: 300px;
  border-radius: 14px;
  overflow: hidden;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* IMAGE */
.image {
  position: relative;
  height: 180px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #22c55e;
  color: white;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 12px;
}

/* CONTENT */
.content {
  padding: 16px;
}

.price {
  color: #caa63a;
  font-weight: bold;
  margin: 6px 0;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 12px;
}

button {
  width: 100%;
  background: #caa63a;
  border: none;
  padding: 11px;
  border-radius: 10px;
  cursor: pointer;
}

/* INPUT */
.input-area {
  padding: 25px;
  display: flex;
  justify-content: center;
}

.input-box {
  width: 900px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 40px;
  padding: 12px 16px;
  border: 1px solid #ddd;
}

.input-box input {
  flex: 1;
  border: none;
  outline: none;
}

.icons {
  margin: 0 10px;
}

.input-box button {
  border-radius: 50%;
  width: 42px;
  height: 42px;
}
</style>
