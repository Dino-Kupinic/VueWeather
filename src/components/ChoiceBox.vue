<template>
    <select @input="locationStore.updateCountry(formatSelectedCountry)" v-model="selected">
        <option disabled="disabled">please select a country</option>
        <option v-for="code in countryList" selected :key="code"> {{ code }}</option>
    </select>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useLocationStore} from "@/stores/locationStore";

const locationStore = useLocationStore();

const selected = ref<string>("Austria, at");
defineProps<{
    countryList: string[]
}>();

const formatSelectedCountry = computed(() => {
    return selected.value.substring(selected.value.indexOf(", ") + 2, selected.value.length);
});

</script>

<style scoped>
select {
    padding: 4px;
    border: 1px solid gray;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
    font-size: 20px;
}
</style>