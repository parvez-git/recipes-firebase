<template>
    <nav class="flex flex-row space-x-8 font-semibold capitalize text-slate-800 text-sm">
        <router-link :to="{ name: 'home' }" class="hover:text-slate-600 transition-colors">
            Home
        </router-link>
        <router-link :to="{ name: 'featured' }" class="hover:text-slate-600 transition-colors">
            Features
        </router-link>
        <router-link :to="{ name: 'recipes' }" class="hover:text-slate-600 transition-colors">
            Recipes
        </router-link>
        <router-link :to="{ name: 'about' }" class="hover:text-slate-600 transition-colors">
            Hotline
        </router-link>
    </nav>
</template>