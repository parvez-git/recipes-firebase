import { ref, inject } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs, query, limit } from 'firebase/firestore'

const getDocuments = (collectionName, itemCount = 5) => {

    const items = ref([])
    const error = ref(null)

    const store = inject('store')
    store.state.isLoading = false
    
    const collectionRefs = collection(db, collectionName)
    
    const documents = async () => {
        try {
            store.state.isLoading = true

            const queryRefs = query(collectionRefs, limit(itemCount))
            const docSnapshots = await getDocs(queryRefs)

            store.state.isLoading = false
            items.value = docSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            
        } catch (err) {
            store.state.isLoading = false
            error.value = 'could not fetch the data items'
            console.log(err.message)

        }
    }

    return { error, documents, items }
}

export default getDocuments