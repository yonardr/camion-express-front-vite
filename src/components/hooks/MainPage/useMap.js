import axios from 'axios'
import {ref, onMounted} from 'vue'

export function useMap(){
    const cars = ref([])
    const fetching = async (retries = 2) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/trucks`)
            cars.value = response.data;
        }
        catch (e) {
            // не блокируем пользователя alert'ом: при флаки-сбое пробуем ещё раз, иначе просто без машин на карте
            if (retries > 0) {
                setTimeout(() => fetching(retries - 1), 1500)
            } else {
                console.error('Не удалось загрузить машины для карты (/trucks):', e)
            }
        }
    }


    onMounted(() => fetching())
    return {cars}
}