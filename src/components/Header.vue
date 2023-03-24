<template>
  <nav>
    <h1>VueWeather</h1>
    <ul>
      <li><Searchbar /></li>
      <li>
        <button>?</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Searchbar from "@/components/Searchbar.vue";

export default defineComponent({
  name: "Header",
  components: {
    Searchbar
  }
});
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background: #cfd8dc;
}

nav ul {
  display: flex;
  list-style: none;
}

nav li {
  padding-left: 20px;
}
</style>