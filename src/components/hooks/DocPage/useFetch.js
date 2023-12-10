import axios from "axios";
import {onMounted, ref} from "vue";
export function useFetchDocs(){
    const docs = ref([])
    const fetching = async() =>{
        try {
            const types = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents/types`)
            const all_docs = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents`)
            types.data.map(types=>{
                const obj = {id: types.id, type: types.name, obj: []}
                all_docs.data.map(item => {
                    if(item.type_id === types.id){
                        obj.obj.push(item)
                    }
                })
                docs.value.push(obj)
            })

        }
        catch(e){
            alert('Ошибка')
        }
    }
    onMounted(fetching)
    return {docs}
}