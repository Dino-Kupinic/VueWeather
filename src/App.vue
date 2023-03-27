<template>
  <Header @location-change="getNewLocation"/>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  components: {
    Header
  },
  methods: {
    getNewLocation(data: String) {
      console.log(data);
    }
  }
});
</script>


<style>
body {
  font-family: Arial, serif;
}
</style>