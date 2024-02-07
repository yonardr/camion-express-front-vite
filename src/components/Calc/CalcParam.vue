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
            <input class="mini__input"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Ширина</div>
          <div class="input__unit">
            <input class="mini__input"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Высота</div>
          <div class="input__unit">
            <input class="mini__input"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Объем</div>
          <div class="input__unit">
            <input class="mini__input"/>
          </div>
        </div>

      </div>


      <div class="input__fields">
        <div class="input">
          <div class="input__title">Вес</div>
          <div class="input__unit">
            <input class="mini__input"/>
          </div>
        </div>
        <div class="input">
          <div class="input__title">Одинаковые места</div>
          <div class="input__unit">
            <input class="mini__input"/>
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
          <input class="mini__input long"/>
        </div>
      </div>
      <div class="input__fields">
        <div class="input">
          <div class="input__title">Оценочная стоимость груза</div>
          <input class="mini__input long"/>
        </div>
      </div>
    </div>

    <div class="title">Упаковка</div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <input type="checkbox" id="check_rigid_packaging">
        <label for="check_rigid_packaging">Жесткая упаковка</label>
      </div>
      <div class="input__fields">
        <input type="checkbox" id="check_pallet_board">
        <label for="check_pallet_board">Паллетный борт (индивидуальный)</label>
      </div>
    </div>
    <div class="input__fields border-none">
      <div class="input__fields">
        <input type="checkbox" id="check_palletizing">
        <label for="check_palletizing">Паллетирование</label>
      </div>
      <div class="input__fields">
        <input type="checkbox" id="">
        <label>Пузырчатая пленка</label>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "../UI/MyButton.vue";
import {ref} from "vue";

export default {
  components: {MyButton},
  setup() {

    const placeArray = ref([{id: 1}])
    const placeId = ref(1)
    const paramType = ref(false)

    function addPlace(){
      const value = placeArray.value.length + 1
      placeArray.value.push({id: value})
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

    return { placeArray,deletePlace, addPlace, activePlace, changeCargo, paramType}
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


</style>