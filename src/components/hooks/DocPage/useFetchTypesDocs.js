import { showToast } from '../../../toast.js'
import {onMounted, ref} from "vue";
import axios from "axios";

export function useFetchTypesDocs(){
    const types = ref([])
    const fetching = async() => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents/types`)
            types.value = res.data
        } catch (e) {
            showToast('Ошибка fuf', 'error')
        }
    }
    onMounted(fetching)
    return {types}
}
