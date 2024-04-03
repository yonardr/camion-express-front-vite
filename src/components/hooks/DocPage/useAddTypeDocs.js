import axios from "axios";
import {ref} from "vue";

export async function useAddTypeDocs(init = {}) {
    const result = ref(null)
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/documents/types`,{
            "name" : init.name
        } )
        result.value = res.data
    } catch (e) {
        alert('Ошибка')
    }
    return {result}
}