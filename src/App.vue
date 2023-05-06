<template>
    <nav>
        <span class="router-nav"><RouterLink to="/">Home </RouterLink></span>
        <span class="router-nav"><RouterLink to="/faq">FAQ </RouterLink></span>
        <span class="router-nav"><RouterLink to="/impressum">Impressum </RouterLink></span>
    </nav>
    <RouterView/>
    <Footer></Footer>
</template>

<script setup lang="ts">

import Footer from "@/components/Footer.vue";
</script>

<style>
nav {
    font-size: 25px;
    background-color: #e7ffef;
    padding: 10px;
}

.router-nav {
    margin-right: 20px;
    margin-left: 10px;
}

a {
    text-decoration: none;
}

.router-link-exact-active {
    color: #299cf8;
}

</style>