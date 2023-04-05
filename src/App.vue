<template>
    <Header @location-change="getNewLocation"/>
    <h1 id="location">{{ userInput }}</h1>
</template>

<script lang="ts">
import {defineComponent, toRaw} from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
    components: {
        Header
    },
    data(): { userInput: string } {
        return {
            userInput: ""
        };
    },
    methods: {
        getNewLocation(data: string) : void {
            this.userInput = toRaw(data);
        }
    }
});
</script>


<style>
body {
    font-family: Arial, serif;
}

#location {
    text-align: center;
}
</style>