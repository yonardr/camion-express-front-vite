import axios from "axios";

export const newsModule = {
    state: {
      news: []
    },
    getters:{
        getNews(state){
            return state.news
        }
    },
    actions: {
        async fetchNews(ctx){
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/news`)
            ctx.commit('updateNews', res.data)
        }
    },
    mutations: {
        updateNews(state, news){
            state.news = news
        }
    }
}