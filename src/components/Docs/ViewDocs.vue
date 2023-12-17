<template>
  <div class="module">
  <div v-for="item in docs">
    <h5>{{item.type}}</h5>
    <div v-if="item.obj" v-for="(i) in item.obj" class="block">
      <a :href="f(i.path)" target="_blank">{{i.name}} </a>
      <my-button
          class="btn"
          :color="'blue'"
          v-if="deleteField"
          @click="id=i.id;name_file=i.name;dialogVisible=true;"
      >
        X
      </my-button>
    </div>
  </div>
    <my-dialog v-model:show="dialogVisible">
      <div>
        <div class="dialog__title">Вы точно хотите удалить документ <b>{{name_file}}</b></div>
      <div class="dialog__btn">
      <my-button :color="'blue'" @click="deleteDoc">Удалить</my-button>
      <my-button :color="'blue'" @click="dialogVisible=false">Отменить</my-button>
      </div>
      </div>
    </my-dialog>

    <my-dialog v-model:show="dialogErrorVisible">
      <div class="dialog__error">
        <img src="../../assets/dialog/error.svg" width="200"/>
        <div class="dialog__title">Произошла неизвестная ошибка</div>
        <my-button :color="'blue'" @click="dialogErrorVisible=false">Ок</my-button>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import {useFetchDocs} from "../hooks/DocPage/useFetch.js";
import {computed, onMounted, ref, watch} from "vue";
import MyDialog from "../UI/MyDialog.vue";
import MyButton from "../UI/MyButton.vue";
import {useDeleteDoc} from "../hooks/DocPage/useDeleteFile";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {MyButton, MyDialog},
  props: {
    deleteField: false,
  },
setup(props, context){
  const id = ref (null)
  const name_file = ref(null)
  const {docs} = useFetchDocs();
  const dialogVisible = ref(false)
  const dialogErrorVisible = ref(false)
  function f(path){
    return `${import.meta.env.VITE_APP_API_URL}/documents/${path}`
  }
  async function deleteDoc(){
    const {count} = await useDeleteDoc({id})
    if (count.value.message === "success") {
      //docs.value.splice(index.value, 1)
      alert("Удалил")
    }
    else dialogErrorVisible.value = true
  }
  //onMounted(()=> mapActions(['fetchDocs']))
  //const docs = computed(()=>mapGetters(['ShowDocs']))

  return {id, name_file, docs, f, dialogVisible, dialogErrorVisible, deleteDoc}
},

}
</script>

<style lang="scss" scoped>
@import '../../variables.scss';
.module{

}
h5{
  margin-top: 50px;
  font-size: 30px;
  color: $c_blue;
  line-height: 142%;
  font-weight: 700;
}
a{
  text-decoration: none;
}
.block{
  display: flex;
  align-items: center;
  justify-content: space-between
}
.btn{
  margin-left: 15px;
  height: 30px;
}
.dialog__btn{
  display: flex;
  justify-content: space-evenly;
}
.dialog__title{
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.dialog__error{
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog__title{
    margin-top: 15px;
    font-size: 25px;
  }
}

</style>