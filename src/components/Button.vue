<template>
    <button @click="func">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{
    text?: string,
    func?: Function
}>()
</script>

<style scoped>
button {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    font-family: 'Roboto', serif;
    font-size: 20px;
}
</style>