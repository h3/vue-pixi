import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import VuePixi from "../index";

Vue.use (VuePixi)

Vue.config.productionTip = false

new Vue ({
    router,
    render : h => h (App)
}).$mount ("#app")
