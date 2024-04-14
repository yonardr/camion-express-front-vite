<template>

  <div class="container">
    <div class="input__fields">
      <div class="input">
        <div class="input__title">
          Откуда
        </div>
        <select class="select" @change="onChangePoint_A($event)">
          <option v-for="item in points_a" :value=item.id :key="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="input">
        <div class="input__title">
          Куда
        </div>

        <select class="select" @change="onChangePoint_B($event)" >
          <option v-for="item in directions" :key="item.id" :value="item.id_direction" :selected="item.name === cargo[cargo_current-1].point_b">
            {{ item.name }}
          </option>
        </select>

      </div>
    </div>
  </div>

</template>

<script>
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {useInputsCalc} from "./useInputsCalc.js";
import MyButton from "../UI/MyButton.vue";
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";

export default {
  components: {MyButton},
  setup(){
    const store = useStore()
    const {points_a, directions, direction_info, cargo_current, cargo} = useLoadingDataCalc()
    const  {onChangePoint_A, onChangePoint_B} = useInputsCalc({})

    watch(direction_info, ()=>{
      store.commit('UpdateCargoById', {current_cargo: cargo_current.value, point_a: direction_info.value.point_a[0].name,point_b: direction_info.value.point_b[0].name, direction_id: direction_info.value.id, deadline: direction_info.value.deadline })
    })


    return {points_a, onChangePoint_A, onChangePoint_B, directions, cargo, cargo_current}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.container{
}
.title{
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}
select{
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
}
select::-ms-expand {
  display: none;
}
.select{
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

@media (max-width: 1050px) {
  .input, .select{
    width: 100%;
  }
  .input__fields{
    flex-direction: column;
  }
}

</style>