<template>
    <div class="flex items-center space-x-6">
        <div class="shrink-0">
            <img v-if="previewImage" class="h-16 w-16 object-cover rounded-full" :src="previewImage"
                alt="Current profile photo" />
            <div v-else class="bg-blue-200 w-16 h-16 rounded-full text-xs text-center flex flex-wrap items-center justify-center p-2">No Image</div>
        </div>
        <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input @change="handleChange" type="file" class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-100 file:text-violet-700
                hover:file:bg-violet-200
            " />
        </label>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const store = inject('store')

const props = defineProps({
    previewImg: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['imageFile'])

const file = ref(null)
const previewImage = ref(props.previewImg)
const types = ['image/png', 'image/jpeg']

const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    
    if (selectedFile && types.includes(selectedFile.type)) {
        file.value = selectedFile

        let reader = new FileReader
        reader.onload = (e) => {
            previewImage.value = e.target.result
        }
        reader.readAsDataURL(selectedFile)
    } else {
        file.value = null
        store.state.toast.push(
            {
                type: 'danger',
                message: 'Please select an image file (png or jpeg).'
            }
        )
    }
    // Emits
    emit('imageFile', file.value)
}

</script>