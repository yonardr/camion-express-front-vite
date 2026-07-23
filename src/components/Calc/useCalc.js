import {taraForVolume} from "../../packagingTara.js";

export async function useCalc(direction, form, packing, mode = 'ltl'){
    let result;

    // FTL-режимы: фиксированная цена за машину по плечу (не ₽/кг сборного).
    // null => по плечу FTL не задан (показываем "по запросу").
    if (mode === 'ftl' || mode === 'partial') {
        const price = mode === 'ftl'
            ? direction.value?.ftl_price
            : direction.value?.partial_ftl_price
        return (price === null || price === undefined) ? null : Number(price)
    }

    function compareNumeric(a, b) {
        if (a.value > b.value) return 1;
        if (a.value === b.value) return 0;
        if (a.value < b.value) return -1;
    }

    // Тарифицируемый вес/объём. При деревянной упаковке (обрешётке) прибавляем вес и объём тары.
    let weightValue = Number(form.weight?.value) || 0
    let volumeValue = Number(form.volume?.value) || 0
    if (packing?.wooden) {
        const tara = taraForVolume(volumeValue)
        weightValue += tara.weight
        volumeValue += tara.volume
    }

    const sortWeights = [...direction.value.weights].sort(compareNumeric)
    let weightRatio = sortWeights.find(item=> item.value >= weightValue)
    if(!weightRatio) weightRatio = sortWeights[sortWeights.length-1]
    const total_price_weight = weightRatio?.price * weightValue

    const sortVolume = [...direction.value.volumes].sort(compareNumeric)
    let volumeRatio = sortVolume.find(item=> item.value >= volumeValue)
    if(!volumeRatio) volumeRatio = sortVolume[sortVolume.length-1]
    const total_price_volume = volumeRatio?.price * (volumeValue * 1.2)

    result = Math.max(total_price_weight, total_price_volume, direction.value.min_price)

    result = Number(result.toFixed(1))

    return result
}
