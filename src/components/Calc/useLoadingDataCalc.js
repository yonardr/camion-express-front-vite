import {useStore} from "vuex";
import {computed, onMounted, watchEffect} from "vue";

export function useLoadingDataCalc() {

    const store = useStore()
    const points_a = computed(() => store.getters.getPoints_a);
    const directions = computed(() => store.getters.getDirections)
    const direction_info = computed(() => store.getters.getDirectionById)
    const packing = computed(() => store.getters.getPacking)

    onMounted(() => store.dispatch('fetchPoints_a'))

    watchEffect(async () => {
        await store.dispatch('fetchDirections', {id: points_a.value[1]?.id})
    })
    watchEffect(async () => {
        await store.dispatch('fetchDirectionById', {id_direction: directions.value[0]?.id_direction})
    })

    return {points_a, directions, direction_info, packing}

}

