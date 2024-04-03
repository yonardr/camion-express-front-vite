import axios from "axios";
import {watch} from "vue";

export const documentsModule = {
    state: {
        docs: [],
    },
    actions: {
        async fetchDocs(ctx) {
            const types = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents/types`)
            const all_docs = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents`)
            ctx.commit('updateDocs', {types, all_docs})
        },
    },
    mutations: {
        updateDocs(state, data) {
            const docs = []
            data.types.data.map(types=>{
                const obj = {id: types.id, type: types.name, obj: []}
                data.all_docs.data.map(item => {
                    if(item.type_id === types.id){
                        obj.obj.push(item)
                    }
                })
                docs.push(obj)
            })
            state.docs = docs
        },
    },
    getters: {
        getDocs(state) {
            return state.docs
        },

    }
}