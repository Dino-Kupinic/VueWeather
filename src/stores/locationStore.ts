import {defineStore} from "pinia";
import {ref} from "vue";

export const useLocationStore = defineStore("location", () => {
    const location = ref<string>("");
    const country = ref<string>("");
    const lastLocation = ref<string>("");

    function updateLastLocation(newLocation: string): void {
        lastLocation.value = newLocation;
    }

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

    return {location, country, lastLocation, updateLocation, updateCountry, updateLastLocation, $reset};
});