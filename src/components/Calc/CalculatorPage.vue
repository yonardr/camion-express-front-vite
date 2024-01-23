<template>

  <div class="section">
    <h2 style="margin: 40px 0">КАЛЬКУЛЯТОР</h2>
      <div class="card card__header">

        <div class="title">Направление</div>

        <CalcDirection />

      </div>


      <div class="card card__footer">
        <div class="title">Параметры груза</div>
        <div class="input__fields beginning">
          <my-button color='orange' class="switcher active">Одно или несколько мест отдельно</my-button>
          <my-button color='orange' class="switcher">Общий вес и объем</my-button>
        </div>
        <div class="input__fields">
          <div class="input__fields place__group">
            <div v-for="item in ['1 место','2 место','3 место','4 место','5 место']" class="place__item">
              {{item}}
            </div>
          </div>

          <div><my-button color="orange" class="switcher active">Добавить место</my-button></div>
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

        <div class="input__fields border-none">
          <div class="input__fields">
            <div class="input">
              <div class="input__title">Характер груза</div>
              <input class="mini__input long" />
            </div>
          </div>
          <div class="input__fields">
          <div class="input">
            <div class="input__title">Оценочная стоимость груза</div>
            <input class="mini__input long" />
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

  </div>

</template>

<script>
import MyCombobox from "../UI/MyCombobox.vue";
import MyButton from "../UI/MyButton.vue";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import CalcDirection from "./CalcDirection.vue";

export default {
  components: {CalcDirection, MyButton, MyCombobox},
  setup(){
    const store = useStore()
    onMounted(() => store.dispatch('fetchPoints_a'))
    const points_a = computed(() => store.getters.getPoints_a);
    return {points_a}
  }
}

</script>

<style scoped lang="scss">
@import '../../variables';

.card{
  padding: 24px;
}
.card__header{

  @include card(white);
  margin-bottom: 20px;
}
.card__footer{
  @include card(white);
}
.title{
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
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
//____card_footer____
.card__footer{
  .input__fields{
    margin: 5px 0;
    &.border-none{
      border: none;
      padding: 0;
    }
    &.beginning{
      border: none;
      padding: 0;
      margin-bottom: 20px;
    }
  }
}


.switcher{
  width: 100%;
  margin: 10px;
  &.active{
    color: $c_orange;
    background-color: #fff;
  }
}
.place__group{
  display: flex;

}
.place__item{
  background: $c_orange;
  padding: 15px;
  border-radius: 20px;
  color: #fff;
  margin: 5px;
}
.input__unit{
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
.mini__input{
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid $c_blue;
  &.long{
    width: 400px;
  }
}
label{
  margin-left: 5px;
}
</style>