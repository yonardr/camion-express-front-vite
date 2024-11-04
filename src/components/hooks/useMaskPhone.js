import { computed, ref } from "vue";

export function useMaskPhone() {
    const phone = ref(''); // реактивное значение для хранения телефона без форматирования

    // Вычисляемое свойство для форматирования телефона в нужный формат
    const formattedPhone = computed(() => {
        return formatPhone(phone.value);
    });

    // Функция для форматирования строки
    function formatPhone(value) {
        const digits = value.replace(/\D/g, '').slice(1); // Убираем все символы, кроме цифр, и удаляем первый "7"
        const parts = [
            digits.slice(0, 3),
            digits.slice(3, 6),
            digits.slice(6, 8),
            digits.slice(8, 10),
        ];
        return `+7 (${parts[0]}) ${parts[1]} ${parts[2]}-${parts[3]}`.replace(
            /[^\d]$/,
            ''
        );
    }

    // Метод для обновления значения телефона при вводе
    function onInput(event) {
        const digits = event.target.value.replace(/\D/g, '');
        const maxLength = 11; // Максимальная длина для ввода цифр (включая ведущую "7")

        // Ограничение на длину цифр
        if (digits.length <= maxLength) {
            phone.value = `7${digits.slice(1)}`;
        } else {
            phone.value = `7${digits.slice(1, maxLength)}`;
        }
    }

    return {
        phone,          // Для доступа к необработанному значению при необходимости
        formattedPhone, // Отформатированное значение для отображения в поле
        onInput,        // Метод для использования в событии @input
    };
}
