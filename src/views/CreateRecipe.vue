<template>
    <Popup>
        <div class="block">
            <h2 class="text-3xl font-bold text-center underline mb-6 text-gray-700 dark:text-white">
                <span>Create Recipe</span>
            </h2>
            <div class="h-[460px] overflow-y-auto">
                <div class="flex flex-row justify-between space-x-8 px-2">
                    <!-- Left Half -->
                    <div class="flex flex-col space-y-4 w-1/2">
                        <div>
                            <BaseInput v-model="title" label="Title" type="text" />
                        </div>
                        <div>
                            <BaseInput v-model="description" label="Description" type="text" />
                        </div>
                        <div>
                            <TagsInput v-model="tags" label="Tags" />
                        </div>
                        <div>
                            <ProfileUploader @imageFile="imgFile" />
                        </div>
                    </div>

                    <!-- Right Half -->
                    <div class="flex flex-col space-y-4 w-1/2">
                        <div>
                            <BaseInput v-model="cookingTime" label="Cooking Time (in min)" type="number" />
                        </div>
                        <div>
                            <ToggleSwitch v-model:checked="featured" label="Featured"></ToggleSwitch>
                            <hr class="my-2">
                        </div>
                        <!-- Ingredients -->
                        <div class="flex flex-row items-center justify-between mt-4">
                            <h3 class="text-2xl font-bold text-slate-500 capitalize">ingredients:</h3>
                            <BaseButton @click="addIngredient()" type="button" class="text-sm uppercase font-bold">Add
                            </BaseButton>
                        </div>
                        <div v-for="(input, index) in ingredients" :key="index">
                            <div class="flex flex-row items-center justify-between space-x-1">
                                <BaseInput v-model="input.name" label="Ingredient Name" type="text"
                                    :showlabel="false" />
                                <button @click="removeIngredient(index)" type="button"
                                    class="p-2.5 bg-red-400 text-white rounded translate-y-1">
                                    <Icons name="close"/>
                                </button>
                            </div>
                        </div> <!-- ./ingredients-->

                        <!-- Instructions -->
                        <div class="flex flex-row items-center justify-between mt-4">
                            <h3 class="text-2xl font-bold text-slate-500 capitalize">Instructions:</h3>
                            <BaseButton @click="addInstruction()" type="button" class="text-sm uppercase font-bold">Add
                            </BaseButton>
                        </div>
                        <div v-for="(input, index) in instructionFields" :key="index">
                            <div class="flex flex-row items-center justify-between space-x-1">
                                <BaseInput v-model="instructions[index]" label="Ingredient Name" type="text"
                                    :showlabel="false" />
                                <button @click="removeInstruction(index)" type="button"
                                    class="p-2.5 bg-red-400 text-white rounded translate-y-1">
                                    <Icons name="close"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> <!-- ./form -->
                <form @submit.prevent="handleSubmit" class="mt-6">
                    <BaseButton :disabled="state.isLoading">
                        Create
                    </BaseButton>
                </form>
            </div>
        </div>
    </Popup>
</template>

<script setup>
import Popup from '@/components/Popup.vue';
import Icons from '@/components/Icons.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import TagsInput from '@/components/TagsInput.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';
import ProfileUploader from '@/components/ProfileUploader.vue';
import getUser from '@/composables/getUser';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';

import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { ref, inject } from 'vue';

const { state, closePopup } = inject('store')
const { user } = getUser()
const { url, uploadImage } = useStorage()
const { error, addDocument } = useCollection('recipes')

const router = useRouter()

const title = ref('')
const description = ref('')
const cookingTime = ref('')
const featured = ref(false)
const tags = ref([])
const ingredients = ref([])
const instructionFields = ref(0)
const instructions = ref([])
const file = ref(null)

const imgFile = (imagefile) => {
    file.value = imagefile
}

const addIngredient = () => {
    ingredients.value.push({
        name: '',
        calorie: Math.floor(Math.random() * 90 + 10) //Two digit random number
    })
}
const removeIngredient = (index) => {
    ingredients.value.splice(index, 1)
}

const addInstruction = () => {
    instructionFields.value++
}
const removeInstruction = (index) => {
    instructions.value.splice(index, 1)
    instructionFields.value--
}

const handleSubmit = async () => {
    if (file.value && user.value) {
        state.isLoading = true
        let filePath = 'recipes/' + user.value.uid + '/' + file.value.name
        await uploadImage(file.value, filePath)

        const res = await addDocument({
            title: title.value,
            description: description.value,
            tags: tags.value,
            featured: featured.value,
            cookingTime: cookingTime.value,
            ingredients: ingredients.value,
            instructions: instructions.value,
            coverUrl: url.value,
            filePath: filePath,
            userId: user.value.uid,
            userEmail: user.value.email,
            createdAt: serverTimestamp()
        })
        if (!error.value) {
            console.log('recipe uploaded.')
            closePopup()
            router.push({ name: 'home' })
        }
        state.isLoading = false
    }
    // emptyFields()
}

const emptyFields = () => {
    title.value = ref('')
    description.value = ref('')
    tags.value = ref([])
    ingredients.value = ref([])
    instructions.value = ref([])
    file.value = ref(null)
}
</script>