import axios from "axios";
import {ref} from "vue";
export async function useDeleteDoc(init = {}){
    const count = ref(0)
        try {
            const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/documents/id/${init.id.value}`)
            count.value = res.data
        }
        catch(e){
            alert('Ошибка')
        }

    return {count}
}