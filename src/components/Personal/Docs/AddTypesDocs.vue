<template>
  <div>
    <h3>Добавление разновидности документа</h3>

    <my-input
        v-model="name"
        :type="'personal'"
        placeholder="Введите название нового типа"
    />
    <my-button :color="'blue'" class="btn" @click="submit">Добавить тип</my-button>
  </div>
</template>

<script>
import MyInput from "../../UI/MyInput.vue";
import {ref} from "vue";
import MyButton from "../../UI/MyButton.vue";
import {useAddTypeDocs} from "../../hooks/DocPage/useAddTypeDocs.js";
import {useStore} from "vuex";


export default {
  components: {MyButton, MyInput},
  setup(){
    const store = useStore()
    const name = ref('')

    function submit(){
      if(name.value && name.value.trim() !== '' ) {
        useAddTypeDocs({name: name.value}).then(()=>{
          store.dispatch('fetchDocs')
          name.value = ''
        })
      }
      else{
        alert('Не все поля заполнены')
      }
    }

    return {name, submit}
  }
}
</script>

<style lang="scss" scoped>

</style>