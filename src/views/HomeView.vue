<template>
    <Spinner v-if="state.isLoading" />
    <!-- Silder image -->
    <div v-else class="flex flex-row items-center justify-center">
        <div v-if="items.length"
            class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img :src="items[currentIndex].coverUrl" class="w-full shrink-0 h-full object-cover"
                :alt="items[currentIndex].title">
        </div>
        <!-- Silder Content -->
        <div v-if="items.length" class="flex-1 flex flex-col h-full justify-end">
            <h1 class="font-bold text-4xl text-slate-800">{{ items[currentIndex].title }}</h1>
            <p class="py-4 text-slate-600 max-w-lg">{{ items[currentIndex].description }}</p>
            <!-- view details -->
            <div class="flex flex-row items-center space-x-12 py-4">
                <div class="italic text-slate-700">
                    <div class="text-sm underline capitalize">cooking time:</div>
                    <div class="text-xl font-bold uppercase">30 min</div>
                </div>
                <RouterLink :to="{ name: 'recipe-details', params: { id: items[currentIndex].id } }"
                    class="uppercase text-slate-50 bg-slate-800 font-semibold px-4 py-2 shadow">
                    view details
                </RouterLink>
            </div>
            <!-- Thumbnails -->
            <div class="flex flex-row items-center justify-between space-x-1.5 mt-6">
                <div v-for="(item, index) in items" :key="item.id" @click="gotoSlide(index)"
                    :class="{ 'drop-shadow-xl': (index === currentIndex) }"
                    class="bg-slate-800 w-1/4 rounded-tl-[40px] rounded-tr-xl rounded-bl-xl rounded-br-xl cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-translate duration-300 overflow-hidden">
                    <div class="flex flex-row justify-between">
                        <div class="w-20 h-20 shrink-1 bg-white rounded-full overflow-hidden">
                            <img :src="item.coverUrl" class="w-full h-full object-cover" alt="item.title">
                        </div>
                        <div class="text-slate-100 py-4 px-1 w-1/2 flex flex-col space-y-1">
                            <div class="flex flex-row space-x-1">
                                <Icons name="clock"/>
                                <div class="text-xs font-bold uppercase">130 min</div>
                            </div>
                            <div class="text-xs text-slate-100 flex flex-row space-x-1">
                                <Icons name="star"/>
                                <span>4.5</span>
                            </div>
                        </div>
                    </div>
                    <h3 class="text-sm text-slate-100 capitalize px-2 py-2" :title="item.title">{{
                        itemTitle(item.title)
                    }}</h3>
                </div>
            </div> <!-- ./thumb list-->

            <!-- Slider Paginate -->
            <div class="absolute left-[280px] bottom-0">
                <div class="flex flex-row space-x-4">
                    <button @click="prevSlide" type="button" class="text-slate-600">
                        <Icons name="arrow"/>
                    </button>
                    <button @click="nextSlide" type="button" class="rotate-180 text-slate-600">
                        <Icons name="arrow"/>
                    </button>
                </div>
            </div> <!-- ./pagination -->
        </div>
    </div>
</template>

<script setup>
import getDocuments from '@/composables/getDocuments';
import Spinner from '@/components/Spinner.vue';
import Icons from '@/components/Icons.vue';
import { ref, inject, onMounted } from 'vue';
const { state } = inject('store');
const { documents, items } = getDocuments('recipes', 4);

onMounted(() => {
    documents()
})

const itemTitle = (title) => {
    let n = 18;
    return (title.length > n) ? title.slice(0, n - 1) + '...' : title;
}

const currentIndex = ref(0);

const prevSlide = () => {
    if (currentIndex.value) {
        currentIndex.value--;
    } else {
        currentIndex.value = items.value.length - 1;
    }
}
const nextSlide = () => {
    if (currentIndex.value === items.value.length - 1) {
        currentIndex.value = 0;
    } else {
        currentIndex.value++;
    }
}
const gotoSlide = (index) => {
    currentIndex.value = index;
}
</script>