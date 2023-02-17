<template>
    <div class="flex flex-row">
        <div
            class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img src="@/assets/pizza.jpg" class="w-full shrink-0 h-full object-cover">
        </div>
        <Spinner v-if="state.isLoading" />
        <div v-else class="recipes-y-scroll flex flex-1 flex-col space-y-2 h-full w-full overflow-hidden hover:overflow-y-auto">
            <div v-for="item in items" :key="item.id" class="flex flex-row items-center space-x-8 py-4 border rounded">
                <div class="w-1/4">
                    <img :src="item.coverUrl" class="w-full h-full object-cover">
                </div>
                <div class="w-3/4 flex flex-col space-y-2">
                    <h3 class="text-lg font-medium">{{ item.title }}</h3>
                    <div>
                        <span v-for="tag in item.tags"
                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-[11px] font-semibold text-gray-700 mr-2 mb-2">#{{
                                tag
                            }}</span>
                    </div>
                    <RouterLink :to="{ name: 'recipe-details', params: { id: item.id } }">
                        <BaseButton type="button" class="px-2 py-1 text-xs">Details</BaseButton>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';
import BaseButton from '@/components/BaseButton.vue';
import getCollection from '@/composables/getCollection';
import { inject } from 'vue';
const { state } = inject('store');
const { items } = getCollection('recipes')
</script>