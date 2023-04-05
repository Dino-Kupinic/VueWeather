<template>
    <nav>
        <h1>VueWeather</h1>
        <ul>
            <li>
                <Searchbar @location-change="passNewLocation"/>
            </li>
            <li>
                <Button text="?" :func="test"/>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
    name: "Header",
    components: {
        Button,
        Searchbar
    },
    methods: {
        passNewLocation(data: string) : void {
            this.$emit("location-change", data);
        },
        test() {
            console.log("testButton")
        }
    }
});
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    background: #cfd8dc;
}

nav ul {
    display: flex;
    list-style: none;
}

nav li {
    padding-left: 20px;
}
</style>