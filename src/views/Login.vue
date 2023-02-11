<template>
    <Popup>
        <h2 class="text-3xl font-bold text-center uppercase text-gray-700 dark:text-white">Login</h2>

        <form @submit.prevent="handleSubmit">
            <div class="mt-6">
                <BaseInput v-model="email" label="Email" type="email" />
            </div>

            <div class="mt-6">
                <BaseInput v-model="password" label="Password" type="password" />
            </div>

            <BaseError :msg="error"></BaseError>

            <div class="mt-6">
                <BaseButton :disabled="isLoading" class="w-full">
                    Sign In
                </BaseButton>
            </div>
        </form>
    </Popup>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseError from '@/components/BaseError.vue'
import Popup from '@/components/Popup.vue'
import useLogin from '@/composables/useLogin'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
const { closePopup } = inject('store')
const router = useRouter()
const { error, login, isLoading } = useLogin()
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
    const res = await login(email.value, password.value)
    if (!error.value) {
        closePopup()
        router.push({ name: 'home' })
        console.log('user loged in')
    }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease-out;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}

.slidefade-enter-active {
    transition: all 0.25s ease;
}

.slidefade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.slidefade-enter,
.slidefade-leave-to {
    transform: scale(0.95);
    opacity: 0;
}
</style>