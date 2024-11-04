<template>
  <div class="prices">
    <div class="container__btn">
      <my-button :color="'blue'" @click="downloadDocument({cargo: cargo[0]})"><svg class="printer__img" viewBox="0 0 64 64" >
<path d="M60,16h-8V4c0-2.211-1.789-4-4-4H16c-2.211,0-4,1.789-4,4v12H4c-2.211,0-4,1.789-4,4v32c0,2.211,1.789,4,4,4
	h8v4c0,2.211,1.789,4,4,4h32c2.211,0,4-1.789,4-4v-4h8c2.211,0,4-1.789,4-4V20C64,17.789,62.211,16,60,16z M20,8h24v8H20V8z M44,56
	H20V40h24V56z"/>
</svg>  Распечатать</my-button>
    </div>
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
            <div>Стоимость упаковки</div>
            <div>{{item.packimg_price}} ₽</div>
          </div>
          <div class="field">
            <div>Количество одинаковых мест</div>
            <div>{{item.same_places}} шт</div>
          </div>
          <div class="field">
            <div>Стоимость страховки</div>
            <div>{{item.insurance}} ₽</div>
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
import {downloadDocument} from "./useGetCalcApplication.js";
import {ref, watch} from "vue";
import MyButton from "../UI/MyButton.vue";

export default {
  components: {MyButton},
  setup(){
    const {cargo} = useLoadingDataCalc()

    const sum = ref(0)

    watch(cargo.value, ()=>{
      sum.value = 0
      cargo.value.map((item)=>{
        if(item.direction_id){
          item.places.map((el)=>{
            sum.value += Number(el.price.toFixed(1))
            sum.value += el.packimg_price
            sum.value += el.insurance
          })
        }
      })
    })

    return {cargo, sum, downloadDocument}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.prices {
  margin: 300px 0 0 50px;
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
.container__btn{
  display: flex;
  justify-content: center;
  &:hover{
    .printer__img{
      fill: $c_blue;
      transition: .6s;
    }
  }
  button{
    width: 100%;
  }
  .printer__img{
    fill: #fff;
    width: 20px;
    margin-right: 15px;
  }
}
@media (max-width: 1460px){
  .prices{
    margin: 50px 0 0 0;
    width: 100%;
  }
  .prices__content{
    width: 100%;
  }
}


</style>