import axios from "axios";
import {ref} from "vue";

export async function useAddNews(init = {}) {
    const resultNews = ref(null)
    try {
        const formData = new FormData()
        formData.append('title', init.title.value)
        formData.append('description', init.description.value)
        init.addressArray.value.map((item, index) => {
            formData.append(`address[${index}]`, item)
        })

        init.contactsArray.value.map((item, index) => {
            formData.append(`contacts[${index}]`, item)
        })

        for (let i = 0; i < init.images.value.length; i++) {
            let file = init.images.value[i];
            formData.append('images', file);

        }

        const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/news`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        resultNews.value = res.data
    }
    catch (e) {
        alert('Ошибка')
    }
    return {resultNews}
}