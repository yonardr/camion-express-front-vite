import axios from "axios";
import {watch} from "vue";

export const calculatorModule = {
    state: {
        current_cargo: 1,
        cargo: [{id: 1, places: [{idArray: 1}]}],
        point_a: [],
        directions: [],
        direction_info: {},
        packaging: {
            pallet_board: false,
            pallet: false,
            wooden: false,
            stretch_film: false
        },
    },
    actions: {
        async fetchPoints_a(ctx) {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/points_a`)
            ctx.commit('updatePoint_a', res.data)
        },
        async fetchDirections(ctx, inputData) {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/id/${inputData.id}`)
            ctx.commit('updateDirections', res.data)
        },
        async fetchDirectionById(ctx, inputData) {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/calculator/direction/id/${inputData.id_direction}`)
            ctx.commit('updateDirectionById', res.data)
        },
    },
    mutations: {
        updatePoint_a(state, data) {
            state.point_a = data
        },
        updateDirections(state, data) {
            state.directions = data
        },
        updateDirectionById(state, data) {
            state.direction_info = data
        },
        updatePacking(state, change_key) {
            if (state.packaging[change_key]) state.packaging[change_key] = false
            else {
                for (const key of Object.keys(state.packaging)) {
                    if (key !== 'stretch_film') state.packaging[key] = false
                }
                state.packaging[change_key] = true
            }
        },
        AddCargo(state) {
            state.cargo.push({
                id: state.cargo.length + 1,
                point_a: state.direction_info.point_a[0].name,
                point_b: state.direction_info.point_b[0].name,
                direction_id: state.direction_info.id,
                places: [{
                    id: (new Date()).getTime(), idArray: 1, active: true, volume: {
                        length: 0,
                        width: 0,
                        height: 0,
                        value: 0
                    },
                    weight: {
                        value: 0
                    },
                    same_places: 0,
                    cargo_type: '',
                    estimated_price_cargo: 0,
                    count_packing: 0,
                }]
            })
        },
        RemoveCargoById(state, id) {
            state.cargo = state.cargo.filter((item) => item.id !== id)
        },
        UpdateCargoById(state, object) {
            state.cargo.map((value, index) => {
                if (value.id === object.current_cargo) {
                    const current_item = value
                    if (object.point_a && object.point_b) {
                        current_item.point_a = object.point_a
                        current_item.point_b = object.point_b
                        current_item.direction_id = object.direction_id
                        current_item.deadline = object.deadline
                    }

                    if (object.places) {
                        current_item.places.length = 0
                        current_item.places.push(...object.places)

                    }
                }
            })
        },
        ChangeCargoId(state, id) {
            state.current_cargo = id
        },
    },
    getters: {
        getCurrentCargo(state) {
            return state.current_cargo
        },
        getAllCargo(state) {
            return state.cargo;
        },
        getPoints_a(state) {
            return state.point_a;
        },
        getDirections(state) {
            return state.directions
        },
        getDirectionById(state) {
            return state.direction_info
        },
        getPacking(state) {
            return state.packaging
        }
    }
}