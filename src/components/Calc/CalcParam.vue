<template>
  <div class="card">
    <div class="title">Параметры груза</div>
    <div class="input__fields beginning">
      <my-button
          color='orange'
          class="switcher"
          :class="{active: paramType}"
          @click="paramType=false"
      >Одно или несколько мест отдельно
      </my-button>
      <my-button
          color='orange'
          class="switcher"
          :class="{active: !paramType}"
          @click="paramType=true"
      >Общий вес и объем
      </my-button>
    </div>
<!--    {{cargo}}-->
<!--    //////-->
<!--    {{cargo_current}}-->


    <div v-if="!paramType">
      <div class="input__fields">
        <div class="input__fields place__group">
          <div v-for="item in cargo[cargo_current-1].places">
            <my-button
                color="orange"
                class="btn"
                :class="activePlace(item.id)"
                @click="changeCargo(item.id)"
            >{{ item.idArray }} место
              <div class="delete" @click="deletePlace(item)">x</div>
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
              <input class="mini__input" v-model="form.volume.length" type="number" min="0" />
            </div>
          </div>
          <div class="input">
            <div class="input__title">Ширина</div>
            <div class="input__unit">
              <input class="mini__input" v-model="form.volume.width" type="number" min="0" />
            </div>
          </div>
          <div class="input">
            <div class="input__title">Высота</div>
            <div class="input__unit">
              <input class="mini__input" v-model="form.volume.height" type="number" min="0" />
            </div>
          </div>
          <div class="input">
            <div class="input__title">Объем</div>
            <div class="input__unit m3">
              <input class="mini__input" v-model="form.volume.value" readonly />
            </div>
          </div>
        </div>


        <div class="input__fields">
          <div class="input">
            <div class="input__title">Вес</div>
            <div class="input__unit kg">
              <input class="mini__input" v-model="form.weight.value" type="number" min="0"/>
            </div>
          </div>
          <div class="input">
            <div class="input__title">Одинаковые места</div>
            <div>
              <div class="count_bord">
                <my-button color="blue" :disabled='form.same_places<=0' @click="form.same_places--" style="padding: 18px">-</my-button>
                <input class="mini__input" v-model="form.same_places" type="number"/>
                <my-button color="blue" @click="form.same_places++" style="padding: 18px">+</my-button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div style="display: flex;">
      <small v-if="form.volume.length > 13.5" style="color:#ff7b47; ">Максимально допустимая длина груза 13.5 м (негабаритный груз)</small>
      <small v-if="form.volume.width > 2.45" style="color:#ff7b47; ">Максимально допустимая ширина груза 2.45 м (негабаритный груз)</small>
      <small v-if="form.volume.height > 2.7" style="color:#ff7b47; ">Максимально допустимая высота груза 2.7 м (негабаритный груз)</small>
      <small v-if="form.volume.value > 89.3" style="color:#ff7b47; ">Максимально допустимый объем груза 89.3 м3 (негабаритный груз)</small>
      <small v-if="form.weight.value > 20000" style="color:#ff7b47; ">Максимально допустимый вес груза 20 тонн (негабаритный груз)</small>
      </div>
    </div>

    <div v-if="paramType">

      <div class="input__fields total_weight">

        <div class="input">
          <div class="input__title">Объем</div>
          <div class="input__unit m3">
            <input class="mini__input total_weight" v-model="form.volume.value" type="number"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Вес</div>
          <div class="input__unit kg">
            <input class="mini__input total_weight" v-model="form.weight.value" type="number"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Макс. вес</div>
          <div class="input__unit kg">
            <input class="mini__input total_weight" v-model="form.weight.value" type="number"/>
          </div>
        </div>

      </div>


      <div class="input__fields total_weight">
        <div class="input">
          <div class="input__title">Макс. длина</div>
          <div class="input__unit">
            <input class="mini__input total_weight" v-model="form.volume.length" type="number"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Макс. ширина</div>
          <div class="input__unit">
            <input class="mini__input total_weight" v-model="form.volume.width" type="number"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Макс. высота</div>
          <div class="input__unit">
            <input class="mini__input total_weight" v-model="form.volume.height" type="number"/>
          </div>
        </div>
      </div>
      <div style="display: flex;">
        <small v-if="form.volume.length > 13.5" style="color:#ff7b47; ">Максимально допустимая длина груза 13.5 м (негабаритный груз)</small>
        <small v-if="form.volume.width > 2.45" style="color:#ff7b47; ">Максимально допустимая ширина груза 2.45 м (негабаритный груз)</small>
        <small v-if="form.volume.height > 2.7" style="color:#ff7b47; ">Максимально допустимая высота груза 2.7 м (негабаритный груз)</small>
        <small v-if="form.volume.value > 90" style="color:#ff7b47; ">Максимально допустимый объем груза 89.3 м3 (негабаритный груз)</small>
        <small v-if="form.weight.value > 5000" style="color:#ff7b47; ">Максимально допустимый вес груза 20 тонн (негабаритный груз)</small>
      </div>
    </div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <div class="input">
          <div class="input__title">Характер груза</div>
          <input class="mini__input long" v-model="form.cargo_type" placeholder="Мебель, шины, мед. оборудование"/>
        </div>
      </div>
      <div class="input__fields">
        <div class="input">
          <div class="input__title">Оценочная стоимость груза</div>
          <div class="input__unit rub">
            <input class="mini__input long" v-model="form.estimated_price_cargo" type="number"/>
          </div>

        </div>
      </div>
    </div>

    <div class="title">Упаковка</div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <input type="checkbox" id="check_rigid_packaging" v-model="packing.pallet_board"
               @click="changePacking('pallet_board')"/>
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
          <my-button color="blue" :disabled='form.count_packing.value<=0' @click="form.count_packing.value--">-</my-button>
          <input class="mini__input" v-model="form.count_packing.value"/>
          <my-button color="blue" @click="form.count_packing.value++">+</my-button>
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
        <div class="count_bord">
          <my-button color="blue" :disabled='form.count_packing.value<=0' @click="form.count_packing.value--">-</my-button>
          <input class="mini__input" v-model="form.count_packing.value"/>
          <my-button color="blue" @click="form.count_packing.value++">+</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "../UI/MyButton.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {useStore} from "vuex";
import {useInputsCalc} from "./useInputsCalc.js";
import {useCalc} from "./useCalc.js";
import {useCalcPacking} from "./useCalcPacking.js";

export default {
  components: {MyButton},
  setup() {
    const store = useStore()
    const {direction_info, packing, cargo_current, cargo} = useLoadingDataCalc()
    const {changePacking, inputParse} = useInputsCalc()

    const form = reactive({
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
      estimated_price_cargo: 0,
      count_packing: {
        value: 0
      },
      packaging: {
        pallet_board: false,
        pallet: false,
        wooden: false,
        stretch_film: false
      },
    })
    const placeArray = ref([{
      id: (new Date()).getTime(),
      idArray: 1,
      volume: {
        length: 0,
        width: 0,
        height: 0,
        value: 0
      },
      active: true,
      weight: {
        value: 0
      },
    }])
    const placeId = ref(placeArray.value[0].id)
    const paramType = ref(false)

    onMounted(()=>{
      store.commit('UpdateCargoById', {places: placeArray.value, current_cargo: cargo_current.value})
    })

    function addPlace() {

      const id = (new Date()).getTime();
      placeArray.value.push({
        id: id,
        idArray: placeArray.value[placeArray.value.length-1].idArray + 1,
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
        estimated_price_cargo: 0,
        count_packing: 0,
      })
      updateData()
      changePlace(id)
      updateData()
    }

    const deletePlace = (item) => {
      if (item.idArray !== 1) {
        placeArray.value = placeArray.value.filter((elem) => elem.id !== item.id)
        changePlace(placeArray.value[0].id)
        updateData()

      }
    }


    const activePlace = (id) => {
      if (placeId.value === id) return ''
      else return 'active'
    }

    function changePlace(id) {
      placeId.value = id
      cargo.value.map((item) => {
        item.places.map((item2) =>{
          if (item2.id === id) {
            const current_place = item2
            current_place.active = true
            form.volume.length = current_place.volume.length
            form.volume.width = current_place.volume.width
            form.volume.height = current_place.volume.height
            form.volume.value = current_place.volume.value
            form.weight.value = current_place.weight.value
            form.same_places = current_place.same_places
            form.cargo_type = current_place.cargo_type
            form.estimated_price_cargo = current_place.estimated_price_cargo
            form.count_packing.value = current_place.count_packing

            // form.packaging.pallet_board = current_place.packing.pallet_board
            // form.packaging.pallet = current_place.packing.pallet
            // form.packaging.wooden = current_place.packing.wooden
            // form.packaging.stretch_film = current_place.packing.stretch_film
          }
          else item2.active = false
        })

      })
    }

    watch(paramType, ()=>{
      if(!paramType.value) form.volume.value = form.volume.height * form.volume.width * form.volume.length
    })

    watch(form.volume, () => {
      if(!paramType.value) form.volume.value = form.volume.height * form.volume.width * form.volume.length
    })


    watch(direction_info, ()=> {
      cargo.value.map((item) =>{
        if(item.id === cargo_current.value){
          item.places.map((elem)=>{
            elem.price = useCalc(direction_info, elem)
          })
        }
      })
    })

    watch(form, () => updateData())
    watch(direction_info, ()=> updateData())
    watch(packing.value, () => {
      placeArray.value.map((item, index) => {
        if (item.id === placeId.value) {
          const current_place = placeArray.value[index]
          current_place.packimg_price = useCalcPacking(packing, form)
          current_place.packing = {...packing.value}
        }
      })
      store.commit('UpdateCargoById', {current_cargo: cargo_current.value, places: placeArray.value})

    })
    watch(cargo_current, (value, oldValue) => {
      if(cargo_current.value !== oldValue){
        cargo.value.map((item) => {
          if(item.id === cargo_current.value){
            placeArray.value.length = 0
            item.places.map((item2)=>{
              placeArray.value.push(item2)
            })

            changePlace(placeArray.value[0].id)
            updateData()
          }

        })
      }
    })


    function updateData(id = 0) {
      placeArray.value.map(async (item, index) => {
        if (item.id === placeId.value) {
          const current_place = placeArray.value[index]
          current_place.volume.length = form.volume.length
          current_place.volume.width = form.volume.width
          current_place.volume.height = form.volume.height
          current_place.volume.value = form.volume.value
          current_place.weight.value = form.weight.value
          current_place.same_places = form.same_places
          current_place.cargo_type = form.cargo_type
          current_place.estimated_price_cargo = form.estimated_price_cargo
          current_place.count_packing = form.count_packing.value
          if(form.same_places > 0){
            current_place.price = await useCalc(direction_info, form) * (form.same_places + 1)
            current_place.packimg_price = useCalcPacking(packing, form) * (form.same_places + 1)
            current_place.insurance = insurance(form.estimated_price_cargo)
          }
          else{
            current_place.price = await useCalc(direction_info, form)
            current_place.packimg_price = useCalcPacking(packing, form)
            current_place.insurance = insurance(form.estimated_price_cargo)
          }

        }
      })
      if(id === 0) store.commit('UpdateCargoById', {current_cargo: cargo_current.value, places: placeArray.value})
      else {
        store.commit('UpdateCargoById', {current_cargo: id, places: placeArray.value})
      }
    }

    function insurance(num){
      if(num === 0) return 60;
      else if ((0.1 * (1/100)* num) <= 60) return 60
      else return 0.1 * (1/100) * num
    }


    return {
      cargo_current,
      cargo,
      changePacking,
      placeArray,
      deletePlace,
      addPlace,
      activePlace,
      changeCargo: changePlace,
      paramType,
      form,
      packing,
      inputParse
    }
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

  &.total_weight {
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
    top: 10px;
    font-size: 16px;
    color: #86868b;
  }
  &.m3::before {
    content: "м³";
  }
  &.kg::before {
    content: "кг";
  }
  &.rub::before {
    content: "₽";
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

  &.total_weight {
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

.active {
  color: $c_orange;
  background-color: #fff;
}

.count_bord {
  display: flex;
  height: 48px;
  align-items: center;

  input {
    margin: 5px;
    height: 100%;
    width: 80px;
  }
}
input{
  padding: 10px;
  font-size: 16px;
  font-family: Montserrat,serif;
  font-weight: 500;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
@media (max-width: 1050px) {
  .input__fields{
    width: 100%;
    flex-direction: column;
  }
  .mini__input, .input, .input__unit {
    width: 100%;
    &.long{
      width: 100%;
    }
  }
}
</style>