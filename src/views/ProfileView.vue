<template>
    <Spinner v-if="state.isLoading" />
    <div v-else class="flex flex-row items-center justify-center">
        <div class="w-[310px] h-[310px] mx-10 overflow-hidden">
            <div class="px-20 text-white text-center">
                <div v-if="user?.photoURL" class="my-4">
                    <img :src="user?.photoURL" class="shrink-0 w-full h-full object-cover rounded">
                </div>
                <h2 class="text-xs">Name: {{ user?.displayName }}</h2>
                <h2 class="text-xs italic">{{ user?.email }}</h2>
                <div class="my-4">
                    <button @click="(updatepassword = !updatepassword)" type="button"
                        class="bg-gray-900 px-3 py-2 text-xs text-white uppercase rounded-full">Update Password</button>
                </div>
            </div>
        </div>
        <form v-if="!updatepassword" @submit.prevent="handleSubmit" class="flex-1 flex flex-col space-y-8 h-full mt-10">
            <h2 class="text-xl text-gray-800 font-bold uppercase">Update Profile:</h2>
            <ProfileUploader @imageFile="imgFile" />
            <div>
                <BaseInput v-model="displayName" label="Display Name:" type="text" />
            </div>
            <div>
                <BaseButton>Update Profile</BaseButton>
            </div>
        </form>
        <form v-else @submit.prevent="handlePassword" class="flex-1 flex flex-col space-y-8 h-full mt-10">
            <h2 class="text-xl text-gray-800 font-bold uppercase">Update Password:</h2>
            <div>
                <BaseInput v-model="newPassword" label="New Password:" type="password" />
            </div>
            <div>
                <BaseButton>Update Password</BaseButton>
            </div>
        </form>

    </div>
</template>

<script setup>
import Spinner from '@/components/Spinner.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import ProfileUploader from '@/components/ProfileUploader.vue';
import useStorage from '@/composables/useStorage';
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';
import { updateProfile, updatePassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { ref, inject } from 'vue';

const router = useRouter()
const { user } = getUser()
const { state } = inject('store')
const { url, uploadImage } = useStorage()
const { logout } = useLogout();

const updatepassword = ref(false)

const newPassword = ref(null)
const displayName = ref(null)
const phoneNumber = ref(null)
const file = ref(null)

const imgurl = ref(null)
const filePath = ref(null)

const imgFile = (imagefile) => {
    file.value = imagefile
}

const handleSubmit = async () => {
    if (user.value) {
        state.isLoading = true

        if (file.value) {
            let newfilePath = 'profile/' + user.value.uid + '.' + file.value.name.split('.').pop()
            await uploadImage(file.value, newfilePath)

            imgurl.value = url.value
            filePath.value = newfilePath
        }

        updateProfile(auth.currentUser, {
            displayName: displayName.value,
            phoneNumber: phoneNumber.value,
            photoURL: imgurl.value
        }).then(() => {
            state.isLoading = false
            router.push({ name: 'profile' })
            state.toast.push(
                {
                    type: 'success',
                    message: 'Profile updated successfully.'
                }
            )
            console.log('profile updated.')
        }).catch((error) => {
            state.isLoading = false
            console.log('Error:', error)
        })
    }
}

const handlePassword = () => {
    if (user.value) {
        updatePassword(auth.currentUser, newPassword.value).then(async () => {
            state.toast.push(
                {
                    type: 'success',
                    message: 'Profile updated successfully.'
                }
            )
            await logout()
            router.push({ name: 'home' })
        }).catch((error) => {
            state.toast.push(
                {
                    type: 'danger',
                    message: 'Problem in update password!'
                }
            )
            console.log('Error:', error)
        })
    }
}
</script>