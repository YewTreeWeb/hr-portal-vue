import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "airbnb-browser-shims";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
