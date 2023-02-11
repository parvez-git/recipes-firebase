<template>
    <Spinner v-if="state.isLoading"/>
    <div v-if="document" class="flex flex-row items-center justify-center">
        <div v-if="imgurl"
            class="w-[310px] h-[310px] rounded-full mx-10 overflow-hidden bg-gray-800 border-[20px] border-gray-900 shadow-xl">
            <img :src="imgurl" class="w-full shrink-0 h-full object-cover">
        </div>
        <div class="flex-1 flex flex-col h-full mt-10">
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
                    <div class="block w-20 h-20 overflow-hidden">
                        <AvatarUploader 
                            v-if="imgurl" 
                            :previewImg="imgurl" 
                            @input="imgFile"
                        />
                    </div>
                    <form @submit.prevent="handleSubmit" class="inline-block mt-6">
                        <BaseButton :disabled="state.isLoading">Update Recipe</BaseButton>
                    </form>
                </div>
                <!-- Right Half -->
                <div class="flex flex-col space-y-4 w-1/2">
                    <DynamicInput :items="ingredients" items-heading="Ingredients:" placeholder="ingredient" />
                    <DynamicInputArr :items="instructions" items-heading="Instructions:" placeholder="instruction" />
                </div>
            </div> <!-- ./container-->
        </div>
    </div>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import TagsInput from '@/components/TagsInput.vue';
import DynamicInput from "@/components/DynamicInput";
import DynamicInputArr from '@/components/DynamicInputArr.vue';
import AvatarUploader from '@/components/AvatarUploader.vue';
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router'
import { ref, watch, inject } from 'vue'

const props = defineProps({
    id: String
});

const router = useRouter()
const { user } = getUser()
const { state, closePopup } = inject('store')
const { error, document } = getDocument('recipes', props.id);
const { updateDocument } = useDocument('recipes', props.id);
const { url, deleteImage, uploadImage } = useStorage()

const title = ref('')
const description = ref('')
const tags = ref([])
const ingredients = ref([])
const instructions = ref([])
const imgurl = ref(null)
const file = ref(null)
const filePath = ref(null)

watch(document, (recipe) => {
    title.value = recipe.title
    description.value = recipe.description
    imgurl.value = recipe.coverUrl
    filePath.value = recipe.filePath
    tags.value.push(...recipe.tags)
    ingredients.value.push(...recipe.ingredients)
    instructions.value.push(...recipe.instructions)
})

const imgFile = (imagefile) => {
    file.value = imagefile
}

const handleSubmit = async () => {
    if (user.value) {
        state.isLoading = true

        if (file.value) {
            await deleteImage(filePath.value)

            let newfilePath = 'recipes/' + user.value.uid + file.value.name
            await uploadImage(file.value, newfilePath)

            imgurl.value = url.value
            filePath.value = newfilePath
        }

        const res = await updateDocument({
            title: title.value,
            description: description.value,
            tags: tags.value,
            ingredients: ingredients.value,
            instructions: instructions.value,
            coverUrl: imgurl.value,
            filePath: filePath.value,
        })
        state.isLoading = false

        if (!error.value) {
            console.log('recipe updated.')
            closePopup()
            router.push({
                name: 'recipe-details',
                params: { id: props.id }
            })
        }
    }
}

</script>