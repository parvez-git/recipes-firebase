import { ref, inject, watchEffect } from 'vue'
import { db } from '@/firebase'
import { doc, onSnapshot } from "firebase/firestore";

const getDocument = (collectionName, id) => {
    const document = ref(null)
    const error = ref(null)
    const store = inject('store')
    store.isLoading = true
    // console.log('top', store.isLoading)

    const unsub = onSnapshot(doc(db, collectionName, id), (doc) => {

        document.value = {
            id: doc.id,
            ...doc.data()
        }
        // console.log("Current single data: ", doc.data())
        // store.isLoading = false
        // console.log('last', store.isLoading)

    }, (err) => {
        document.value = null
        store.isLoading = false
        error.value = 'could not fetch the single data'

        console.log(err.message)
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    })

    return { error, document }
}

export default getDocument