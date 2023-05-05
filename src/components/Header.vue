<template>
    <nav>
        <h1><span id="vue-title">Vue</span><span id="weather-title"> Weather</span></h1>
        <ul>
            <li><ChoiceBox :country-list="countryCodes"/></li>
            <li><Searchbar/></li>
            <li><Button text="Settings"/></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Searchbar from "@/components/Searchbar.vue";
import Button from "@/components/Button.vue";
import ChoiceBox from "@/components/ChoiceBox.vue";
import {countries} from "@/scripts/countries";

const countryCodes = ref<string[]>(countries);

</script>

<style scoped>
h1 {
    font-size: 30px;
}

#vue-title {
    font-size: 38px;
    font-family: 'Gluten', cursive;
    background: linear-gradient(to right, #b3ffab, #12fff7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#weather-title {
    font-family: 'Satisfy', cursive;
}

nav {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 20px solid #e7ffef;
    background-color: white;
}

nav ul {
    display: flex;
    list-style: none;
}

nav li {
    padding-left: 20px;
}
</style>