
export async function useCalc(direction, form){
    let result;
    function compareNumeric(a, b) {
        if (a.value > b.value) return 1;
        if (a.value === b.value) return 0;
        if (a.value < b.value) return -1;
    }
    const sortWeights = direction.value.weights.sort(compareNumeric)
    let weightRatio = sortWeights.find(item=> item.value >= form.weight.value)
    if(!weightRatio) weightRatio = sortWeights[sortWeights.length-1]
    const total_price_weight = weightRatio?.price * form.weight.value

    const sortVolume = direction.value.volumes.sort(compareNumeric)
    let volumeRatio = sortVolume.find(item=> item.value >= form.volume.value)
    if(!volumeRatio) volumeRatio = sortVolume[sortVolume.length-1]
    const total_price_volume = volumeRatio?.price * (form.volume.value * 1.2)

    result = Math.max(total_price_weight, total_price_volume, direction.value.min_price)

    result = Number(result.toFixed(1))

    return result
}
