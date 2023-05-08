<template>
    <input @keyup.enter="locationStore.updateLocation(location)" v-model="location" type="text" placeholder="Search...">
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useLocationStore} from "@/stores/locationStore";

const locationStore = useLocationStore();

const location = ref<string>("");

onMounted(() => {
    location.value = locationStore.location;
})

</script>

<style scoped>
input {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
}
</style>