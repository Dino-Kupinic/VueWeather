<template>
    <Header @location-change="getNewLocation"/>

    <div id="main-container">
        <h1 id="location">{{ userInput }}</h1>
        <p id="time">{{ currentTime }}</p>
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
            this.currentTime = getTime();


            const locationObject = new Location();
            locationObject.name = this.userInput;
            console.log(locationObject.name);
        }
    },
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
    text-align: center;
    font-weight: bold;
}

#location {
    font-size: 60px;
}


</style>