<template>
    <Teleport to="#modal">
        <transition name="fade" appear>
            <div class="fixed inset-0 z-40 bg-gray-800 opacity-60 cursor-pointer" v-if="show" @click="closePopup()">
            </div>
        </transition>
        <transition name="pop" appear>
            <div class="fixed inset-0 z-50 p-8 w-fit h-fit max-w-4xl m-auto rounded shadow bg-white transform-none"
                role="dialog" v-if="show">
                <slot></slot>
                <div class="flex items-center justify-end space-x-2">
                    <button @click="closePopup()" class="absolute top-4 right-4 text-red-700 hover:bg-gray-100 p-1 rounded-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { inject } from 'vue'
const { closePopup } = inject('store')
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>