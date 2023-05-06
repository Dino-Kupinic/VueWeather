<template>
    <h1>{{ data.name }}</h1>
    <h3>{{ data.averageTemperature }} °C</h3>
    <p>Feels like {{ data.temperateFeelsLike }} °C</p>
    <img v-bind:src="ImageURL" alt="noImage">
    <h4>{{ data.currentWeather }}</h4>
</template>

<script setup lang="ts">
import type {WeatherForecast} from "@/scripts/weather";
import {fetchWeatherImage} from "@/scripts/weather";
import {onMounted, ref} from "vue";

const props = defineProps<{
    data: WeatherForecast
}>();

const ImageURL = ref<string>("");

onMounted(async () => {
    ImageURL.value = await fetchWeatherImage(props.data.icon);
})

</script>

<style scoped>

</style>