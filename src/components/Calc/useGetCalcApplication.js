import axios from "axios";

export async function downloadDocument(data) {
    try {
        // Отправляем запрос на сервер с указанием типа ответа как 'blob' для получения бинарных данных
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/emailer/calc`,
            {
                cargo: data.cargo,
                sender: data.sender,
                recipient: data.recipient,
                payment_for_transportation: data.payment_for_transportation,
                price: data.price
            },
            {
                responseType: 'blob' // Указываем тип ответа 'blob' для получения бинарного файла
            }
        );
        // Создаём URL для скачивания файла из ответа
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));

        // Создаём временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Заявка на забор груза.docx'); // Указываем имя файла
        document.body.appendChild(link);

        // Кликаем по ссылке для начала скачивания
        link.click();

        // Очищаем URL и удаляем ссылку
        window.URL.revokeObjectURL(url);
        link.remove();
    } catch (error) {
        console.error('Ошибка при скачивании документа:', error);
    }
}