<template>
    <TransitionGroup name="list" tag="div" class="fixed z-50 flex flex-col space-y-2 max-w-xs w-full top-5 right-2">
        <div v-for="(toast, index) in state.toast" :key="index"
            class="flex space-x-2 w-full bg-white px-4 py-3 rounded shadow overflow-hidden">
            <div :class="{
                'text-green-400': toast.type == 'success',
                'text-orange-400': toast.type == 'warning',
                'text-red-400': toast.type == 'danger',
                'text-blue-400': toast.type == 'info'
            }">
                <Icons :name="toast.type" />
            </div>
            <div class="flex-1 text-sm">{{ toast.message }}</div>
            <div @click="remove(index)" class="text-gray-500 hover:text-gray-600 p-0.5 cursor-pointer">
                <Icons name="close" />
            </div>
        </div>
    </TransitionGroup>
</template>

<script setup>
import Icons from '@/components/Icons.vue';
import { ref, watch, inject } from 'vue';
const { state } = inject('store');

const remove = (index) => state.toast.splice(index, 1)

let timeout = ref(null)
watch(
    () => state.toast,
    () => {
        if (timeout.value) {
            clearTimeout(timeout.value)
        }
        timeout.value = setTimeout(() => state.toast.shift(), 2000)
    },
    { deep: true }
)

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(150px);
}
</style>