import {onMounted, ref} from "vue";
import axios from "axios";

export async function useDelNews(init = {}) {
    const data = ref([])
    try {
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/news/${init.id}`)
        data.value = res.data
    } catch (e) {
        alert('Ошибка')
    }
    return {data}
}