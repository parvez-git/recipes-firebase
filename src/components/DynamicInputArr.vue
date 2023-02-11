<template>
    <div class="flex flex-col space-y-2">
        <div class="flex flex-row items-center justify-between mt-4">
            <h3 v-show="itemsHeading" class="text-2xl font-bold text-slate-500 capitalize">{{ itemsHeading }}</h3>
            <BaseButton @click="addMore" type="button" class="text-sm uppercase font-bold">Add
            </BaseButton>
        </div>
        <div v-for="(_, index) in items" :key="index">
            <div class="flex flex-row items-center justify-between space-x-1">
                <BaseInput v-model="items[index]" :label="placeholder" type="text" :showlabel="false" />
                <BaseButton @click="remove(index)" type="button" class="bg-red-400 shrink-0 text-white py-2.5 px-3 translate-y-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue'
const props = defineProps({
    items: {
        type: Array,
        default: () => [] 
    },
    itemsHeading: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    }
})
const items = ref(props.items)

const addMore = () => {
    items.value.push('')
}
const remove = (index) => {
    items.value.splice(index, 1);
}
</script>