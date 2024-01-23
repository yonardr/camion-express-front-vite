<template>
  <div class="container">
    <div class="input__fields">
      <div class="input">
        <div class="input__title">
          Откуда
        </div>
        <select class="select" @change="onChange($event)">
          <option v-for="item in points_a" :value=item.id>
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="input">
        <div class="input__title">
          Куда
        </div>

        <select class="select">
          <option v-for="item in directions" :key="item.id">
            {{item.name}}
          </option>
        </select>
      </div>
    </div>
    <input >
    <input type="range">
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

export default {
  setup(){
    const store = useStore()

    onMounted(() => store.dispatch('fetchPoints_a'))
    const points_a = computed(() => store.getters.getPoints_a);

    const directions = computed (()=> store.getters.getDirections)
     async function onChange(event) {
       await store.dispatch('fetchDirections', {id: event.target.value})
    }

    return {points_a, onChange, directions}
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin-bottom: 200px;

}
.title{
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}
.select{
  margin-bottom: 5px;
  width: 400px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid #86868b;
  font-size: 18px;
  padding: 10px;
}
.input__fields{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e8e8ed;
  padding: 20px;
  border-radius: 20px;
  .input{
    padding: 10px;
    .input__title{
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
}
</style>