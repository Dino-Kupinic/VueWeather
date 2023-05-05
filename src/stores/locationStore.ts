import {defineStore} from "pinia";
import {ref} from "vue";

export const useLocationStore = defineStore("location", () => {
    const location = ref<string>("");
    const country = ref<string>("");

    function updateLocation(newLocation: string): void {
        location.value = newLocation;
    }

    function updateCountry(newCountry: string): void {
        country.value = newCountry;
    }

    function $reset(): void {
        location.value = "";
        country.value = "";
    }

    return {location, country, updateLocation, updateCountry, $reset};
});