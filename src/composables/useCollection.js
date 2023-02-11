import { ref, inject } from 'vue'
import { db } from '@/firebase'
import { addDoc, collection } from "firebase/firestore"

const useCollection = (collectionName) => {

    const error = ref(null)
    const store = inject('store')

    const addDocument = async (doc) => {
        error.value = null

        try {
            const res = await addDoc(collection(db, collectionName), doc)
            store.state.toast.push({ type: 'success', message: 'Document created successfully.'}) 
            return res
        }
        catch (err) {
            store.state.toast.push({ type: 'danger', message: 'Document could not be created!'})
            error.value = 'could not add document'
            console.log(err.message)
        }
    }

    return { error, addDocument }

}

export default useCollection