<template>
  <div class="prices">
    <img src="./../../assets/calc/check.png" class="invoice__img" />
    <div class="prices__content">
      <div v-for="elem in cargo">
        <div class="direction">
          <div class="title">
            Направление {{ elem.point_a }} - {{elem.point_b}}
          </div>
          <div class="deadline">
            Срок доставки {{elem.deadline}}
          </div>

        </div>

        <div v-for="item in elem.places" class="place">
            <div class="field">
              <div>Место № {{item.idArray}}</div>
              <div>{{item.price/ (item.same_places+1)}} ₽</div>
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
            <div>{{item.price + item.packimg_price}}</div>
          </div>
        </div>


      </div>

      <div class="total_price">
        Итого =
        {{sum}}
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
.prices {
  position: absolute;
  top: 150px;
  left: 100px;
  width: 550px;
}
.prices__content{
  position: relative;
  top: -680px;
  left: 20px;
}
.field{
  display: flex;
  justify-content: space-between
}
.title{
  margin-top: 20px;
  font-size: 25px;
  font-weight: bold;
}
.place{
  margin-top: 10px;
}
.total_price{
  margin-top: 50px;
}
</style>