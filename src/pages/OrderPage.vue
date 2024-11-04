<template>
  <div>
    <Navbar/>
    <div class="__container" id="order">
      <form class="section" @submit.prevent="submit">
        <h2>Заявка на перевозку</h2>
        <span class="direction-box">{{ cargo[0].point_a }} — {{ cargo[0].point_b }}</span>
        <div class="card">
          <div class="title">Данные перевозки и параметры груза</div>
          <div class="direction__info">
            <div class="item">
              <svg class="marker" viewBox="0 0 24 24" fill="none" width="30">
                <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#ff7b47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                    stroke="#ff7b47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="point">
                <div class="city">{{ cargo[0].point_a }}</div>
                <div class="address">{{ sender.address }}</div>
                <div class="address">Филиал — {{ cargo[0].point_a }}</div>
              </div>
            </div>
            <svg class="arrow__svg"
                 viewBox="0 0 492.004 492.004">
              <g>
                <g>
                  <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"/>
                </g>
              </g>
            </svg>
            <div class="item">
              <svg class="marker" viewBox="0 0 24 24" fill="none" width="30">
                <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#ff7b47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                    stroke="#ff7b47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="point">
                <div class="city">{{ cargo[0].point_b }}</div>
                <div class="address">{{ recipient.address }}</div>
                <div class="address">Филиал — {{ cargo[0].point_b }}</div>
              </div>
            </div>
          </div>
          <div class="general__cargo">
            <div class="address">Общие параметры груза:</div>
            <div>
              <div v-for="el in cargo[0].places">
                Место №{{ el.idArray }} —
                <span>вес: {{ el.weight.value }} кг, </span>
                <span>объем: {{ el.volume.value }} м³</span>
                <span v-if="el.volume.same_places">, кол-во одинаковых: {{ el.volume.same_places }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card" :style="{background: `url(${vector1}) center no-repeat` , backgroundSize: '90% 90%'}">
          <h3 class="title" style="color: #ff7b47">
            Отправитель
          </h3>
          <div class="text">При отправке физическим лицом заполнение поля ИНН и КПП необязательно <span>*</span></div>
          <section>
            <label>Наименование организации <span>*</span>
              <my-input
                  v-model="senderForm.org_name"
                  required
                  :type="'personal'"
                  placeholder="Наименование организации"
              ></my-input>
            </label>
            <label>ФИО <span>*</span>
              <my-input
                  v-model="senderForm.name"
                  required
                  :type="'personal'"
                  placeholder="Фамилия Имя Отчество"
              ></my-input>
            </label>
          </section>
          <section>
            <label>Номер телефона <span>*</span>
              <my-input
                  v-model="senderForm.tel"
                  required
                  :type="'personal'"
                  maxlength="18"
                  :value="primaryPhone.formattedPhone.value"
                  @input="primaryPhone.onInput"
              ></my-input>
            </label>
            <label>ИНН
              <my-input
                  v-model="senderForm.INN"
                  :type="'personal'"
                  placeholder="ИНН"
              ></my-input>
            </label>
            <label>КПП
              <my-input
                  v-model="senderForm.KPP"
                  :type="'personal'"
                  placeholder="КПП"
              ></my-input>
            </label>
          </section>
        </div>
        <div class="card" :style="{background: `url(${vector2}) center no-repeat` , backgroundSize: '90% 90%'}">
          <h3 class="title" style="color: #ff7b47">
            Получатель
          </h3>
          <div class="text">При получении физическим лицом заполнение поля ИНН и КПП необязательно <span>*</span></div>
          <section>
            <label>Наименование организации <span>*</span>
              <my-input
                  v-model="recipientForm.org_name"
                  required
                  :type="'personal'"
                  placeholder="Наименование организации"
              ></my-input>
            </label>
            <label>ФИО <span>*</span>
              <my-input
                  v-model="recipientForm.name"
                  required
                  :type="'personal'"
                  placeholder="Фамилия Имя Отчество"
              ></my-input>
            </label>
          </section>
          <section>
            <label>Номер телефона <span>*</span>
              <my-input
                  v-model="recipientForm.tel"
                  maxlength="18"
                  :value="secondaryPhone.formattedPhone.value"
                  @input="secondaryPhone.onInput"
                  placeholder="+7 (___) ___ __-__"
                  required
                  :type="'personal'"
              ></my-input>
            </label>
            <label>ИНН
              <my-input
                  v-model="recipientForm.INN"
                  :type="'personal'"
                  placeholder="ИНН"
              ></my-input>
            </label>
            <label>КПП
              <my-input
                  v-model="recipientForm.KPP"
                  :type="'personal'"
                  placeholder="КПП"
              ></my-input>
            </label>
          </section>
        </div>


        <div class="card" id="pay" :style="{background: `url(${vector3}) center no-repeat` , backgroundSize: '70% 70%'}">
          <h3 class="title">
            Платеж
          </h3>
          <section>
            <label style="margin-top: 0">Выберите плательщика за перевозку <span>*</span>
              <select class="select" v-model="pay_trans" required>
                <option value="" disabled selected>Выберите плательщика</option>
                <option value="Отправитель">
                  Отправитель
                </option>
                <option value="Получатель">
                  Получатель
                </option>
              </select>
            </label>
          </section>
        </div>
        <div class="container__btn">
          <my-button :color="'blue'" class="btn" @click.prevent="downloadDocument({cargo: cargo[0], sender: sender, recipient: recipient, payment_for_transportation: pay_trans, price: sum})"><svg class="printer__img" viewBox="0 0 64 64" >
            <path d="M60,16h-8V4c0-2.211-1.789-4-4-4H16c-2.211,0-4,1.789-4,4v12H4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4
	h8v4c0,2.211,1.789,4,4,4h32c2.211,0,4-1.789,4-4v-4h8c2.211,0,4-1.789,4-4V20C64,17.789,62.211,16,60,16z M20,8h24v8H20V8z M44,56
	H20V40h24V56z"/>
          </svg>  Распечатать заявку</my-button>
        </div>
        <my-button :color="'orange'" class="btn">Отправить заявку <svg class="arrow__svg"
                                                          viewBox="0 0 492.004 492.004">
          <g>
            <g>
              <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"/>
            </g>
          </g>
        </svg></my-button>

      </form>

    </div>
    <Footer/>
  </div>
  <my-dialog v-model:show="dialogVisible" >
    <div class="modal">
      <img src="../assets/dialog/done.svg" />
      <h1>Спасибо</h1>
      <p>В ближайшее время с Вами свяжется наш специалист</p>
    </div>
  </my-dialog>
</template>

<script>
import MyCombobox from "../components/UI/MyCombobox.vue";
import MyButton from "../components/UI/MyButton.vue";
import {useLoadingDataCalc} from "../components/Calc/useLoadingDataCalc.js";
import {useStore} from "vuex";
import Navbar from "../components/MainPage/Navbar.vue";
import Footer from "../components/MainPage/Footer.vue";
import {computed, reactive, ref, watch} from "vue";
import MyInput from "../components/UI/MyInput.vue";
import {useMaskPhone} from "../components/hooks/useMaskPhone.js";
import vector1 from '../assets/calc/Intersect.svg'
import vector2 from '../assets/calc/Intersect_1.svg'
import vector3 from '../assets/calc/Intersect_2.svg'
import {downloadDocument} from "../components/Calc/useGetCalcApplication.js";
import MyDialog from "../components/UI/MyDialog.vue";

export default {
  components: {
    MyDialog,
    MyInput,
    Footer, MyButton, MyCombobox, Navbar
  },
  setup() {
    const store = useStore()
    const {cargo} = useLoadingDataCalc()
    const sender = computed(() => store.getters.getSender)
    const recipient = computed(() => store.getters.getRecipient)

    const primaryPhone = useMaskPhone();
    const secondaryPhone = useMaskPhone();

    const dialogVisible = ref(false)

    const senderForm = reactive({
      org_name: '',
      name: '',
      tel: '',
      INN: '',
      KPP: '',
    })
    watch(senderForm, ()=>{
      store.commit('updateSender', senderForm)
    })
    const recipientForm = reactive({
      org_name: '',
      name: '',
      tel: '',
      INN: '',
      KPP: '',
    })
    watch(recipientForm, ()=>{
      store.commit('updateRecipient', recipientForm)
    })
    const pay_trans = ref('')

    watch(pay_trans, ()=>{
      store.commit('updatePay_trans', pay_trans)
    })
    const sum = ref(0)

      cargo.value.map((item)=>{
        if(item.direction_id){
          item.places.map((el)=>{
            sum.value += Number(el.price.toFixed(1))
            sum.value += el.packimg_price
            sum.value += el.insurance
          })
        }
      })

    async function submit(){
      await store.dispatch('submitMail', {cargo: cargo.value[0], sender: sender.value, recipient: recipient.value, payment_for_transportation: pay_trans.value, price: sum.value})
      dialogVisible.value = true
    }

    return {
      cargo, sender, recipient,
      primaryPhone,
      secondaryPhone,
      vector1,
      vector2,
      vector3,
      senderForm,
      recipientForm,
      pay_trans,
      submit,
      downloadDocument,
      sum,
      dialogVisible
    }
  }
}

</script>

<style scoped lang="scss">
@import '../variables';

h2 {
  text-align: start !important;
  margin-top: 150px;
  margin-bottom: 30px;
}

.__container {
  display: flex;
  justify-content: flex-start;
}

.section {
  width: 100%;
}

section {
  display: flex;
  justify-content: space-between;
}

.direction-box {
  background-color: $c_orange;
  font-size: 16px;
  padding: 12px;
  border-radius: 20px;
  color: #FFFFFF;
}
.arrow__svg{
  width: 20px;
  margin-left: 25px;
  fill: #fff;

}

.btn:hover{
  .arrow__svg{
    fill: $c_orange;
    transition: .6s;
  }
}
.container__btn{
  margin-top: 20px;
  &:hover{
    .printer__img{
      fill: $c_blue;
      transition: .6s;
    }
  }
  button{

  }
  .printer__img{
    fill: #fff;
    width: 20px;
    margin-right: 15px;
  }
}
.card {
  @include card(white);
  padding: 24px 34px;
  margin-top: 30px;
}

.title {
  margin: 10px 15px;
  font-size: 28px;
  font-weight: bold;
}

.direction__info {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;

  .item {
    display: flex;
    align-items: flex-start;
    border-radius: 20px;
    padding: 16px;
    width: 40%;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.07);
  }
  .arrow__svg{
    width: 30px;
    fill: $c_orange;
  }

  .marker {
    margin-right: 10px;
  }
}

.general__cargo {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin: 15px;
}

label {
  margin: 15px 15px;
  width: 47%;

  span {
    color: $c_orange;
  }
}

.select {
  margin-top: 11px;
  margin-bottom: 5px;
  width: 400px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid $c_gray;
  font-size: 18px;
  padding: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none !important;
  background-color: #fff;
  color: #000;
}
.modal{
  text-align: center;
  img{
    margin: 0 auto;
    width:150px
  }
}
#pay{
  width: 60%;
}
@media (max-width: 1460px) {
  .__container {
    flex-wrap: wrap;
  }
}

@media(max-width: 1050px) {
  .card, .cargo, .card__header {
    width: 100%;
  }
}

@media(max-width: 768px) {
  .direction__info{
    flex-direction: column;
    .item{
      width: 100%;
      margin:10px 0;
    }
  }
  .general__cargo{
    flex-direction: column;
  }
  .btn{
    font-size: 16px;
  }
  .card {
    padding: 10px;
  }
  h2 {
    font-size: 30px;
    text-align: center;
    padding: 0;
  }
  section{
    flex-direction: column;
  }
  label{
    width: 80%;
  }
  .select{
    width: 100%;
  }
  #pay{
    width: 100%;
  }
  .text{
    margin-left: 15px;
  }
}
</style>