<template>
    <Header></Header>

    <div id="main-container" v-if="userInput !== ''">
        <h1 id="location">{{ userInput }}</h1>
        <div id="time-date-container">
            <h3 id="time">{{ currentTime }}</h3>
            <h4 id="day">{{ currentDay }}</h4>
        </div>
    </div>

    <div id="day-container">
        <div class="day" v-for="day of days">
            <Day :data="day"></Day>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, toRaw, watch} from "vue";
import {Location} from "@/scripts/location";
import {fetchData, FIVE_MINUTES_IN_MS, getDay, getTime, ONE_SECOND_IN_MS} from "@/scripts/weather";
import type {WeatherForecast} from "@/scripts/weather";
import Header from "@/components/Header.vue";
import {useLocationStore} from "@/stores/locationStore";
import Day from "@/components/Day.vue";

const userInput = ref<string>("");
const locationCountry = ref<string>("");
const currentTime = ref<string>("");
const currentDay = ref<string>("");
const days = ref<WeatherForecast[]>([]);

const locationStore = useLocationStore();

function updateTime(): void {
    setInterval(() => currentTime.value = getTime(), ONE_SECOND_IN_MS);
}

function updateDay(): void {
    currentDay.value = getDay();
    setTimeout(updateDay, FIVE_MINUTES_IN_MS);
}

function getNewLocation(data: string): void {
    userInput.value = toRaw(data);
}

function getNewCountry(data: string): void {
    locationCountry.value = toRaw(data);
}

watch(userInput, async (newLocation) => {
    locationStore.updateLastLocation(newLocation);
    if (locationStore.lastLocation === newLocation) {
        days.value = [];
    }
    if (newLocation !== "") {
        const weatherForecastArray: WeatherForecast[] = await fetchData(new Location(userInput.value, newLocation));
        if (weatherForecastArray.length != null || undefined) {
            for (const day of weatherForecastArray) {
                days.value.push(day);
            }
        }
    } else {
        days.value = [];
    }
});

onMounted(() => {
    updateTime();
    updateDay();
});

watch(() => locationStore.location, getNewLocation);
watch(() => locationStore.country, getNewCountry);


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
    margin: 60px auto auto;
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

.day {
    display: inline-block;
    width: 100%;
    height: 450px;
    box-shadow: 4px 6px 6px rgb(0, 0, 0, 0.2);
    background-color: white;
    border-radius: 20px;
}

#day-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 25px;
    width: 75%;
    text-align: center;
    margin: 50px auto auto;
}

</style>