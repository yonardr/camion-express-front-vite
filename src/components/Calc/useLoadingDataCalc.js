import {useStore} from "vuex";
import {computed, onMounted, ref, watch, watchEffect} from "vue";

export function useLoadingDataCalc() {

    const store = useStore()
    const points_a = computed(() => [...store.getters.getPoints_a].sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }));
    const directions = computed(() => [...store.getters.getDirections].sort((a, b) => {
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

    // Загрузка данных — один раз, если ещё не загружены. fetchPoints_a в экшене сам
    // подтягивает направления первой базы и первый город. Вотчеров-загрузчиков НЕТ —
    // раньше они (в каждом экземпляре composable) устраивали шторм запросов и сбрасывали выбор.
    onMounted(() => {
        if (!store.getters.getPoints_a?.length) store.dispatch('fetchPoints_a')
    })

    return {points_a, directions, direction_info, packing, cargo, cargo_current}

}

