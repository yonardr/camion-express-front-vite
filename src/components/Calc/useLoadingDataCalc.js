import {useStore} from "vuex";
import {computed, onMounted, ref, watch, watchEffect} from "vue";

export function useLoadingDataCalc() {

    const store = useStore()
    const points_a = computed(() => store.getters.getPoints_a.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }));
    const directions = computed(() => store.getters.getDirections.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }))
    const direction_info = computed(() => store.getters.getDirectionById)
    const packing = computed(() => store.getters.getPacking)
    const cargo = computed(() => store.getters.getAllCargo)
    const cargo_current = computed(()=> store.getters.getCurrentCargo)

    onMounted(() => store.dispatch('fetchPoints_a'))

    watch(points_a, async ()=>{
        await store.dispatch('fetchDirections', {id: points_a.value[0]?.id})

    })
    watch(directions, async ()=>{
        await store.dispatch('fetchDirectionById', {id_direction: directions.value[0]?.id_direction})
    })

    return {points_a, directions, direction_info, packing, cargo, cargo_current}

}

