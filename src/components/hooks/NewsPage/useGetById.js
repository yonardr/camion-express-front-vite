import {onMounted, reactive, ref} from "vue";
import axios from "axios";

export function useGetById(init = {}) {
    const data = ref({})
    const fetch = async() =>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/news/${init.id}` )
            data.value = res.data
        }
        catch (e){
            console.error('Не удалось загрузить новость:', e)
        }
    }
    onMounted(fetch)
    return {data}
}