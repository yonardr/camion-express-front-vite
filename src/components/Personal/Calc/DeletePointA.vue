<template>
  <div>
    <h3>Удалить отправную точку</h3>
    <select class="select" v-model="selected">
      <option v-for="item in points_a" :value=item.id :key="item.id">
        {{ item.name }}
      </option>
    </select>
    <my-button :color="'blue'" class="btn" @click="submit">Удалить</my-button>
  </div>
</template>

<script>
import MyButton from "../../UI/MyButton.vue";
import {useLoadingDataCalc} from "../../Calc/useLoadingDataCalc.js";
import {ref} from "vue";
import {useDeletePointA} from "./hooks/useDeletePointA.js";

export default {
  components: {MyButton},
  setup(){
    const {points_a} = useLoadingDataCalc()
    const selected = ref(0)
    async function submit(){
      const res = await useDeletePointA({id: selected.value})
      if(res > 0) alert("Точка удалена успешно")
    }
    return {points_a, selected, submit}
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
}
</style>