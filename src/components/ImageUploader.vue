<template>
    <div class="block">
        <input type="file" @change="handleChange">
        <div v-if="previewImage" class="w-64 h-32 block bg-no-repeat bg-center bg-contain"
            :style="{ 'background-image': `url(${previewImage})` }">
        </div>
        <BaseError :msg="fileError" />
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import BaseError from '@/components/BaseError.vue'
const store = inject('store')

const props = defineProps({
    previewImg: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['imageFile'])

const file = ref(null)
const fileError = ref(null)
const previewImage = ref(null)

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

        fileError.value = null
    } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpeg).'
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