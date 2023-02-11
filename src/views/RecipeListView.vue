<template>
    <div class="flex flex-row">
        <div
            class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img src="../assets/pizza.jpg" class="w-full shrink-0 h-full object-cover">
        </div>
        <Spinner v-if="state.isLoading" />
        <div v-else id="recipelist" class="flex flex-1 flex-row flex-wrap items-center justify-center gap-4 w-full h-full overflow-hidden hover:overflow-y-auto">
            <figure v-for="item in items" :key="item.id"
                class="md:flex w-full bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" :src="item.coverUrl"
                    width="384" height="512">
                <div class="pt-6 md:p-8 text-center md:text-left space-y-4 mr-1">
                    <blockquote>
                        <p class="text-lg font-medium">{{ item.title }}</p>
                    </blockquote>
                    <figcaption class="font-medium flex flex-row justify-between">
                        <div>
                            <span v-for="(tag, index) in item.tags" :key="index"
                                class="bg-red-400 px-2 py-1 rounded text-white text-sm whitespace-nowrap mr-1 mb-2 transition-colors duration-100 ease-linear cursor-pointer">
                                {{ tag }}
                            </span>
                        </div>
                        <RouterLink :to="{ name: 'recipe-details', params: { id: item.id } }"
                            class="bg-slate-200 text-slate-900 text-base rounded-lg px-3 py-1.5">
                            Details
                        </RouterLink>
                    </figcaption>
                </div>
            </figure>
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