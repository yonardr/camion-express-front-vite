import { showToast } from '../../../toast.js'
import axios from "axios";
import {ref} from "vue";
export async function useDeleteDoc(init = {}){
    const count = ref(null)
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/documents/id/${init.id.value}`)
            count.value = res.data
        }
        catch(e){
            showToast('Ошибка', 'error')
        }

    return {count}
}