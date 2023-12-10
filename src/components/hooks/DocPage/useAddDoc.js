import axios from "axios";

export async function useAddDoc(init ={}){
    try{
        const formData = new FormData()
        formData.append('name', init.name)
        formData.append('type_id', init.type)
        formData.append('file', init.file)
        console.log(init.file)
        if(init.name && init.name.trim() !== '') formData.append('keep_name', true)
        else formData.append('keep_name', false)
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/documents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        })
        console.log(res.data)
    }
    catch (e){
        alert('Ошибка')
    }
}