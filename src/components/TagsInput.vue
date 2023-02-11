<template>
    <label for="label" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">{{ label }}</label>
    <div class="relative">
        <input 
            v-model="newTag" 
            type="text" 
            :list="id" 
            autocomplete="off" 
            @keydown.enter="addTag(newTag)"
            @keydown.prevent.tab="addTag(newTag)" 
            @keydown.delete="newTag.length || removeTag(tags.length - 1)"
            class="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-slate-400 dark:focus:border-slate-400 focus:ring-slate-400 focus:outline-none focus:ring focus:ring-opacity-40"
            :style="{ 'padding-left': `${paddingLeft}px` }" 
        />

        <ul ref="tagsUl" class="absolute max-w-[80%] flex items-center gap-2 top-0 bottom-0 left-2 list-none overflow-x-auto overscroll-y-none">
            <li v-for="(tag, index) in tags" :key="tag" 
                class="bg-red-500 px-1 py-px rounded text-white text-sm whitespace-nowrap transition-colors duration-100 ease-linear" 
                :class="{ duplicate: tag === duplicate }">
                    {{ tag }}
                <button 
                    @click="removeTag(index)"
                    class=" text-white bg-red-600 p-px rounded-sm border-none outline-none cursor-pointer" >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
const props = defineProps({
    label: { 
        type: String, 
        default: "" 
    },
    modelValue: { 
        type: Array, 
        default: () => [] 
    },
})
const emit = defineEmits(['update:modelValue'])

// Tags
const tags = ref(props.modelValue);
const newTag = ref("");
const id = Math.random().toString(36).substring(7);

const addTag = (tag) => {
    if (!tag) return;
    // return early if duplicate
    if (tags.value.includes(tag)) {
        handleDuplicate(tag);
        return;
    }
    tags.value.push(tag);
    newTag.value = "";
};
const removeTag = (index) => {
    tags.value.splice(index, 1);
};

// handling duplicates
const duplicate = ref(null);
const handleDuplicate = (tag) => {
    duplicate.value = tag;
    setTimeout(() => (duplicate.value = null), 1000);
    newTag.value = "";
};

// positioning and handling tag change
const paddingLeft = ref(10);
const tagsUl = ref(null);
const onTagsChange = () => {
    // position cursor
    const extraCushion = 15;
    paddingLeft.value = tagsUl.value.clientWidth + extraCushion;
    // scroll to end of tags
    tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0);
    // emit value on tags change
    emit("update:modelValue", tags.value);
};
watch(tags, () => nextTick(onTagsChange), { deep: true });
onMounted(onTagsChange);

</script>



<style scoped>
@keyframes shake {

    10%,
    90% {
        transform: scale(0.9) translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: scale(0.9) translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: scale(0.9) translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: scale(0.9) translate3d(4px, 0, 0);
    }
}
.duplicate {
    background: rgb(235, 27, 27);
    animation: shake 1s;
}
</style>