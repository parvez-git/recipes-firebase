import { ref, watchEffect, computed, inject } from 'vue'
import { db } from '@/firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const getCollection = (collectionName, queries) => {

    const items = ref(null)
    const error = ref(null)
    
    const store = inject('store')
    store.state.isLoading = false

    let collectionRefs = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
    if (queries) {
        collectionRefs = query(collectionRefs, where(...queries))
    }

    store.state.isLoading = true

    const unsub = onSnapshot(collectionRefs, (snap) => {
        let results = []

        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        });

        items.value = results
        error.value = null
        store.state.isLoading = false
    },
        (err) => {
            items.value = null
            error.value = 'could not fetch the data'
            store.state.isLoading = false
            console.log(err.message)
        })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub());
    });

    const totalItems = computed(() => {
        if (items.value) {
            return items.value.length
        }
        return 0;
    })

    return { error, items, totalItems }
}

export default getCollection