<template>
    <div class="absolute right-[50%] top-[50%] translate-x-[80%] translate-y-[-60%]">
        <div class="flex flex-col items-center justify-center w-96 h-96">
            <img src="@/assets/404.jpg" alt="404 - page not found!">
            <h2 class="my-8 text-xl text-gray-500">Opps.. Page Not Found!</h2>
            <RouterLink :to="{ name: 'home' }">
                <BaseButton>Go to Home</BaseButton>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
</script>