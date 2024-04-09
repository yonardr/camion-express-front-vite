<template>
  <div>
      <h3>Добавить отправную точку</h3>
      <my-input
          v-model="name"
          :type="'personal'"
          placeholder="Введите название отправной точки"
      />
    <my-button :color="'blue'" class="btn" @click="submit">Добавить</my-button>
  </div>
</template>

<script>
import MyInput from "../../UI/MyInput.vue";
import MyButton from "../../UI/MyButton.vue";
import {ref} from "vue";
import {useAddPointA} from "./hooks/useAddPointA.js";

export default {
  components: {MyButton, MyInput},
  setup(){
    const name = ref('')
    async function submit(){
      const res = await useAddPointA({name: name.value})
      if(res === 201){
        alert('Добавлено')
      }
    }
    return {name, submit}
  }
}
</script>

<style lang="scss" scoped>

</style>