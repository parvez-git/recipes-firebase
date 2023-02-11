<template>
    <Spinner v-if="state.isLoading"/>
    <div v-else class="flex flex-row">
        <div class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img src="../assets/pizza.jpg" class="w-full shrink-0 h-full object-cover">
        </div>
        <div class="flex flex-1 flex-row flex-wrap items-center justify-center gap-4">
            <div v-for="item in items" :key="item.id" class="w-32 h-32 bg-slate-50 rounded-full overflow-hidden hover:drop-shadow-2xl cursor-pointer">
                <RouterLink :to="{ name: 'recipe-details', params: { id: item.id } }">
                    <img :src="item.coverUrl" class="w-full h-full object-cover" alt="item.title">
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import getCollection from '@/composables/getCollection';
import Spinner from '@/components/Spinner.vue';
import { inject } from 'vue';
const { state } = inject('store');
const { items } = getCollection('recipes')
</script>