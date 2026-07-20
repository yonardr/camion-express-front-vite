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

    <label class="replace-row">
      <input type="checkbox" v-model="replace"/>
      Заменить все направления базы (снести старые и залить заново)
    </label>

    <my-button :color="'blue'" class="btn" @click="submit">
      {{ replace ? 'Заменить' : 'Добавить' }}
    </my-button>

    <p v-if="message" class="msg">{{ message }}</p>
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
    const replace = ref(false)
    const message = ref('')
    async function submit(){
      message.value = ''
      if(!selected.value){ message.value = 'Выберите отправную точку'; return }
      if(!file.value){ message.value = 'Выберите файл'; return }
      const res = await useAddDirections({id: selected.value, file: file.value, replace: replace.value})
      if(res.ok){
        const d = res.data || {}
        message.value = `Готово: залито ${d.added ?? '?'} направлений` +
          (d.skipped && d.skipped.length ? `, пропущено ${d.skipped.length} (${d.skipped.join(', ')})` : '')
      } else {
        message.value = `Ошибка: ${res.error}`
      }
    }
    return {points_a, selected, submit, file, replace, message}
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
.replace-row{
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  max-width: 400px;
  font-size: 15px;
  cursor: pointer;
}
.msg{
  margin-top: 10px;
  max-width: 400px;
  font-size: 15px;
}
</style>