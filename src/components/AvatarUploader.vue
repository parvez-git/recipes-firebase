<template>
    <div class="relative inline-block overflow-hidden">
        <input @change="change" ref="filerefs" type="file" class="hidden" />
        <img v-if="previewImage" :src="previewImage" class="h-full w-full object-cover"
            alt="Current profile photo" />
        <div class="absolute inset-0 h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
            <button type="button" @click="browse()"
                class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200">
                <Icons name="camera" />
            </button>
            <button type="button" v-if="file" @click="remove()"
                class="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-white transition duration-200">
                <Icons name="close" />
            </button>
        </div>
    </div>
</template>

<script setup>
import Icons from "@/components/Icons.vue";
import { ref, inject } from 'vue'
const store = inject('store')

const props = defineProps({
    previewImg: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['input'])

const previewImage = ref(props.previewImg)
const filerefs = ref(null)
const file = ref(null)
const types = ['image/png', 'image/jpeg']

const browse = () => {
    filerefs.value.click();
}
const remove = () => {
    file.value = null
    previewImage.value = props.previewImg
}

const change = (e) => {
    const selectedFile = e.target.files[0]
    file.value = null

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
    emit('input', file.value)
}

</script>