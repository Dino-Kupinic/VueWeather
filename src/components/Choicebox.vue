<template>
    <select>
        <option disabled="disabled">please select a country</option>
        <option v-for="code in countryList" :key="code"> {{ code }}</option>
    </select>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Choicebox",
    data(): { selected: string } {
        return {
            selected: ""
        };
    },
    props: {
        countryList: Array
    },
    methods: {}
});
</script>

<style scoped>
select {
    border-radius: 5px;
    font-size: 22px;
}
</style>