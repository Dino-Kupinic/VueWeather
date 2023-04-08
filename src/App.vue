<template>
    <Header @location-change="getNewLocation"/>

    <div id="main-container" v-if="userInput !== ''">
        <h1 id="location">{{ userInput }}</h1>
        <div id="time-date-container">
            <h3 id="time">{{ currentTime }}</h3>
            <h4 id="day">{{ currentDay }}</h4>
        </div>
    </div>

    <div id="details-container">

    </div>

    <Footer />
</template>

<script lang="ts">
import {defineComponent, toRaw} from "vue";
import {Location} from "@/scripts/location";
import Header from "@/components/Header.vue";
import {getDay, getTime} from "@/scripts/weather";
import Footer from "@/components/Footer.vue";

const FIVE_MINUTES = 300_000;

export default defineComponent({
    components: {
        Footer,
        Header
    },
    data(): {
        userInput: string,
        currentTime: string,
        currentDay: string
    } {
        return {
            userInput: "",
            currentTime: "",
            currentDay: "",
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
        },
        updateDay(): void {
            this.currentDay = getDay();
            setTimeout(this.updateDay, FIVE_MINUTES);
        }
    },
    mounted() {
        this.updateTime();
        this.updateDay();
    }
});
</script>

<style>
body {
    margin: 0;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    background-size: 300% 300%;

    font-family: 'Roboto', sans-serif;
}

#main-container {
    background-color: white;
    border-radius: 20px;
    margin: 100px auto auto;
    padding: 20px;
    width: 75%;
    text-align: center;
    font-weight: bold;
    box-shadow: 4px 6px 6px rgb(0,0,0,0.2);
}

#location {
    font-size: 60px;
}

#time-date-container {
    border: 1px solid black;
    width: 20%;
    border-radius: 20px;
    margin: auto;
}


</style>