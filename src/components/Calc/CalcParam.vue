<template>
  <div class="card">
    <div class="title">Параметры груза</div>
    <div class="input__fields beginning">
      <my-button
          color='orange'
          class="switcher"
          :class="{active: paramType}"
          @click="paramType=false"
      >Одно или несколько мест отдельно</my-button>
      <my-button
          color='orange'
          class="switcher"
          :class="{active: !paramType}"
          @click="paramType=true"
      >Общий вес и объем</my-button>
    </div>
    <div v-if="!paramType">
    <div class="input__fields">
      <div class="input__fields place__group">
        <div v-for="item in placeArray">
          <my-button
              color="orange"
              class="btn"
              :class="activePlace(item.id)"
              @click="changeCargo(item.id)"
          >{{ item.id }} место
            <div class="delete" @click="deletePlace(item.id)">x</div>
          </my-button>
        </div>
      </div>

      <div>
        <my-button color="orange" class="switcher active" @click="addPlace">Добавить место</my-button>
      </div>
    </div>
    <div class="input__fields border-none">

      <div class="input__fields ">

        <div class="input">
          <div class="input__title">Длина</div>
          <div class="input__unit">
            <input class="mini__input"  v-model="form.volume.length"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Ширина</div>
          <div class="input__unit">
            <input class="mini__input"  v-model="form.volume.width"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Высота</div>
          <div class="input__unit">
            <input class="mini__input" v-model="form.volume.height"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Объем</div>
          <div class="input__unit">
            <input class="mini__input" v-model="form.volume.value" readonly/>
          </div>
        </div>

      </div>


      <div class="input__fields">
        <div class="input">
          <div class="input__title">Вес</div>
          <div class="input__unit">
            <input class="mini__input" v-model="form.weight.value"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Одинаковые места</div>
          <div class="input__unit">
            <input class="mini__input" v-model="form.same_places"/>
          </div>
        </div>
      </div>

    </div>
    </div>

    <div v-if="paramType">

        <div class="input__fields total_weight">

          <div class="input">
            <div class="input__title">Объем</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>
          <div class="input">
            <div class="input__title">Вес</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>
          <div class="input">
            <div class="input__title">Макс. вес</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>

        </div>


        <div class="input__fields total_weight">
          <div class="input">
            <div class="input__title">Макс. длина</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>
          <div class="input">
            <div class="input__title">Макс. ширина</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>
          <div class="input">
            <div class="input__title">Макс. высота</div>
            <div class="input__unit">
              <input class="mini__input total_weight"/>
            </div>
          </div>
        </div>

      </div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <div class="input">
          <div class="input__title">Характер груза</div>
          <input class="mini__input long" v-model="form.cargo_type"/>
        </div>
      </div>
      <div class="input__fields">
        <div class="input">
          <div class="input__title">Оценочная стоимость груза</div>
          <input class="mini__input long" v-model="form.estimated_price_cargo"/>
        </div>
      </div>
    </div>

    <div class="title">Упаковка</div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <input type="checkbox" id="check_rigid_packaging" v-model="packing.pallet_board" @click="changePacking('pallet_board')" />
        <label for="check_rigid_packaging">Паллетный борт</label>
      </div>
      <div class="input__fields">
        <input type="checkbox" id="check_der" @click="changePacking('wooden')" v-model="packing.wooden">
        <label for="check_der">Деревянная упаковка</label>
      </div>
    </div>
    <div class="input__fields border-none" v-show="packing.pallet_board">
      <div class="input__fields">
        <div class="count_bord">
          <my-button color="blue" @click="form.count_packing++">+</my-button>
          <input class="mini__input" v-model="form.count_packing" />
          <my-button color="blue" :disabled='form.count_packing<=0' @click="form.count_packing--">-</my-button>
        </div>
      </div>
    </div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <input type="checkbox" id="check_pallet_board" v-model="packing.pallet" @click="changePacking('pallet')"/>
        <label for="check_pallet_board">Паллета</label>
      </div>
      <div class="input__fields">
        <input type="checkbox" id="check_strech" v-model="packing.stretch_film">
        <label for="check_strech">Стрейч пленка</label>
      </div>
    </div>
    <div class="input__fields border-none" v-show="packing.pallet">
      <div class="input__fields">
        <div class="count_bord" >
          <my-button color="blue" @click="form.count_packing++">+</my-button>
          <input class="mini__input" v-model="form.count_packing"/>
          <my-button color="blue" :disabled='form.count_packing<=0' @click="form.count_packing--">-</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "../UI/MyButton.vue";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {useStore} from "vuex";
import {useInputsCalc} from "./useInputsCalc.js";
import {useCalc} from "./useCalc.js";
import {useCalcPacking} from "./useCalcPacking.js";
import {useSubmit} from "../hooks/MainPage/useSubmit.js";
const minValue = value => Number(value) >= 0
export default {
  components: {MyButton},
  setup() {
    const store = useStore()
    const defaultForm = {
      id: 1,
      volume: {
        length: 0,
        width: 0,
        height: 0,
        value: 0
      },
      weight: {
        value: 0
      },
      same_places: 0,
      cargo_type: '',
      estimated_price_cargo : 0,
      count_packing: 0,
    }
    const form = reactive(defaultForm)
    const placeArray = ref([])
    const placeId = ref(1)
    const paramType = ref(false)

    function addPlace(){
      placeArray.value.push({id: form.id, volume: form.volume.value})
      updateData()

      form.id = placeArray.value.length + 1

    }

    const deletePlace = (id) => {
      if(id !== 1){
        placeArray.value = placeArray.value.filter((item)=> item.id !== id)
      }
    }
    const activePlace = (id) => {
      if(placeId.value !== id) return 'active'
    }

    function changeCargo(id){
      placeId.value = id
      placeArray.value.map((value, index)=>{
        if(value.id === id) placeArray.value[index].active = true
        else placeArray.value[index].active = false
      })
    }
    const {direction_info, packing} = useLoadingDataCalc()
    const {changePacking} = useInputsCalc()


    watch(form.volume, ()=>{
        form.volume.value = form.volume.height *form.volume.width*form.volume.length
    })


    watch(form, ()=>updateData())
    watch(packing.value, ()=>updateData())

    function updateData(){
      form.price = useCalc(direction_info, form)
      form.packimg_price = useCalcPacking(packing, form)

      store.commit('UpdateCargoById', placeArray)
    }

    return {changePacking, placeArray,deletePlace, addPlace, activePlace, changeCargo, paramType, form, packing}
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";

.card {
  @include card(white);
  padding: 24px;
  width: 1000px;
}

.title {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.input__fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e8e8ed;
  padding: 20px;
  border-radius: 20px;

  .input {
    padding: 10px;

    .input__title {
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
  &.total_weight{
    justify-content: flex-start
  }
}

.input__fields {
  margin: 5px 0;

  &.border-none {
    border: none;
    padding: 0;
  }

  &.beginning {
    border: none;
    padding: 0;
    margin-bottom: 20px;
  }
}


.switcher {
  width: 100%;
  margin: 10px;

  &.active {
    color: $c_orange;
    background-color: #fff;
  }
}

.place__group {
  overflow-x: scroll;
  display: flex;
  justify-content: flex-start;
  width: 80%;
}

.place__item {
  background: $c_orange;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
  margin: 5px;
  display: flex;
}

.input__unit {
  display: inline-block;
  position: relative;

  &::before {
    content: "м";
    display: block;
    position: absolute;
    right: 8px;
    top: 5px;
    font-size: 20px;
    color: #86868b;
  }
}

.mini__input {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid $c_blue;

  &.long {
    width: 400px;
  }
  &.total_weight{
    width: 100%;
  }
}

label {
  margin-left: 5px;
}

.btn {
  width: 130px;
  padding: 0;
  font-size: 16px;
  margin: 5px;
  border-radius: 20px;
  &:hover {
    background-color: $c_orange;
    color: #fff;
  }

  .delete {
    margin-left: 15px;
    transition: 0.6s;

    &:hover {
      transform: scale(1.5);
      transition: 0.6s;
      margin-bottom: 3px;
    }
  }
}
.active{
  color: $c_orange;
  background-color: #fff;
}
.count_bord{
  display: flex;
  height: 48px;
  align-items: center;
  input{
    margin: 5px;
    height: 100%;
    width: 80px;
  }
}

</style>