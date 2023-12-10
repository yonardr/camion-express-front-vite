<template>
  <div class="page">

    <div class="card">
    <ViewDocs :deleteField="true"></ViewDocs>
    </div>

    <div class="card">
      <h3>Добавление документа</h3>

      <my-input
          v-model="name"
          :type="'personal'"
          placeholder="Введите название документа"
      />

      <select class="select" v-model="selectType" >
        <option :value="null" disabled>Выберите тип документа</option>
        <option v-for="item in types" :value="item.id">{{item.name}}</option>
      </select>


      <my-input-file v-model="file"/>

      <my-button :color="'blue'" class="btn" @click="submit">Добавить файл</my-button>

    </div>
  </div>
</template>

<script>

import ViewDocs from "../components/Docs/ViewDocs.vue";
import {ref, watch} from "vue";
import MyDialog from "../components/UI/MyDialog.vue";
import {useFetchTypesDocs} from "../components/hooks/DocPage/useFetchTypesDocs";
import MyInputFile from "../components/UI/MyInputFile.vue";
import MyInput from "../components/UI/MyInput.vue";
import MyButton from "../components/UI/MyButton.vue";
import {useAddDoc} from "../components/hooks/DocPage/useAddDoc";

export default {
  components: {MyButton, MyInput, MyInputFile, MyDialog, ViewDocs},

setup(props){
    const {types} = useFetchTypesDocs()
    const selectType = ref(null)
    watch(selectType, (i,k)=>console.log(i))
    const file = ref(null)
    watch(file, (i,k)=>console.log(i))
    const name = ref(null)
    function submit(){
      if(selectType.value !== null &&
          file.value !== null &&
          name.value &&
          name.value.trim() !== '' ) {
          useAddDoc({name: name.value, type: selectType.value, file: file.value})
      }
      else{
        alert('Не все поля заполнены')
      }
    }

    return {types, selectType, file, submit, name}
}
}
</script>

<style lang="scss" scoped>
@import "../variables";
.page{
  display: flex;
}
.card{
  margin: 25px;
  width: 700px;
  padding: 25px;
  @include card(white);


}

.select{
  background: #eeeeee;
  border-radius: 20px;
  height: 50px;
  width: 300px;
  font-size: 18px;
  padding: 5px;
  margin: 15px 0;
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