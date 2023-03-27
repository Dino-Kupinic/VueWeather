<template>
  <input @change="passNewLocation" v-model="location.name" type="text" placeholder="Search...">
</template>

<script lang="ts">
import {defineComponent} from "vue";

interface location {
  name: String;
}

export default defineComponent({
  name: "Searchbar",
  data() {
    return {
      location: {name: ""} as location
    };
  },
  methods: {
    passNewLocation() {
      this.$emit("location-change", this.location);
    }
  },
});
</script>

<style scoped>

</style>