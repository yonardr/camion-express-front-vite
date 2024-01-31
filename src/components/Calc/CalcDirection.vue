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

        <select class="select" @change="onChangePoint_B($event)">
          <option v-for="item in directions" :key="item.id" :value="item.id_direction">
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
import {ref} from "vue";

export default {
  components: {MyButton},
  setup(){
    const {points_a, directions, direction_info, packing} = useLoadingDataCalc()
    const  {onChangePoint_A, onChangePoint_B} = useInputsCalc({})



    return {points_a, onChangePoint_A, onChangePoint_B, directions}
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
.select{
  margin-bottom: 5px;
  width: 400px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid $c_gray;
  font-size: 18px;
  padding: 10px;
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



</style>