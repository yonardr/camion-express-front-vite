<template>
  <div class="__container">
    <h3>Добавить направление</h3>
    <br>
    <h4>Выберите отправную точку</h4>
    <select class="select" v-model="selected">
      <option v-for="item in points_a" :value=item.id :key="item.id">
        {{ item.name }}
      </option>
    </select>

    <my-input-file v-model="file"/>

    <my-button :color="'blue'" class="btn" @click="submit">Добавить</my-button>
  </div>
</template>

<script>
import MyButton from "../../UI/MyButton.vue";
import {useLoadingDataCalc} from "../../Calc/useLoadingDataCalc.js";
import {ref} from "vue";
import MyInputFile from "../../UI/MyInputFile.vue";
import {useAddDirections} from "./hooks/useAddDirections.js";

export default {
  components: {MyInputFile, MyButton},
  setup(){
    const {points_a} = useLoadingDataCalc()
    const selected = ref(0)
    const file = ref(null)
    async function submit(){
      const res = await useAddDirections({id: selected.value, file: file.value})
      if(res.status === 201) alert("Направление добавлено")
    }
    return {points_a, selected, submit, file}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../variables';
.select{
  margin-top: 10px;
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
</style>