<template>
    <footer>
        <p>Copyright © 2023 Dino Kupinic All rights reserved.</p>
        <ul>
            <li><a href="src/subpages/impressum.html">Impressum</a></li>
            <li><a href="src/subpages/impressum.html">Privacy Policy</a></li>
            <li><a href="src/subpages/impressum.html">FAQ</a></li>
        </ul>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Footer"
});
</script>

<style scoped>
footer {
    border-top: 20px solid #e7ffef;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: white;
}

li {
    display: inline;
    list-style: none;
    font-family: 'Roboto', sans-serif;
    padding: 5px;
}

p {
    color: gray;
    padding-left: 45px;
}
</style>