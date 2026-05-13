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
  {
    path: "/reschedule",
    component: Reschedule,
  },
  {
    path: "/successreschedule",
    component: SuccessReschedule,
  },
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/katalog", component: Katalog },
  { path: "/admin/appointment", component: ApointmentsAdmin },
  { path: "/admin/jadwal", component: JadwalAdmin },
  { path: "/admin/statistik", component: Statistik },
  { path: "/admin/detail", component: DetailProduk },
  { path: "/admin/editkatalog", component: EditKatalog },
  { path: "/admin/addkatalog", component: TambahKatalog },
  { path: "/admin/successkatalog", component: SuccessAddKatalog },
  { path: "/admin/blanknotif", component: BlankNotif },
  { path: "/admin/notif", component: FilledNotif },
  { path: "/admin/detailapo", component: DetailApo },
  { path: "/admin/profileadmin", component: ProfileAdmin },
  { path: "/admin/editprofile", component: EditProfileAdmin },
  { path: "/admin/editjadwal", component: EditJadwal },
  { path: "/admin/tambahjadwal", component: TambahJadwal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
