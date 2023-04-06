import App from "./App.vue";
import {createApp} from "vue";
import {run} from "@/scripts/logic";

createApp(App).mount("#app");
run();