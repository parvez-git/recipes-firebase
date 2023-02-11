import { ref } from 'vue'
import { auth } from '@/firebase'

const user = ref(auth.currentUser)

auth.onAuthStateChanged( _user => {

    user.value = _user

    console.log('User state change. Current user:', _user)
});

const useUser = () => {
    return { user }
}

export default useUser