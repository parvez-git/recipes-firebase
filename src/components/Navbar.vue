<template>
    <div class="h-[10%] flex flex-row items-center justify-between relative">
        <!-- logo overlay -->
        <span class="absolute left-14 top-0 w-[276px] h-[400px] bg-slate-800"></span>

        <div class="h-full flex flex-row items-center justify-between space-x-8 z-10">
            <div class="w-6 text-slate-800 hover:text-slate-500 cursor-pointer">
                <Icons name="breadcumb" />
            </div>
            <div class="px-16">
                <RouterLink :to="{ name: 'home' }" class="font-bold text-2xl lowercase text-slate-50">
                    foodrecipes
                </RouterLink>
            </div>
        </div>
        <div class="flex flex-row items-center justify-between space-x-8">
            <!-- Menu -->
            <MenuMain />

            <div class="block">
                <div v-if="user" class="w-8 h-8 relative group">
                    <img v-if="user?.photoURL" :src="user?.photoURL"
                        class="w-full h-full object-cover p-1 rounded-full cursor-pointer focus:outline-none"
                        alt="profile-pic">
                    <span v-else
                        class="bg-blue-100 w-full h-full p-1 rounded-full text-base text-slate-500 font-bold uppercase flex items-center justify-center cursor-pointer">
                        {{ user?.email.charAt(0) }}
                    </span>
                    <div
                        class="absolute right-0 top-6 w-64 opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 -z-30 group-hover:z-30 transition duration-200 ease-linear">
                        <div class="pt-5 bg-transparent">
                            <div
                                class="divide-y p-4 text-sm text-slate-600 bg-slate-100 flex flex-col flex-wrap justify-center rounded-sm shadow-md">
                                <div class="flex flex-col pb-2">
                                    <span>Signed in as</span>
                                    <span class="text-slate-700 italic">{{ user?.email }}</span>
                                </div>
                                <RouterLink :to="{ name: 'profile' }" class="py-2">Profile</RouterLink>
                                <button @click="store.openCreateRecipePopup()"
                                    class="py-2 text-left hover:text-slate-800">Create
                                    Recipe</button>
                                <button @click="handleLogout()"
                                    class="pt-2 text-left hover:text-slate-800">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- login icon button -->
                <button v-else @click="store.openLogin()"
                    class="flex items-center justify-center h-full w-full bg-slate-200 text-slate-600 rounded-full p-1 border-2 cursor-pointer">
                    <Icons name="login" />
                </button>
            </div>
        </div>
    </div> <!-- ./navbar -->
    <Login :show="store.state.isLoginOpen"></Login>
    <CreateRecipe :show="store.state.isCreateRecipeOpen"></CreateRecipe>
</template>

<script setup>
import MenuMain from '@/components/MenuMain.vue';
import Icons from '@/components/Icons.vue';
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import Login from '@/views/Login.vue';
import CreateRecipe from '@/views/CreateRecipe.vue';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const store = inject('store');
const router = useRouter();
const { user } = getUser();
const { logout } = useLogout();

const handleLogout = async () => {
    await logout()
    router.push({ name: 'home' })

    console.log('user logged out')
}
</script>