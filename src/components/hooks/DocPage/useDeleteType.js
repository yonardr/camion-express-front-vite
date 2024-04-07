import axios from "axios";
import {ref} from "vue";

export const useDeleteType = async(init = {}) => await axios.delete(`${import.meta.env.VITE_APP_API_URL}/documents/types/id/${init.id}`)

