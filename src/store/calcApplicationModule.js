import axios from "axios";
export const calcApplicationModule = {

    state: {
        sender:{
            org_name: '',
            name: '',
            tel: '',
            time: '',
            address: '',
            INN: '',
            KPP: '',
            pick_up_date: ''
        },
        recipient:{
            org_name: '',
            name: '',
            address: '',
            INN: '',
            KPP: '',
        },
        payment_for_transportation: '',
    },
    mutations:{
        updateSender(state, data) {
            Object.keys(data).map((key)=>{
                state.sender[key] = data[key]
            })
        },
        updateRecipient(state, data) {
            Object.keys(data).map((key)=>{
                state.recipient[key] = data[key]
            })
        },
        updatePay_trans(state, data) {
            state.payment_for_transportation = data
        },
    },
    getters:{
        guardValueNextOrder(state){
            return state.sender.pick_up_date
        },
        getSender(state){
          return state.sender
        },
        getRecipient(state){
            return state.recipient
        },
    },
    actions:{
        async submitMail(state, data){
            try{
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/emailer/calc/send`,
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
                if(response.status !== 201) alert("Ошибка, заявка не отправлена!")

            }catch (e) {
                alert("Ошибка " + e)
            }
        }
    }
}