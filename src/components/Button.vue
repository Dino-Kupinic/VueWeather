<template>
    <button @click="func">{{ text }}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "Button",
    props: {
        text: String,
        func: Function
    }
});
</script>

<style scoped>

</style>