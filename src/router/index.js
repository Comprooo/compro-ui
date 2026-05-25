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
import Dashboard from "../views/admin/Dashboard.vue";
import Katalog from "../views/admin/Katalog.vue";
import ApointmentsAdmin from "../views/admin/ApointmentsAdmin.vue";
import JadwalAdmin from "../views/admin/JadwalAdmin.vue";
import Statistik from "../views/admin/Statistik.vue";
import DetailProduk from "../views/admin/DetailProduk.vue";
import EditKatalog from "../views/admin/EditKatalog.vue";
import TambahKatalog from "../views/admin/TambahKatalog.vue";
import SuccessAddKatalog from "../views/admin/SuccessAddKatalog.vue";
import BlankNotif from "../views/admin/BlankNotif.vue";
import FilledNotif from "../views/admin/FilledNotif.vue";
import DetailApo from "../views/admin/DetailApo.vue";
import ProfileAdmin from "../views/admin/profileAdmin.vue";
import EditProfileAdmin from "../views/admin/editProfileAdmin.vue";
import EditJadwal from "../views/admin/EditJadwal.vue";
import TambahJadwal from "../views/admin/TambahJadwal.vue";

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
  { path: "/admin/dashboard", component: Dashboard, meta:{requiresAuth:true} },
  { path: "/admin/katalog", component: Katalog,  meta:{requiresAuth:true}},
  { path: "/admin/appointment", component: ApointmentsAdmin,  meta:{requiresAuth:true} },
  { path: "/admin/jadwal", component: JadwalAdmin,  meta:{requiresAuth:true} },
  { path: "/admin/statistik", component: Statistik,  meta:{requiresAuth:true} },
  { path: "/admin/detail/:id", component: DetailProduk,  meta:{requiresAuth:true} },
  { path: "/admin/editkatalog/:id", component: EditKatalog,  meta:{requiresAuth:true} },
  { path: "/admin/addkatalog", component: TambahKatalog,  meta:{requiresAuth:true} },
  { path: "/admin/successkatalog", component: SuccessAddKatalog,  meta:{requiresAuth:true} },
  { path: "/admin/blanknotif", component: BlankNotif,  meta:{requiresAuth:true} },
  { path: "/admin/notif", component: FilledNotif,  meta:{requiresAuth:true} },
  { path: "/admin/detailapo/:id", component: DetailApo,  meta:{requiresAuth:true} },
  { path: "/admin/profileadmin", component: ProfileAdmin,  meta:{requiresAuth:true} },
  { path: "/admin/editprofile", component: EditProfileAdmin,  meta:{requiresAuth:true} },
  { path: "/admin/editjadwal/:id", component: EditJadwal,  meta:{requiresAuth:true} },
  { path: "/admin/tambahjadwal", component: TambahJadwal,  meta:{requiresAuth:true} },
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
