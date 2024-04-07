<template>
  <div>
 <Navbar/>
  <div class="__container">
    <div class="section">
      <h2>Расчёт и оформление заявки</h2>
      <div class="card" style="padding-bottom: 0px; padding-top: 0">
      <div class="cargo">
        <div class="cargo__items">
          <div v-for="item in cargo">
            <my-button color="orange"
                       class="btn"
                       :class="activeCargo(item.id)"
                       @click="changeCargo(item.id)">
              Груз №{{ item.id }}
              <div class="delete" @click="deleteCargo(item.id)">x</div>
            </my-button>
          </div>
        </div>
        <my-button color='orange' class="switcher active" @click="addCargo">Добавить груз</my-button>
      </div>
      </div>
      <div class="card" style="padding-bottom: 0;padding-top: 0">
        <div class="card card__header">
          <div class="title">Направление</div>
          <CalcDirection/>
        </div>
      </div>

      <div class="card">
        <CalcParam/>
      </div>
    </div>
    <CalcTotalPrice />
  </div>
  </div>

</template>

<script>
import MyCombobox from "../components/UI/MyCombobox.vue";
import MyButton from "../components/UI/MyButton.vue";
import CalcDirection from "../components/Calc/CalcDirection.vue";
import CalcOnMain from "../components/Calc/CalcOnMain.vue";
import CalcParam from "../components/Calc/CalcParam.vue";
import {useLoadingDataCalc} from "../components/Calc/useLoadingDataCalc.js";
import {useStore} from "vuex";
import Navbar from "../components/MainPage/Navbar.vue";
import CalcTotalPrice from "../components/Calc/CalcTotalPrice.vue";


const minValue = value => Number(value) >= 0
export default {
  components: {CalcTotalPrice, CalcParam, CalcOnMain, CalcDirection, MyButton, MyCombobox, Navbar},
  setup() {
    const store = useStore()
    const {cargo, direction_info, cargo_current} = useLoadingDataCalc()



    function addCargo() {
      store.commit('AddCargo')
      const value = cargo.value[cargo.value.length - 1]
      store.commit('ChangeCargoId', value.id)
    }

    const deleteCargo = (id) => {
      if(id !== 1) store.commit('RemoveCargoById', id)
    }

    const activeCargo = (id) => {
      if (cargo_current.value !== id) return 'active'
    }


    function changeCargo(id) {
      store.commit('ChangeCargoId', id)
      // cargo.value.map((value, index) => {
      //   if (value.id === id) cargo.value[index].active = true
      //   else cargo.value[index].active = false
      // })
    }

    return {cargo, deleteCargo, addCargo, direction_info, activeCargo, changeCargo}
  }
}

</script>

<style scoped lang="scss">
@import '../variables';
h2{
  padding: 0 24px;
  text-align: start;
  margin-top: 150px;
  margin-bottom: 30px;
}
.__container {
  display: flex;
  justify-content: center
}

.card {
  padding: 24px;
}

.card__header {
  @include card(white);
  margin-bottom: 20px;
}

.title {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.input__fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e8e8ed;
  padding: 20px;
  border-radius: 20px;

  .input {
    padding: 10px;

    .input__title {
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
}

//____card_footer____
.card__footer {
  .input__fields {
    margin: 5px 0;

    &.border-none {
      border: none;
      padding: 0;
    }

    &.beginning {
      border: none;
      padding: 0;
      margin-bottom: 20px;
    }
  }
}


.switcher {
  width: 100%;
  margin: 10px;
}

.active {
  color: $c_orange;
  background-color: #fff;
}

.place__group {
  display: flex;

}

.place__item {
  background: $c_orange;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
  margin: 5px;
}

.input__unit {
  display: inline-block;
  position: relative;

  &::before {
    content: "м";
    display: block;
    position: absolute;
    right: 8px;
    top: 5px;
    font-size: 20px;
    color: #86868b;
  }
}

.mini__input {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid $c_blue;

  &.long {
    width: 400px;
  }
}

label {
  margin-left: 5px;
}



.invoice__img {
  width: 300px;
}

.wave {
  position: relative;
  bottom: 300px;
  left: 10px;

  h6 {
    margin: 10px;
    font-size: 16px;
  }
}

.cargo {
  width: 1000px;
  display: flex;
  justify-content: space-between;

  .switcher {
    width: 250px;
  }
}

.cargo__items {
  display: flex;
  overflow-x: scroll;
  width: 80%;
}

.btn {
  width: 130px;
  padding: 0;
  font-size: 16px;
  margin: 5px;
  border-radius: 20px;

  &:hover {
    background-color: $c_orange;
    color: #fff;
  }

  .delete {
    margin-left: 15px;
    transition: 0.6s;

    &:hover {
      transform: scale(1.5);
      transition: 0.6s;
      margin-bottom: 3px;
    }
  }
}
@media (max-width: 1460px){
  .__container{
    flex-wrap: wrap;
  }
}
@media(max-width: 1050px){
  .card, .cargo, .card__header{
    width: 100%;
  }
}
@media(max-width: 768px){
  .cargo{
    flex-direction: column;
    width: 320px;
  }
  .card{
   padding: 10px;
  }
  h2{
    font-size: 30px;
    text-align: center;
    padding: 0;
  }
}
</style>