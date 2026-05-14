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
import Reschedule from "../views/Reschedule.vue";
import SuccessReschedule from "../views/SuccessReschedule.vue";

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
    meta: { requiresAuth: true },
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
    path: "/detail/:id",
    name: "DetailCar",
    component: DetailCar,
  },
  {
    path: "/jadwal/:id",
    name: "jadwal",
    component: JadwalPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/success/:id",
    name: "success",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/viewprofile",
    component: ViewProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/reschedule/:id",
    name: "reschedule",
    component: Reschedule,
  },
  {
    path: "/successreschedule/:id",
    name: "successreschedule",
    component: SuccessReschedule,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next({
      path: "/login",
      query: {
        auth: "required"
      }
    });
  } else {
    next();
  }
});

export default router;
