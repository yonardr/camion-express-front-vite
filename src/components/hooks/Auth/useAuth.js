import axios from "axios";
import {ref} from "vue";
export async function useAuth(init = {}){
    const jwt = ref([])
    {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
                login: init.login.value,
                password: init.password.value
            })
            jwt.value = res.data.token
        }
        catch (e){ jwt.value = false}
    }
    return {jwt}
}