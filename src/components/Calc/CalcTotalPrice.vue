<template>
  <div class="prices">
<!--    <img src="./../../assets/calc/check.png" class="invoice__img" />-->
    <div class="prices__content">
      <div v-for="elem in cargo">
        <div class="direction">
          <div class="title">
            Направление {{ elem.point_a }} - {{elem.point_b}}
          </div>
          <div class="description">
            Срок доставки {{elem.deadline}}
          </div>

        </div>

        <div v-for="item in elem.places" class="place">
          <div class="description" style="margin-left: 10px">
            Параметры груза
          </div>
          <div class="field">
            <div>Вес {{item?.weight?.value}} кг, Объем {{item?.volume?.value}} м³</div>
          </div>
            <div class="field">
              <div>Место № {{item.idArray}}</div>
              <div>{{item.price/ (item.same_places+1)}} ₽</div>
            </div>
          <div class="description" style="margin-left: 10px; margin-top: 15px">
            Расчет стоимости
          </div>
          <div class="field">
            <div>Количество одинаковых мест</div>
            <div>{{item.same_places}} шт</div>
          </div>
            <div class="field">
              <div>Стоимость упаковки</div>
              <div>{{item.packimg_price}} ₽</div>
            </div>
          <div class="field">
            <div>Итоговая стоимость места</div>
            <div>{{item.price + item.packimg_price}} ₽</div>
          </div>
          <div class="field" style="justify-content: flex-start; color: #737373; margin-top: 20px; font-size: 16px">
            <img src="../../assets/calc/clock-two-svgrepo-com.svg" style="width: 20px; margin:0 10px 9px 0"/>
            <div> Срок доставки {{elem.deadline}}</div>
          </div>
        </div>


      </div>

      <div class="total_price">
        <div>Общая стоимость</div>
        {{sum}} ₽
      </div>
    </div>


  </div>
</template>

<script>
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {onMounted, ref, watch} from "vue";
import {useCalc} from "./useCalc.js";
import {useStore} from "vuex";

export default {
  setup(){
    const {cargo} = useLoadingDataCalc()

    const sum = ref(0)

    watch(cargo.value, ()=>{
      sum.value = 0
      cargo.value.map((item)=>{
        if(item.direction_id){
          item.places.map((el)=>{
            sum.value += el.price
            sum.value += el.packimg_price
          })
        }
      })
    })




    return {cargo, sum}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.prices {
  margin: 70px 0 0 50px;
}
.prices__content{
  width: 350px;
  border-radius: 10px;
  padding: 10px 0;
  box-shadow: 15px 15px 15px 15px rgba(0, 0, 0, 0.07);
}
.field{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E9E9E9;
  margin: 10px;
  font-size: 15px;
  div{
    margin-bottom: 10px;
  }
}
.title{
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
.description{
  font-size: 14px;
  color: $c_gray;
}
.direction{
  margin: 10px;
  padding:  0 10px;
}
.place{
  margin-top: 10px;
  background-color: #f7f8f9;
  padding: 10px;
}
.total_price{
  padding: 20px;
  display: flex;
  justify-content: space-between;
}



</style>