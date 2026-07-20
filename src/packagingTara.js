// Вес и объём деревянной упаковки (обрешётки), добавляемые к грузу.
// Источник: менеджерский «Расчет упаковки.xlsm», лист «Калькулятор».
// Диапазоны по объёму груза (м³, верхняя граница) → вес тары (кг) и объём тары (м³).
const VOLUME_BOUNDS = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, Infinity]
const TARA_WEIGHT = [30, 60, 70, 80, 90, 110, 120]
const TARA_VOLUME = [0.12, 0.25, 0.35, 0.4, 0.5, 0.6, 0.7]

export function taraForVolume(volume) {
    const v = Number(volume) || 0
    let i = VOLUME_BOUNDS.findIndex(b => v < b)
    if (i < 0) i = VOLUME_BOUNDS.length - 1
    return { weight: TARA_WEIGHT[i], volume: TARA_VOLUME[i] }
}
