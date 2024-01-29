import {ref} from "vue";

export function useCalcPacking(packing, form) {
    let sum = 0

    if (packing.value.stretch_film) sum += 250
    if (packing.value.wooden) {
        const price = form.volume.value * 1500
        if (price < 800) sum += 800
        else sum += price
    }
    if (packing.value.pallet_board) sum += form.count_packing.value * 600
    if (packing.value.pallet) sum += form.count_packing.value * 650

    return sum
}