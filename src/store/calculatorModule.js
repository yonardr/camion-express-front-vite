import axios from "axios";

export const calculatorModule = {
    state: {
        point_a : [],
        directions: [],
        direction_info: {},
        packaging:{
            rigid_packaging: false,
            palletizing: false,
            bubble_wrap: false,
        }
    },
    actions: {
        async fetchPoints_a (ctx){
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/points_a`)
            ctx.commit('updatePoint_a', res.data)
        },
        async fetchDirections(ctx, inputData){
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/id/${inputData.id}`)
            ctx.commit('updateDirections', res.data)
        },
        async fetchDirectionById(ctx, inputData){
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/direction/id/${inputData.id_direction}`)
            ctx.commit('updateDirectionById', res.data)
        }
    },
    mutations: {
        updatePoint_a(state, data){
            state.point_a = data
        },
        updateDirections(state, data){
            state.directions = data
        },
        updateDirectionById(state, data){
            state.direction_info = data
        },
        updatePacking(state, change_key){
            if(state.packaging[change_key]) state.packaging[change_key] = false
            else{
                for(const key of Object.keys(state.packaging)){
                    state.packaging[key] = false
                }
                state.packaging[change_key] = true
            }
        }
    },
    getters:{
        getPoints_a(state){
            return state.point_a;
        },
        getDirections(state){
            return state.directions
        },
        getDirectionById(state){
            return state.direction_info
        },
        getPacking(state){
            return state.packaging
        }
    }
}