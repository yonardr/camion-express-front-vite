<template>
  <form @submit.prevent="submit">
  <div class="card">
    <h3 class="title">
      Пункт отправки —
      <span>
        {{cargo[0].point_a}}
      </span>
    </h3>
    <section>
      <label >Адрес забора груза <span>*</span>
        <my-input
            v-model="formSender.address"
            required
            :type="'personal'"
            placeholder="Адрес забора груза"
        ></my-input>
      </label>
      <label >Дата сдачи груза <span>*</span>
        <input

            v-model="formSender.pick_up_date"
            required
            type="date"
            class="input__date"
            placeholder="Дата сдачи груза"
        />
      </label>
    </section>
  </div>

    <div class="card">
      <h3 class="title">
        Пункт назначения: —
        <span>
        {{cargo[0].point_b}}
      </span>
      </h3>
      <section>
        <label style="width: 100%">Адрес сдачи груза (до склада или указать адрес) <span>*</span>
          <my-input
              v-model="formRecipient.address"
              required
              :type="'personal'"
              placeholder="Адрес сдачи груза"
          ></my-input>
        </label>
      </section>
    </div>
    <span v-if="cargo.length>1" style="color: red">Для продолжения оформления заявки, допустимо только 1 направление</span>
    <span v-if="cargo[0].places?.length > 1" style="color: red">Для продолжения оформления заявки, допустимо только 1 место (2 места = 2 заявки)</span>
<my-button :style="styleBtn" class="btn" color="orange">Следующий шаг <svg class="arrow__svg"
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
</template>

<script>
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import MyInput from "../UI/MyInput.vue";
import MyButton from "../UI/MyButton.vue";
import {useStore} from "vuex";
import {computed, reactive, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  components: {MyButton, MyInput},
setup(){
  const {cargo} = useLoadingDataCalc()
  const store = useStore()
  const router = useRouter();
  const formSender = reactive({
    address: '',
    pick_up_date: ''
  })
  const formRecipient = reactive({
    address: ''
  })
  watch(formSender, ()=>{
    store.commit('updateSender', formSender)
  })
  watch(formRecipient, ()=>{
    store.commit('updateRecipient', formRecipient)
  })
  const styleBtn = computed( ()=>{
    if(cargo.value.length > 1 && cargo.value.places > 1) return {
      'background-color' : '#c9c9c9',
      'border-color': '#c9c9c9',
      'pointer-events': 'none',
    }
  }
  )
  const submit = () =>{
    router.push({name: 'order', hash: '#order'})
  }
  return {cargo, formRecipient, formSender, styleBtn, submit}
}
}
</script>

<style lang="scss" scoped>
@import '../../variables';
form{
  padding: 24px;
}
.card{
  @include card(white);
  margin-bottom: 50px;
  padding: 24px;
}
section{
  display: flex;
  justify-content: space-between;
}
label{
  margin: 15px 0;
  width: 47%;
  span{
    color: $c_orange;
  }
}
.input__date{
  margin-top: 11px;
  border: solid 1px $c_blue;
  border-radius: 20px;
  padding: 0 20px;
  background: #F9F9F9;
  width: 100%;
  color: #737373;
  min-height: 58px;
  font-size: 16px !important;
  font-weight: 700 !important;
}
.btn:hover{
  .arrow__svg{
    fill: $c_orange;
    transition: .6s;
  }
}
.arrow__svg{
  width: 20px;
  margin-left: 25px;
  fill: #fff;

}
@media (max-width: 768px) {
  section{
    flex-direction: column;
  }
  label{
    width: 80%;
  }
}
</style>