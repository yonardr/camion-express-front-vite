import {useStore} from "vuex";

export function useInputsCalc(form= {}){
    const store = useStore()
    const onChangePoint_A = async (event) =>{
        await store.dispatch('fetchDirections', {id: event.target.value})
    }
    const onChangePoint_B = async(event) => {
        await store.dispatch('fetchDirectionById', {id_direction: event.target.value})
    }
    const changePacking = (change_key) =>{
        store.commit('updatePacking', change_key)
    }
    const inputParse = (event, key)=> {
        if (event.target.value >= 5000 && key === 'weight') {
            event.target.value = 5000
        } else if (event.target.value >= 30 && key === 'volume') {
            event.target.value = 30
        } else {
            event.target.value = Number(event.target.value)
            if (form[key].value < 0 || form[key].value === "") form[key].value = 0
        }
    }
    const inputProgress = (type) => {
        let value = 0;
        if (type === 'weight') value = (form.weight.value) / (5000) * 100
        if (type === 'volume') value = (form.volume.value) / (30) * 100
        return {
            background: `linear-gradient(to right, #737373 0%, #ff7b47 10%, #ff7b47 ${value}%, #ff7b47 ${value + 2}%, #737373 ${value + 20}%, #737373 100%)`
        }
    }
    return {onChangePoint_A, onChangePoint_B, changePacking, inputProgress, inputParse}
}