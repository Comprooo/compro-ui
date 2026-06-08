<template>
  <div class="page">
    <!-- NAVBAR (REPLACED) -->
    <Navbar v-if="isLogin" />
    <NavbarLanding v-else />

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
            <button
              v-for="(item, index) in quickQuestions"
              :key="index"
              @click="sendMessage(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- CHAT AREA -->
        <div class="chat-area">

          <template v-for="(chat, index) in chats" :key="index">

            <!-- BOT -->
            <div
              class="chat"
              :class="chat.type === 'bot' ? 'left' : 'right'"
            >
              <div
                class="bubble"
                :class="{ user: chat.type === 'user' }"
              >
                {{ chat.text }}

                <span>{{ chat.time }}</span>
              </div>
            </div>

            <!-- DATA MOBIL DARI BE -->
            <div
              v-if="chat.type === 'bot' && chat.cars && chat.cars.length"
              class="result-list"
            >
              <div
                v-for="car in chat.cars"
                :key="car.car_id"
                class="car-card"
              >
                <div class="car-image">
                  <img :src="car.thumbnail" :alt="`${car.brand} ${car.model}`" />

                  <span
                    class="status-badge"
                    :class="{ sold: car.status === 'Terjual' }"
                  >
                    {{ car.status }}
                  </span>
                </div>

                <div class="car-content">
                  <h3>{{ car.brand }} {{ car.model }}</h3>

                  <p class="price">
                    Rp {{ formatRupiah(car.price) }}
                  </p>

                  <div class="car-info">
                    <span>{{ car.specifications?.year }}</span>
                    <span>{{ car.specifications?.transmission }}</span>
                    <span>{{ car.specifications?.mileage }}</span>
                    <span>{{ car.specifications?.fuel }}</span>
                    <span>{{ car.specifications?.type }}</span>
                  </div>

                  <p class="desc">
                    {{ car.description }}
                  </p>

                  <button
                    class="detail-btn"
                    @click="goDetailCar(car.car_id)"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>

            <!-- DATA SLOT DARI BE -->
            <div
              v-if="chat.type === 'bot' && chat.slots && chat.slots.length"
              class="slot-list"
            >
              <div
                v-for="(slot, slotIndex) in chat.slots"
                :key="slotIndex"
                class="slot-card"
              >
                {{ slot }}
              </div>
            </div>

          </template>

          <!-- LOADING -->
          <div v-if="loading" class="chat left">
            <div class="bubble">
              AI sedang mengetik...
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- INPUT -->
    <div class="input-area">
      <div class="input-box">

        <input
          v-model="message"
          type="text"
          placeholder="Tanyakan apa saja"
          @keydown.enter.prevent="sendMessage()"
        />

        <button @click="sendMessage">
          ➤
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Navbar from "@/components/Navbar.vue";
import NavbarLanding from "@/components/NavbarLanding.vue"

const router = useRouter();
const isLogin = ref(false);
const message = ref("");
const loading = ref(false);
const sessionId = ref(null);


const chats = ref([
  {
    type: "bot",
    text: `👋 Halo! Saya AI Assistant AutoKatalog.

Saya siap membantu Anda menemukan mobil impian!

Silakan tanya apa saja! 😊`,
    time: getCurrentTime(),
  },
]);

function getCurrentTime() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const goDetailCar = (carId) => {
  router.push(`/detail/${carId}`);
};

const quickQuestions = [
  "Tampilkan semua mobil",
  "Mobil apa aja yang available?",
  "Cari SUV yang tersedia",
  "Toyota dengan harga terjangkau",
];

onMounted(() => {
  isLogin.value = !!localStorage.getItem("token");
});

const sendMessage = async (customMessage = null) => {
  const text = customMessage || message.value;

  if (!text || !text.trim()) return;

  // push user chat
  chats.value.push({
    type: "user",
    text,
    time: getCurrentTime(),
  });

  // kosongkan input
  message.value = "";

  try {
    loading.value = true;

    // body request
    const payload = {
      message: text,
    };

    // hanya kirim session_id kalau ada
    if (sessionId.value) {
      payload.session_id = sessionId.value;
    }

    const response = await axios.post(
      "https://backend-autocatalog.vercel.app/api/v1/chat",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("AI RESPONSE:", response.data);

  // balasan AI
  const aiData = response.data.data;

  sessionId.value = aiData.session_id;

  chats.value.push({
    type: "bot",
    text: aiData.reply || "Tidak ada respon AI",
    cars: aiData.car_recommendations || [],
    slots: aiData.available_slots || [],
    time: getCurrentTime(),
  });

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR RESPONSE:", error.response);

    chats.value.push({
      type: "bot",
      text:
        error.response?.data?.message ||
        "Maaf terjadi kesalahan saat mengambil data AI",
      time: getCurrentTime(),
    });

  } finally {
    loading.value = false;
  }
};
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
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;
}

.chat-area::-webkit-scrollbar {
  width: 6px;
}

.chat-area::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.bubble {
  white-space: pre-line;
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

/* RESULT LIST */
.result-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin: 10px 0 25px 0;
  padding-left: 0;
  align-items: stretch;
}

/* CAR CARD */
.car-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eee;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  height: 100%;
}

.car-image {
  position: relative;
  height: 180px;
  background: #f1f1f1;
  flex-shrink: 0;
}

.car-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #22c55e;
  color: white;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.sold {
  background: #ef4444;
}

.car-content {
  padding: 16px;

  display: flex;
  flex-direction: column;
  flex: 1;
}

.car-content h3 {
  margin: 0 0 8px;
  color: #1f2937;
  font-size: 17px;
  font-weight: 700;

  min-height: 44px;
}

.price {
  color: #caa63a;
  font-size: 16px;
  font-weight: 800;
  margin: 0 0 12px;
}

.car-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;

  min-height: 58px;
}

.car-info span {
  background: #f3f4f6;
  color: #4b5563;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.desc {
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 14px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  min-height: 58px;
}

.detail-btn {
  width: 100%;
  background: #caa63a;
  color: white;
  border: none;
  padding: 11px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;

  margin-top: auto;
}

.detail-btn:hover {
  opacity: 0.9;
}

/* SLOT */
.slot-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 25px;
}

.slot-card {
  background: #fff7db;
  color: #92400e;
  border: 1px solid #e5c96b;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}
</style>
