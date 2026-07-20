import { reactive } from 'vue'

// Глобальные всплывающие уведомления (замена нативных alert()).
export const toastState = reactive({ items: [] })
let counter = 0

export function showToast(text, type = 'info', timeout = 4000) {
    const id = ++counter
    toastState.items.push({ id, text: String(text), type })
    setTimeout(() => dismissToast(id), timeout)
    return id
}

export function dismissToast(id) {
    const i = toastState.items.findIndex(t => t.id === id)
    if (i !== -1) toastState.items.splice(i, 1)
}
