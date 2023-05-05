import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ImpressumView from "@/views/ImpressumView.vue";
import FaqView from "@/views/FaqView.vue";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                component: HomeView
            },
            {
                path: "/faq",
                component: FaqView
            },
            {
                path: "/impressum",
                component: ImpressumView
            }
        ]
    }
);

export default router;