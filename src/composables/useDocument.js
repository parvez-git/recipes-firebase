import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ref, inject } from "vue";

const useDocument = (collectionName, id) => {
    
    const error = ref(null)

    const store = inject('store')
    store.state.isLoading = false

    const deleteDocument = async () => {
        try {
            store.state.isLoading = true
            const res = await deleteDoc(doc(db, collectionName, id))
            store.state.isLoading = false
            store.state.toast.push({ type: 'success', message: 'Document deleted successfully.'}) 
            
        } catch (err) {
            store.state.isLoading = false
            store.state.toast.push({ type: 'danger', message: 'Document could not be deleted!'})
            error.value = 'could not delete document'

            console.log(err.message)
        }
    }

    const updateDocument = async (updates) => {
        try {
            store.state.isLoading = true
            const res = await updateDoc(doc(db, collectionName, id), updates)
            store.state.isLoading = false
            store.state.toast.push({ type: 'success', message: 'Document updated successfully.'})
            return res
        } catch (err) {
            store.state.isLoading = false
            store.state.toast.push({ type: 'danger', message: 'Document could not be updated!'})
            error.value = 'could not update document'

            console.log(err.message)
        }
    }

    return { error, deleteDocument, updateDocument }
}

export default useDocument