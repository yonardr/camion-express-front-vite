import {onMounted, reactive, ref} from "vue";
import axios from "axios";

export function useGetById(init = {}) {
    const data = ref({})
    try{
        const fetch = async() =>{
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/news/${init.id}` )
            data.value = res.data
        }
        onMounted(fetch)
    }
    catch (e){
        alert('Ошибка')
    }
    return {data}
}