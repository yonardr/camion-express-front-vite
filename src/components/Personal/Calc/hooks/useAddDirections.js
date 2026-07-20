import axios from "axios";

// replace=true -> заменить все направления базы (снести старые + залить), иначе добавить к существующим.
export async function useAddDirections(init = {}){
    try{
        const formData = new FormData()
        formData.append('file', init.file)
        const path = init.replace
            ? `/calculator/id/${init.id}/replace`
            : `/calculator/id/${init.id}`
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}${path}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        return {ok: true, data: res.data}
    }
    catch(e){
        const message = e?.response?.data?.message || e?.message || 'неизвестная ошибка'
        return {ok: false, error: message}
    }
}
