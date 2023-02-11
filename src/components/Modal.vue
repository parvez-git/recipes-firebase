<template>
    <Teleport to="#modal">
        <transition name="fade" appear>
            <div class="fixed inset-0 z-40 bg-gray-800 opacity-60 cursor-pointer" v-if="show" @click="closeModal()">
            </div>
        </transition>
        <transition name="pop" appear>
            <div class="fixed inset-0 m-auto text-center w-fit h-fit max-w-xs rounded shadow bg-white transform-none z-50 p-8"
                role="dialog" v-if="show">
                <button @click="closeModal()" class="absolute top-4 right-4 text-red-700 hover:bg-gray-100 p-1 rounded-sm">
                    <Icons name="close"/>
                </button>
                <div class="flex flex-col items-center justify-center space-y-4 py-6">
                    <div class="bg-red-500 text-white p-4 rounded-full">
                        <Icons name="delete"/>
                    </div>
                    <h2 class="text-3xl">Are you sure?</h2>
                    <p>Do you really want to delete this record? This process can not be undone.</p>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <BaseButton @click="closeModal()" type="button" class="rounded capitalize text-gray-800 bg-slate-200 hover:bg-slate-300 border">
                        cancel
                    </BaseButton>
                    <BaseButton @click="confirmModal" type="button" class="rounded capitalize">
                        confirm
                    </BaseButton>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import Icons from '@/components/Icons.vue';
import BaseButton from '@/components/BaseButton.vue';

const props = defineProps({
    id: {
        type: [Number, String],
        default: null
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits([
    'close',
    'confirm'
])

function closeModal() {
    emit("close");
}

function confirmModal() {
    emit("confirm", props.id);
}
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