import axios from "axios";

export async function useAddPointA(init = {}){
    try{
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/calculator/point_a/${init.name}`)
        return res.status
    }
    catch (e){
        alert('Ошибка при добавлении отправной точки')
    }
}