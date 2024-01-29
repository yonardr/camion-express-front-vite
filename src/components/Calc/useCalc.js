
export function useCalc(direction, form){
    let result;
    function compareNumeric(a, b) {
        if (a.value > b.value) return 1;
        if (a.value === b.value) return 0;
        if (a.value < b.value) return -1;
    }
    const sortWeights = direction.value.weights.sort(compareNumeric)
    const weightRatio = sortWeights.find(item=> item.value >= form.weight.value)
    const total_price_weight = weightRatio.price * form.weight.value

    const sortVolume = direction.value.volumes.sort(compareNumeric)
    const volumeRatio = sortVolume.find(item=> item.value >= form.volume.value)
    const total_price_volume = volumeRatio.price * form.volume.value

    result = Math.max(total_price_weight, total_price_volume, direction.value.min_price)

    return result
}
