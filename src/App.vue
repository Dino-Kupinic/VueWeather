<template>
    <Header @location-change="getNewLocation" @country-change="getNewCountry"/>

    <div id="main-container" v-if="userInput !== ''">
        <h1 id="location">{{ userInput }}</h1>
        <div id="time-date-container">
            <h3 id="time">{{ currentTime }}</h3>
            <h4 id="day">{{ currentDay }}</h4>
        </div>
    </div>

    <div id="details-container">

    </div>

    <Footer/>
</template>

<script lang="ts">
import {defineComponent, toRaw} from "vue";
import {Location} from "@/scripts/location";
import Header from "@/components/Header.vue";
import {fetchData, getDay, getTime} from "@/scripts/weather";
import type {WeatherForecast} from "@/scripts/weather";
import Footer from "@/components/Footer.vue";

const FIVE_MINUTES = 300_000;
const ONE_SECOND = 1_000;

export default defineComponent({
    components: {
        Footer,
        Header
    },
    data(): {
        userInput: string,
        currentTime: string,
        currentDay: string,
        locationCountry: string
    } {
        return {
            userInput: "",
            locationCountry: "",
            currentTime: "",
            currentDay: "",
        };
    },
    methods: {
        getNewLocation(data: string): void {
            this.userInput = toRaw(data);
        },
        getNewCountry(data: string): void {
            this.locationCountry = toRaw(data);
        },
        updateTime(): void {
            setInterval(() => this.currentTime = getTime(), ONE_SECOND);
        },
        updateDay(): void {
            this.currentDay = getDay();
            setTimeout(this.updateDay, FIVE_MINUTES);
        }
    },
    watch: {
        async locationCountry(newLocation, oldLocation) {
            if (newLocation !== "") {
                const weatherForecastArray: WeatherForecast[] = await fetchData(new Location(this.userInput, newLocation));
                for (const day of weatherForecastArray) {
                    const div = document.createElement("div");
                    const h1 = document.createElement("h1");
                    div.style.backgroundColor = "red";
                    div.style.width = "200px";
                    div.style.height = "200px";
                    console.log(day.name)
                    div.appendChild(h1);
                    document.appendChild(div);
                }

            }
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

h3 {
    font-size: 26px;
}

h4 {
    font-size: 18px;
}

#main-container {
    background-color: white;
    border-radius: 20px;
    margin: 100px auto auto;
    padding: 20px;
    width: 75%;
    text-align: center;
    font-weight: bold;
    box-shadow: 4px 6px 6px rgb(0, 0, 0, 0.2);
}

#location {
    font-size: 60px;
}

#time-date-container {
    border: 2px solid gray;
    width: 20%;
    border-radius: 30px;
    margin: auto;
}

</style>