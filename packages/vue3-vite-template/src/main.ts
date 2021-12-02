import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { mountedGlobalRegister } from "./global";
import "@/assets/css/index.less";

const app = createApp(App);

app.use(router).use(store).use(mountedGlobalRegister);

app.mount("#app");
