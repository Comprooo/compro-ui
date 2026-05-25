<template>
  <div class="topbar">
    <h1>{{ title }}</h1>

    <div class="top-actions">
      <div class="profile-btn" @click="goProfile">
        <img src="/src/assets/logo-profile.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
});

const router = useRouter();

const goNotif = () => router.push("/admin/notif");
const goProfile = () => router.push("/admin/profileadmin");
</script>

<style scoped>
.topbar {
  height: 88px;
  background: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 36px;

  border-bottom: 1px solid #ececec;
}

.topbar h1 {
  color: #2f3a74;
  font-size: 24px;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notif-btn,
.profile-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #d4af37;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;
}

.notif-btn:hover,
.profile-btn:hover {
  transform: scale(1.05);
}

.notif-btn img {
  width: 22px;
}

.profile-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
