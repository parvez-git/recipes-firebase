import { ref, inject } from 'vue'
import { db } from '@/firebase'
import { doc, getDoc } from "firebase/firestore"

const getDocument = (collectionName, id) => {
    const post = ref({})
    const error = ref(null)

    const store = inject('store')
    store.isLoading = true
    // console.log('top', store.isLoading)

    const load = async () => {
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                post.value = {
                    id: docSnap.id,
                    ...docSnap.data()
                }
                // console.log("Document data:", docSnap.data());
            } else {
                error.value = "No such document!"
                console.log("No such document!");
            }

        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { post, error, load }
}

export default getDocument