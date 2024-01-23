<template>
  <div class="container">
    <div>
      <div class="input__fields btns">
        <my-button color="blue" class="btn left" @click="addPacking">Жесткая упаковка</my-button>
        <my-button color="blue" class="btn between">Паллетирование</my-button>
        <my-button color="blue" class="btn right">Пузырчатая пленка</my-button>
      </div>
    <div class="input__fields">
      <div class="input">
        <div class="input__title">
          Откуда
        </div>
        <select class="select" @change="onChangePoint_A($event)">
          <option v-for="item in points_a" :value=item.id :key="item.id">
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="input">
        <div class="input__title">
          Куда
        </div>

        <select class="select" @change="onChangePoint_B($event)">
          <option v-for="item in directions" :key="item.id" :value="item.id_direction">
            {{item.name}}
          </option>
        </select>
      </div>
    </div>
      <div class="input__fields">
        <div class="input">
          <div class="input__title">
            Вес
          </div>
          <div><input v-model="weight" class="select"></div>
          <div><input type="range" v-model="weight" max="5000" class="input__range"> </div>
        </div>
        <div class="input">
          <div class="input__title">
            Объем
          </div>
          <div><input v-model="volume" class="select"></div>
          <div><input type="range" v-model="volume" max="30" class="input__range"> </div>
        </div>
      </div>

    </div>
<div class="total__price">
  <h6>
    Примерная стоймость грузоперевозки
  </h6>
  <h3>{{direction_info.min_price}}</h3>
  <h6>
    Сроки доставки
  </h6>
  <h3>{{direction_info.deadline}}</h3>

</div>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import MyButton from "../UI/MyButton.vue";

export default {
  components: {MyButton},
   setup(){
    const store = useStore()

     const points_a = computed(() => store.getters.getPoints_a);
     const directions = computed (()=> store.getters.getDirections)
     const direction_info = computed (()=> store.getters.getDirectionById)

     onMounted(() => store.dispatch('fetchPoints_a'))

     watchEffect(async() =>{
        await store.dispatch('fetchDirections', {id: points_a.value[1]?.id})
     })
     watchEffect(async () =>{
       await store.dispatch('fetchDirectionById', {id_direction: directions.value[0]?.id_direction})
     })


     const weight = ref(0)
    const volume = ref(0)
    async function onChangePoint_A(event) {
      await store.dispatch('fetchDirections', {id: event.target.value})
    }
    async function onChangePoint_B(event) {
      await store.dispatch('fetchDirectionById', {id_direction: event.target.value})
    }

    function addPacking(){

     }

    return {points_a, onChangePoint_A, onChangePoint_B, directions, direction_info, weight, volume}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.container{
  margin-bottom: 200px;
  display: flex;
}
.total__price{
  border-left: 1px solid $c_blue ;
  padding: 20px;
}
.title{
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}
.select{
  margin-bottom: 5px;
  width: 250px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid #86868b;
  font-size: 18px;
  padding: 10px;
}
.input__fields{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .input{
    padding: 10px;
    .input__title{
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
}
.input__range{
  position: relative;
  top: -21px;
  width: 100%;

}
input[type=range]{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #B6CAD5;
  height: 2px;
}

/* Специальные правила для браузеров на движках WebKit/Blink */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid $c_orange;
  height: 16px;
  width: 16px;
  border-radius:103px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Добавляем классные эффекты для слайдера! */
}
.btns{
  justify-content: center
}
.btn{
  color: $c_blue;
  background-color: #fff;
  font-size: 14px;
  &.between{
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  &.left{
    border-radius: 37px 0 0 37px  ;
  }
  &.right{
    border-radius: 0 37px 37px 0;
  }
  &:hover{
    color: #fff;
    background-color: $c_blue;
    border-color: $c_blue;
  }
}
</style>