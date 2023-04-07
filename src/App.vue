<template>
    <Header @location-change="getNewLocation"/>

    <div id="main-container" v-if="userInput !== ''">
        <h1 id="location">{{ userInput }}</h1>
        <h3 id="time">{{ currentTime }}</h3>
    </div>

    <div id="details-container">

    </div>
</template>

<script lang="ts">
import {defineComponent, toRaw} from "vue";
import {Location} from "@/scripts/location";
import Header from "@/components/Header.vue";
import {getTime} from "@/scripts/weather";

export default defineComponent({
    components: {
        Header
    },
    data(): { userInput: string, currentTime: string } {
        return {
            userInput: "",
            currentTime: ""
        };
    },
    methods: {
        getNewLocation(data: string): void {
            this.userInput = toRaw(data);


            const locationObject = new Location();
            locationObject.name = this.userInput;
            console.log(locationObject.name);
        },
        updateTime(): void {
            setInterval(() => this.currentTime = getTime(), 1000);
        }
    },
    mounted() {
        this.updateTime();
    }
});
</script>

<style>
body {
    margin: 0;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    background-size: 300% 300%;

    font-family: Arial, serif;
}

#main-container {
    background-color: white;
    border-radius: 20px;
    margin: 100px auto auto;
    padding: 20px;
    width: 75%;
    text-align: center;
    font-weight: bold;
}

#location {
    font-size: 60px;
}


</style>