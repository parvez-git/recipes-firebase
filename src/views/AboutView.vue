<template>
  <div class="flex flex-row items-center justify-end bg-blue-200">
    <div class="w-full block p-6 justify-">

      <div class="flex flex-row items-center justify-between space-x-4 p-10">
        <h1 class="text-2xl drop-shadow-sm capitalize">Tailwind group-hover with transition</h1>
        <div class="relative inline-block group">
          <button class="inline-flex w-24 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">dropdown</button>
          <div class="absolute right-0 origin-top-right w-64 -z-30 group-hover:z-30 opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 transition duration-200 ease-linear focus:outline-none">
            <div class="pt-4 bg-transparent">
              <div class="p-4 bg-white rounded-md shadow-lg flex-col space-y-2 divide-y">
                <a href="#">Lorem ipsum dolor sit amet.</a>
                <a href="#">Lorem ipsum dolor sit amet.</a>
                <a href="#">Lorem ipsum dolor sit amet.</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// import { inject, onMounted } from "vue";
// import Spinner from '@/components/Spinner.vue';
// import getDocument from '@/composables/getDocument3';
// import BaseButton from "@/components/BaseButton.vue";
</script>
