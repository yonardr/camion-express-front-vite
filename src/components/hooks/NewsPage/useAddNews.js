import axios from "axios";
import {ref} from "vue";

export async function useAddNews(init = {}) {
    const result = ref(undefined)
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

        // init.files.value.map((item, index) => {
        //     formData.append(`images`, item)
        // })

        for (let i = 0; i < init.files.value.length; i++) {
            let file = init.files.value[i];
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

        result.value = res.data
    }
    catch (e) {
        alert('Ошибка')
    }
    return {result}
}