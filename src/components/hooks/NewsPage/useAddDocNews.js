import { showToast } from '../../../toast.js'
import axios from "axios";
import {ref} from "vue";

export async function useAddDocNews(init = {}) {
    const resultDocs = ref(undefined)
    try {
        const formDataDocs = new FormData()

        for (let i = 0; i < init.files.value.length; i++) {
            let file = init.files.value[i];
            formDataDocs.append(`name[${i}]`, file.name)
            formDataDocs.append('docs', file);


        }
        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/news/${init.id}`,
            formDataDocs,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        resultDocs.value = res.data
    } catch (e) {
        showToast('Ошибка', 'error')
    }
    return {resultDocs}
}