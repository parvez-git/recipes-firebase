<template>
    <div v-show="msg">
        <p class="mt-6 text-sm text-center text-red-600 italic">
            {{ msg }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    msg: {
        type: String,
        default: null
    }
})
</script>