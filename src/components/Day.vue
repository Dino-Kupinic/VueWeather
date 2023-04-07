<template>

</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Day",
    data(): { name: string, icon: string, temperatureInCelsius: number } {
        return {
            name: "",
            icon: "",
            temperatureInCelsius: 0,
        };
    }
});
</script>

<style scoped>

</style>