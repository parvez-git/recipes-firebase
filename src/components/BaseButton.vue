<template>
    <button 
        :type="type"
        v-bind="$attrs"
        class="px-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-800 rounded-md hover:bg-slate-900 focus:outline-none focus:bg-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
})
</script>