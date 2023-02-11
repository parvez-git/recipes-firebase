import { ref } from 'vue'
import { storage } from '@/firebase'
import {
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    ref as StorageReference
} from "firebase/storage"

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)

    const uploadImage = async (file, filePath) => {

        const storageRef = StorageReference(storage, filePath)

        try {
            await uploadBytesResumable(storageRef, file)

            await getDownloadURL(storageRef).then((downloadURL) => {
                url.value = downloadURL
            });

        } catch (err) {
            error.value = err.message
            console.log(err.message)
        }
    }

    const deleteImage = async (path) => {
        const desertRef = StorageReference(storage, path)

        try {
            await deleteObject(desertRef)
            
        } catch (err) {
            error.value = err.message
            console.log(err.message)
        }
    }

    return { error, url, uploadImage, deleteImage }
}

export default useStorage