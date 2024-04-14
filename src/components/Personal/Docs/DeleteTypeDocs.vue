<template>
  <div>
    <h3>Удаление разновидности документа</h3>

    <select class="select" v-model="selectType">
      <option :value="null" disabled>Выберите тип документа</option>
      <option v-for="item in docs" :value="item.id">{{item.type}}</option>
    </select>

    <my-button :color="'blue'" class="btn" @click="submit">Удалить тип</my-button>
  </div>
</template>

<script>
import MyInput from "../../UI/MyInput.vue";
import MyButton from "../../UI/MyButton.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {useDeleteType} from "../../hooks/DocPage/useDeleteType.js";

export default {
  components: {MyButton, MyInput},
  setup(){
    const store = useStore()
    const docs = computed(() => store.getters.getDocs);
    const selectType = ref(null)
    function submit(){
      if(selectType.value){
        useDeleteType({id: selectType.value}).then(()=>{
          store.dispatch('fetchDocs')
        })
      }

    }
    return {docs, selectType, submit}
  }
}
</script>

<style lang="scss" scoped>
@import "../../../variables";
.select{
  background: #eeeeee;
  border-radius: 20px;
  height: 50px;
  width: 300px;
  font-size: 18px;
  padding: 5px;
  margin: 15px 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none !important;
  option{
    font-size: 18px;
  }
}
.btn{
  &:hover{
    border: solid $c_blue 1px;
  }

}
</style>