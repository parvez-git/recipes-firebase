<template>
    <div v-if="document" class="flex flex-row items-center justify-center">
        <div class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img :src="document.coverUrl" class="w-full shrink-0 h-full object-cover" :alt="document.title">
        </div>
        <div class="flex-1 flex flex-col h-full">
            <div class="flex flex-row justify-between space-x-4 mb-3">
                <h2 class="text-2xl font-bold">{{ document.title }}</h2>
                <div class="flex flex-row items-center space-x-2">
                    <RouterLink v-if="ownership" :to="{ name: 'recipe-edit', params: { id: document.id } }"
                        class="text-left text-blue-900 hover:text-blue-600">
                        <Icons name="edit" />
                    </RouterLink>
                    <button type="button" v-if="ownership" :disabled="state.isLoading" @click="state.isModalOpen = true"
                        class="text-left text-red-900 hover:text-red-600">
                        <Icons name="delete" />
                    </button>
                </div>
            </div>
            <div class="flex flex-row items-center justify-between space-x-8">
                <div class="w-1/2">
                    <p class="mb-4 text-gray-600">{{ document?.description }}</p>
                    <span v-for="(tag, index) in document?.tags" :key="index"
                        class="bg-red-400 px-2 py-1 rounded text-white text-sm whitespace-nowrap mr-1 mb-2 transition-colors duration-100 ease-linear cursor-pointer">
                        {{ tag }}
                    </span>
                    <hr class="my-2">
                    <p class="text-gray-700 italic">Cooking Time: {{ document?.cookingTime }} min</p>
                    <hr class="my-2">
                    <h3 class="text-base font-bold uppercase underline">Ingredients:</h3>
                    <ul v-for="(ingredient, index) in document?.ingredients" :key="index" class="list-none">
                        <li class="flex flex-row items-center justify-between px-4 py-2 bg-gray-100 mt-2">
                            <div>{{ ingredient.name }}</div>
                            <div class="font-bold text-xs">{{ ingredient.calorie }} cal</div>
                        </li>
                    </ul>
                </div>
                <div class="w-1/2">
                    <h3 class="text-base font-bold uppercase underline">Instructions:</h3>
                    <ul v-for="(instruction, index) in document?.instructions" :key="index">
                        <li class="px-4 py-2 bg-gray-100 mt-2">{{ instruction }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- DELETE MODAL -->
    <Modal 
        :show="state.isModalOpen" 
        :id="props.id" 
        @close="closePopup()" 
        @confirm="handleDelete(id)" 
    />
</template>

<script setup>
import Icons from '@/components/Icons.vue';
import Modal from '@/components/Modal.vue';
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import { ref, computed, inject } from 'vue'
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const router = useRouter()
const { user } = getUser()
const { state, closePopup } = inject('store')
const { document } = getDocument('recipes', props.id);
const { deleteDocument } = useDocument('recipes', props.id)
const { deleteImage } = useStorage()

const ownership = computed(() => {
    return document.value && user.value && user.value.email == document.value.userEmail
})

const handleDelete = async (modalID) => {
    state.isModalOpen = true

    if (modalID == props.id) {
        await deleteImage(document.value.filePath)
        await deleteDocument()

        state.isModalOpen = false
        router.push({ name: 'home' })

    } else {
        state.isModalOpen = false
        state.toast.push({
            type: 'danger',
            message: 'Problem in delete recipe!'
        })
    }
}
</script>