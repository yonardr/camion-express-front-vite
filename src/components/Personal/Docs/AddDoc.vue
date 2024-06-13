<template>
  <div style="max-height: 600px">
    <h3>Добавление документа</h3>

    <my-input
        v-model="name"
        :type="'personal'"
        placeholder="Введите название документа"
    />

    <select class="select" v-model="selectType" >
      <option :value="null" disabled>Выберите тип документа</option>
      <option v-for="item in docs" :value="item.id">{{item.type}}</option>
    </select>


    <my-input-file v-model="file"/>

    <my-button :color="'blue'" class="btn" @click="submit">Добавить файл</my-button>
  </div>
</template>

<script>
import MyInputFile from "../../UI/MyInputFile.vue";
import MyInput from "../../UI/MyInput.vue";
import MyButton from "../../UI/MyButton.vue";
import MyDialog from "../../UI/MyDialog.vue";
import ViewDocs from "../../Docs/ViewDocs.vue";
import {useFetchTypesDocs} from "../../hooks/DocPage/useFetchTypesDocs.js";
import {computed, ref, watch} from "vue";
import {useAddDoc} from "../../hooks/DocPage/useAddDoc.js";
import {useStore} from "vuex";

export default {
  components: {MyButton, MyInput, MyInputFile, MyDialog, ViewDocs},

  setup(props){
    const store = useStore()
    const docs = computed(() => store.getters.getDocs);
    const selectType = ref(null)
    const file = ref(null)
    watch(file, (i,k)=>console.log(i))
    const name = ref(null)
    function submit(){
      if(selectType.value !== null &&
          file.value !== null &&
          name.value &&
          name.value.trim() !== '' ) {
        useAddDoc({name: name.value, type: selectType.value, file: file.value}).then(()=>{
          store.dispatch('fetchDocs')
        })
      }
      else{
        alert('Не все поля заполнены')
      }
    }

    return {selectType, file, submit, name, docs}
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