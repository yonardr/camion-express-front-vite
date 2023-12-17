import axios from "axios";

export const documentsModule = {
    state: () =>({
        docs : []
    }),
    actions: {
         async fetchDocs (ctx){
             const documents = []

                const types = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents/types`)
                const all_docs = await axios.get(`${import.meta.env.VITE_APP_API_URL}/documents`)
                types.data.map(types=>{
                    const obj = {id: types.id, type: types.name, obj: []}
                    all_docs.data.map(item => {
                        if(item.type_id === types.id){
                            obj.obj.push(item)
                        }
                    })
                    documents.push(obj)

                })
                ctx.commit('updateDocs', all_docs)
        }
    },
    mutations: {
        updateDocs(state, docs){
          state.docs = [1,5,6]
      }
    },
    getters:{
        ShowDocs(state){
            return state.docs
        }
    }
}