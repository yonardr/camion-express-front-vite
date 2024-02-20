import axios from "axios";

export const calculatorModule = {
    state: {
        current_cargo: 1,
        cargo: [],
        point_a : [],
        directions: [],
        direction_info: {},
        packaging:{
            pallet_board: false,
            pallet: false,
            wooden: false,
            stretch_film: false
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
                    if(key !== 'stretch_film') state.packaging[key] = false
                }
                state.packaging[change_key] = true
            }
        },
        AddCargo(state, data){
            state.cargo.push(data)
        },
        RemoveCargoById(state, id){
            state.cargo = state.cargo.filter((item)=> item.id !== id)
        },
        UpdateCargoById(state, object ){
          state.cargo.map((value, index) =>{
              if(value.id === state.current_cargo) state.cargo[index] = object
          } )
        },
        ClearCargo(state){
            state.cargo = []
        }
    },
    getters:{
        getCurrentCargo(state){
          return state.current_cargo
        },
        getAllCargo(state){
            return state.cargo;
        },
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