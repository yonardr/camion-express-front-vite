import {ref, watch} from "vue";

export function useNumbersAnimation(number) {

    const result = ref(0)

    const iteration = async (oldValue, newValue) => new Promise((resolve) => {
        if (oldValue < newValue) {
            for (let i = oldValue; i <= newValue; i += 10) {
                setTimeout(() => {
                    result.value = i.toFixed()
                }, 300)
            }
            resolve()
        } else {
            for (let i = oldValue; i >= newValue; i -= 10) {
                setTimeout(() => {
                    result.value = i.toFixed()
                }, 300)
            }
            resolve()
        }

    })

    watch(number,  (newValue, oldValue) => {
          iteration(oldValue, newValue).then(() => {
            setTimeout(() => {
                result.value = number.value.toFixed()
            }, 400)
        })

    })

    return result
}