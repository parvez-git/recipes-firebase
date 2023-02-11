<template>
    <label v-show="showlabel" for="label" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">{{ label }}</label>
    <input
        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-slate-400 dark:focus:border-slate-400 focus:ring-slate-400 focus:outline-none focus:ring focus:ring-opacity-40"
        v-bind="$attrs" :placeholder="label" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    showlabel: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: [String, Number],
        default: ''
    }
})
</script>