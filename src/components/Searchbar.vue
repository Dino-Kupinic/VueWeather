<template>
    <input @input="passNewLocation" v-model="location" type="text" placeholder="Search...">
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Searchbar",
    data(): { location: string } {
        return {
            location: ""
        };
    },
    methods: {
        passNewLocation(): void {
            this.$emit("location-change", this.location);
        }
    },
});
</script>

<style scoped>

</style>