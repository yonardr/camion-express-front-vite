import {ref} from "vue";

export function useCalcPacking(packing, form) {
    let sum = 0

    if (packing.value.stretch_film) sum += 250
    if (packing.value.wooden) {
        const price = form.volume.value * 2000
        if (price < 1000) sum += 1000
        else sum += price
    }
    if (packing.value.pallet_board) sum += form.count_packing.value * 650
    if (packing.value.pallet) sum += form.count_packing.value * 600

    return sum
}