<template>
  <div class="module">
  <div v-for="item in docs">
    <h5>{{item.type}}</h5>
    <div v-if="item.obj" v-for="i in item.obj" class="block">
      <a :href="f(i.path)" target="_blank">{{i.name}} </a>
      <my-button
          class="btn"
          :color="'blue'"
          v-if="deleteField"
          @click="id=i.id;dialogVisible=true"
      >
        X
      </my-button>
    </div>
  </div>
    <my-dialog v-model:show="dialogVisible">
      <my-button :color="'orange'" @click="deleteDoc">Удалить</my-button>
    </my-dialog>
  </div>
</template>

<script>
import {useFetchDocs} from "../hooks/DocPage/useFetch.js";
import {ref, watch} from "vue";
import MyDialog from "../UI/MyDialog.vue";
import MyButton from "../UI/MyButton.vue";
import {useDeleteDoc} from "../hooks/DocPage/useDeleteFile";
export default {
  components: {MyButton, MyDialog},
  props: {
    deleteField: false,
  },
setup(props, context){
  const id = ref (null)
  const {docs} = useFetchDocs();
  const dialogVisible = ref(false)
  function f(path){
    return `${import.meta.env.VITE_APP_API_URL}/documents/${path}`
  }
  function deleteDoc(){
    const {count} = useDeleteDoc({id})
    if (count > 0) alert('Удалил все')
    else alert('Не удалил')
  }

  return {id, docs, f, dialogVisible, deleteDoc}
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
</style>