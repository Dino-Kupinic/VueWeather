<template>
  <nav>
    <ul>
      <li><h1>VueWeather</h1></li>
      <li><input type="text"></li>
      <li><button>?</button></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
      name: "Header"
});
</script>

<style scoped>

</style>