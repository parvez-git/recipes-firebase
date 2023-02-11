<template>
    <div class="antialiased font-poppins bg-blue-50 h-screen w-full py-[4%]">
        <header class="max-w-6xl h-full bg-white mx-auto px-8 shadow">
            <!-- Navbar -->
            <Navbar />
            <!-- Vertical Menu -->
            <MenuMobile />

            <!-- Slider -->
            <div class="relative h-[80%] w-full flex">
                <router-view></router-view>
            </div> <!-- ./slider -->

            <!-- Footer -->
            <Footer />
        </header>
    </div>
    <!-- toast -->
    <Toast />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import MenuMobile from '@/components/MenuMobile.vue';
import Footer from '@/components/Footer.vue';
import Toast from '@/components/Toast.vue';
// import { inject } from 'vue';
// const { state } = inject('store');
</script>
