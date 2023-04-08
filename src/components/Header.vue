<template>
    <nav>
        <h1><span id="vue-title">Vue</span><span id="weather-title"> Weather</span></h1>
        <ul>
            <li>
                <Choicebox :country-list="countryCodes"/>
            </li>
            <li>
                <Searchbar @location-change="passNewLocation"/>
            </li>
            <li>
                <Button text="Settings" :func="test"/>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Button from "@/components/Button.vue";
import Choicebox from "@/components/Choicebox.vue";

export default defineComponent({
    name: "Header",
    components: {
        Choicebox,
        Button,
        Searchbar
    },
    data(): { countryCodes: Array<string> } {
        return {
            countryCodes: [
                "Austria, at", "United Kingdom, uk", "United States, us",
                "Germany, de", "Japan, jp", "Canada, cn"
            ]
        };
    },
    methods: {
        passNewLocation(data: string): void {
            this.$emit("location-change", data);
        },
        test() {
            console.log("testButton");
        }
    }
});
</script>

<style scoped>
h1 {
    font-size: 30px;
}

#vue-title {
    font-size: 38px;
    font-family: 'Gluten', cursive;
    background: linear-gradient(to right, #b3ffab, #12fff7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#weather-title {
    font-family: 'Satisfy', cursive;
}

nav {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 20px solid #e7ffef;
    background-color: white;
}

nav ul {
    display: flex;
    list-style: none;
}

nav li {
    padding-left: 20px;
}
</style>