import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"
import { auth } from "./modules/auth"
import { general } from "./modules/gerneral"
import { products } from "./modules/products"
import mainlayout from "../layouts/mainwrapper"
import { Users} from "./modules/users"
import { blogs} from "./modules/blog"
import { seos} from "./modules/seo"

var token = store.getters.Token
var isadmin = store.getters.isadmin = true
Vue.use(VueRouter);

const routes = [
  ...auth,
  {path: "/",component: mainlayout, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  },
  children: [
    ...general,
    ...products,
    ...Users,
    ...blogs,
    ...seos
        ]
      },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
