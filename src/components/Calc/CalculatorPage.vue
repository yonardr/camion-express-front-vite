<template>
<div class="__container">
  <div class="section">
    <h2 style="margin: 40px 0">КАЛЬКУЛЯТОР</h2>
    <div class="cargo">
      <div class="cargo__items">
        <div v-for="item in cargoArray">
          <my-button color="orange" class="btn">Груз №{{ item.id }}
            <div class="delete" @click="deleteCargo(item.id)">x</div>
          </my-button>
        </div>
      </div>
      <my-button color='orange' class="switcher active" @click="addCargo">Добавить груз</my-button>
    </div>
    <div class="card card__header">
      <div class="title">Направление</div>
      <CalcDirection />
    </div>
<div class="card">
  <CalcParam />
</div>
  </div>
  <div class="prices" >
    <img src="./../../assets/calc/check.png" class="invoice__img">
    {{direction_info.min_price}}
  </div>
</div>


</template>

<script>
import MyCombobox from "../UI/MyCombobox.vue";
import MyButton from "../UI/MyButton.vue";
import CalcDirection from "./CalcDirection.vue";
import CalcOnMain from "./CalcOnMain.vue";
import CalcParam from "./CalcParam.vue";
import {ref} from "vue";
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {useSubmit} from "../hooks/MainPage/useSubmit.js";
const minValue = value => Number(value) >= 0
export default {
  components: {CalcParam, CalcOnMain, CalcDirection, MyButton, MyCombobox},
  setup(){
    const form = useSubmit({
      weight: {
        value: 1,
        validators: {minValue}
      },
      volume: {
        value: 0.01,
        validators: {minValue}
      },
      count_packing : {
        value: 0
      }
    })
    const {direction_info, packing} = useLoadingDataCalc()
    const cargoArray = ref([{id: 1}])
    function addCargo() {
      const value = cargoArray.value.length + 1
      cargoArray.value.push({id: value})
    }
    const deleteCargo = (id) =>{
      if(id !== 1){
        cargoArray.value = cargoArray.value.filter((item)=> item.id !== id)
      }
    }

    return {cargoArray, deleteCargo, addCargo, direction_info}
  }
}

</script>

<style scoped lang="scss">
@import '../../variables';
.__container{
  display: flex;
}
.card{
  padding: 24px;
}
.card__header{

  @include card(white);
  margin-bottom: 20px;
}
.title{
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.input__fields{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e8e8ed;
  padding: 20px;
  border-radius: 20px;
  .input{
    padding: 10px;
    .input__title{
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
}
//____card_footer____
.card__footer{
  .input__fields{
    margin: 5px 0;
    &.border-none{
      border: none;
      padding: 0;
    }
    &.beginning{
      border: none;
      padding: 0;
      margin-bottom: 20px;
    }
  }
}


.switcher{
  width: 100%;
  margin: 10px;
  &.active{
    color: $c_orange;
    background-color: #fff;
  }
}
.place__group{
  display: flex;

}
.place__item{
  background: $c_orange;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
  margin: 5px;
}
.input__unit{
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
.mini__input{
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid $c_blue;
  &.long{
    width: 400px;
  }
}
label{
  margin-left: 5px;
}
.prices{
  position: relative;
  top:150px;
  left: 100px;
}
.invoice__img{
  width: 300px;
}
.wave{
  position: relative;
  bottom: 300px;
  left: 10px;
  h6{
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
</style>