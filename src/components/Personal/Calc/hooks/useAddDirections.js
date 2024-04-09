import axios from "axios";

export async function useAddDirections(init = {}){
    try{
        const formData = new FormData()
        formData.append('file', init.file)
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/calculator/id/${init.id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'

                }
            })
        return res
    }
    catch(e){
        alert('Ошибка добавления направлений')
    }
}