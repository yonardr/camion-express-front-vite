import axios from "axios";
import {ref} from "vue";

export async function useCalcGetDirection(init = {}) {
    try{
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/direction/id/${init.id}`)
        return res.data
    }
    catch (e){
        console.log(`На №${init.id} направлении возникла ошибка`)
    }
}