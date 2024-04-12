<template>
  <div>
  <div class="page">
    <div class="card">
    <AddPointA />
    </div>

    <div class="card">
      <DeletePointA />
    </div>

    <div class="card">
      <AddDirection />
    </div>
<div>
    <CalcDirection />


    <table class="table" >
      <thead>
      <tr>
        <th>№</th>
        <th>Город</th>
        <th>Сроки доставки</th>
        <th>Минимальная стоимость</th>
        <th>до 100 кг <br>до 1 м³</th>
        <th>101-250 кг <br>1,01-2м³</th>
        <th>251-500 кг <br>2,01-4м³</th>
        <th>501-1500 кг <br>4,01-6м³</th>
        <th>1501-3000кг <br>6,01-12м³</th>
        <th>3001-5000кг <br>12,0-20м³</th>
        <th>от 5001 кг <br>20,01-30м³</th>
      </tr>

        <tr v-for="item in arrayTable">
          <td><div class="center">{{item.id}}</div></td>
          <td><div class="center">{{item.point_b[0].name}}</div></td>
          <td><div class="center">{{item.deadline}}</div></td>
          <td><div class="center">{{item.min_price}}</div></td>
          <td v-for="(item2, index) in item.weights">
            <div class="center"><td><div class="center">{{item.weights[index].price}}</div> <div class="center">{{item.volumes[index].price}}</div> </td></div>
          </td>
        </tr>
      </thead>


    </table>
</div>
  </div>
  </div>
</template>

<script>
import CalcDirection from "../Calc/CalcDirection.vue";
import {useLoadingDataCalc} from "../Calc/useLoadingDataCalc.js";
import {ref, watch} from "vue";
import {useCalcGetDirection} from "./Calc/hooks/useCalcGetDirection.js";
import AddPointA from "./Calc/AddPointA.vue";
import DeletePointA from "./Calc/DeletePointA.vue";
import AddDirection from "./Calc/AddDirection.vue";

export default {
  components: {AddDirection, DeletePointA, AddPointA, CalcDirection},
  setup(){
    const arrayTable = ref([])

    const {directions} = useLoadingDataCalc()

    watch(directions, ()=>{
      arrayTable.value.length = 0
      directions.value.map(async(elem)=>{
        const res = await useCalcGetDirection({id: elem.id_direction})
        arrayTable.value.push(res)
      })
    })

    return {directions, arrayTable}
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.page{

  display: flex;
  flex-wrap: wrap
}
.card{
  width: 700px;
  padding: 25px;
  margin: 25px;
  @include card(white);
}
.table{
  width: 1500px;
}
th{
  width: 150px;
}

.center{
  display: flex;
  justify-content: center;
}

</style>