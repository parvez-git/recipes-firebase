<template>
    <nav
        class="top-0 left-0 absolute flex flex-row-reverse justify-center items-center gap-x-8 h-full uppercase text-slate-800 text-xs tracking-widest -rotate-90">
        <RouterLink :to="{ name: 'featured' }" class="hover:text-slate-600 transition-colors">Features</RouterLink>
        <RouterLink :to="{ name: 'recipes' }" class="hover:text-slate-600 transition-colors">Recipes</RouterLink>
        <RouterLink :to="{ name: 'about' }" class="hover:text-slate-600 transition-colors">Hotline</RouterLink>
    </nav>
</template>