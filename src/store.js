import { ref, reactive } from 'vue'

const name = ref("parvez alam")

const state = reactive({
    isLoading: false,
    toast: [],
    randomNumber: Math.random().toString().slice(2,11),
    isLoginOpen: false,
    isCreateRecipeOpen: false,
    isModalOpen: false,
})

const closePopup = () => {
    state.isLoginOpen = false
    state.isCreateRecipeOpen = false
    state.isModalOpen = false
}

const openLogin = () => {
    state.isLoginOpen = true
}

const openCreateRecipePopup = () => {
    state.isCreateRecipeOpen = true
}

const openModal = () => {
    state.isModalOpen = true
}

export default {
    state,
    name,
    openLogin,
    openCreateRecipePopup,
    openModal,
    closePopup
}
