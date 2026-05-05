import { createRouter, createWebHistory } from "vue-router";
import loginUser from "../views/loginUser.vue";
import RegisterUser from "../views/RegisterUser.vue";
import HomePage from "../views/HomePage.vue";
import HomePage2 from "../views/HomePage2.vue";
import AboutPage from "../views/AboutPage.vue";
import KatalogPage from "../views/KatalogPage.vue";
import AiPage from "../views/AiPage.vue";
import DetailCar from "../views/DetailCar.vue";
import JadwalPage from "../views/JadwalPage.vue";
import SuccessJadwal from "../views/SuccessJadwal.vue";
import MyAppointments from "../views/MyAppointments.vue";
import MyAppointments2 from "../views/MyAppointments2.vue";
import Profile from "../views/Profile.vue";
import Profile2 from "../views/Profile2.vue";
import ViewProfile from "../views/ViewProfile.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: HomePage,
  },
  {
    path: "/home",
    name: "HomeAfterLogin",
    component: HomePage2,
  },
  {
    path: "/login",
    name: "LoginUser",
    component: loginUser,
  },
  {
    path: "/register",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
  {
    path: "/katalog",
    component: KatalogPage,
  },
  {
    path: "/ai",
    component: AiPage,
  },
  {
    path: "/detail",
    name: "DetailCar",
    component: DetailCar,
  },
  {
    path: "/jadwal",
    component: JadwalPage,
  },
  {
    path: "/success",
    component: SuccessJadwal,
  },
  {
    path: "/appointments",
    component: MyAppointments,
  },
  {
    path: "/appointments2",
    component: MyAppointments2,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/profile2",
    component: Profile2,
  },
  {
    path: "/viewprofile",
    component: ViewProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
