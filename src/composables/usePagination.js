import { computed, ref } from 'vue'
import { db } from '@/firebase'
import { collection, query, orderBy, startAfter, startAt, limit, getDocs } from 'firebase/firestore'

const usePagination = (collectionName, perPage = 5) => {

    const items = ref([])
    const error = ref(null)
    const isFetching = ref(false)

    const pagination = ref({
        itemCount: perPage,
        lastItem: null,
        paginationHistory: [],
        page: 1
    })

    const collectionRefs = collection(db, collectionName)

    const documents = async () => {
        try {
            isFetching.value = true

            const queryRefs = query(
                collectionRefs,
                orderBy("createdAt", "desc"),
                limit(pagination.value.itemCount)
            )
            const docSnapshots = await getDocs(queryRefs)
            isFetching.value = false

            items.value = docSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            pagination.value.lastItem = docSnapshots.docs[docSnapshots.docs.length - 1]
            pagination.value.paginationHistory.push(docSnapshots.docs[0])

        } catch (err) {
            console.log(err.message)
            document.value = null
            error.value = 'could not fetch the data items'
        }
    }

    const next = async () => {

        isFetching.value = true

        if (pagination.value.paginationHistory.length === pagination.value.itemCount) {
            isFetching.value = false
            return
        }

        const queryRefs = query(
            collectionRefs,
            orderBy("createdAt", "desc"),
            startAfter(pagination.value.lastItem),
            limit(pagination.value.itemCount)
        )
        const docSnapshots = await getDocs(queryRefs)

        isFetching.value = false
        if (docSnapshots.docs.length === 0) { return }

        items.value = docSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        pagination.value.lastItem = docSnapshots.docs[docSnapshots.docs.length - 1]
        pagination.value.paginationHistory.push(docSnapshots.docs[0])
    }

    const prev = async () => {
        const lastItemIndex = (pagination.value.paginationHistory.length - 1)
        const previousItem = pagination.value.paginationHistory[lastItemIndex - 1]

        if (!previousItem) {
            isFetching.value = false
            return
        }
        if (isFetching.value) { return }
        isFetching.value = true

        pagination.value.paginationHistory.splice(lastItemIndex, 1)

        const queryRefs = query(
            collectionRefs,
            orderBy("createdAt", "desc"),
            startAt(previousItem),
            limit(pagination.value.itemCount)
        )

        const docSnapshots = await getDocs(queryRefs)

        isFetching.value = false
        if (docSnapshots.docs.length === 0) { return }

        items.value = docSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        pagination.value.lastItem = docSnapshots.docs[docSnapshots.docs.length - 1]
    }

    const page = computed(() => {
        if (!pagination.value.paginationHistory) {
            return 1
        }
        return pagination.value.paginationHistory.length
    })

    return { error, documents, items, next, prev, isFetching, page }
}

export default usePagination