import axios from "axios";

export async function useDeletePointA(init = {}){
    try{
        const res = await axios.delete(`${import.meta.env.VITE_APP_API_URL}/calculator/id/${init.id}`)
        return res.data
    }
    catch (e){
        alert('Ошибка при удалении')
    }
}