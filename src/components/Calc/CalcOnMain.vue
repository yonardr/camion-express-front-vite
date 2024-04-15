<template>
  <div>
  <div class="container">
    <div class="interaction">
      <div class="input__fields btns">
        <my-button color="blue" class="btn left" :class="{active: packing.pallet_board}"
                   @click="changePacking('pallet_board')">Паллетный борт
        </my-button>
        <my-button color="blue" class="btn between" :class="{active: packing.pallet}"
                   @click="changePacking('pallet')">Паллета
        </my-button>
        <my-button color="blue" class="btn right" :class="{active: packing.wooden}"
                   @click="changePacking('wooden')">Деревянная упаковка
        </my-button>
      </div>
      <div class="input__fields">
        <div class="count_bord" v-show="packing.pallet_board || packing.pallet">
          <my-button color="blue" :disabled='form.count_packing.value<=0' @click="form.count_packing.value--">-</my-button>
          <input class="select" v-model="form.count_packing.value"/>
          <my-button color="blue" @click="form.count_packing.value++">+</my-button>
        </div>
        <div>
          <input type="checkbox" id="stretch_film" v-model="packing.stretch_film" class="stretch_film"/>
          <label for="stretch_film">Стрейч пленка</label>
        </div>
      </div>

      <div>
        <div class="input__fields">
          <div class="input">
            <div class="input__title">
              Откуда
            </div>
            <select class="select" @change="onChangePoint_A($event)">
              <option v-for="item in points_a" :value=item.id :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="input">
            <div class="input__title">
              Куда
            </div>

            <select class="select" @change="onChangePoint_B($event)">
              <option v-for="item in directions" :key="item.id" :value="item.id_direction">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="input__fields">
          <div class="input">
            <div class="input__title">
              Вес
            </div>
            <div><input v-model="form.weight.value" class="select" type="number" @input="inputParse($event, 'weight')">
            </div>
            <div><input type="range" v-model="form.weight.value" max="5000" class="input__range"
                        :style="inputProgress('weight')"
                        @input="inputParse($event, 'weight')"
            ></div>
            <small v-if="form.weight.errors.minValue" style="color:#ff7b47">Введите корректные значения</small>
          </div>
          <div class="input">
            <div class="input__title">
              Объем
            </div>
            <div><input v-model="form.volume.value" class="select" type="number" @input="inputParse($event, 'volume')">
            </div>
            <div><input type="range" v-model="form.volume.value" max="30" class="input__range" step="0.1"
                        :style="inputProgress('volume')"
                        @input="inputParse($event, 'volume')"
            ></div>
            <small v-if="form.volume.errors.minValue" style="color:#ff7b47">Введите корректные значения</small>
          </div>

        </div>
      </div>

    </div>
    <div class="total__price">
      <div>
        <h6>
          Стоимость грузоперевозки
        </h6>
        <h3>{{ price_direction }} ₽</h3>
        <h6>
          Стоимость упаковки
        </h6>
        <h3>{{ price_packing }} ₽</h3>
      </div>
      <div>
        <h6>
          Стоимость упаковки
        </h6>
        <h3>{{ price_total }} ₽</h3>
        <h6>
          Сроки доставки
        </h6>
        <h3>{{ direction_info.deadline }}</h3>
      </div>
    </div>

  </div>
  <div class="more_detailed">
    <router-link :to="{name:'calc', hash: '#calc'}" style="text-decoration: none; display: flex">
      <my-button color="orange">Рассчитать подробнее</my-button>
    </router-link>
  </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import MyButton from "../UI/MyButton.vue";
import {useSubmit} from "../hooks/MainPage/useSubmit.js";
import {useLoadingDataCalc} from "./useLoadingDataCalc.js";
import {useInputsCalc} from "./useInputsCalc.js";
import {useNumbersAnimation} from "../hooks/useNumbersAnimation.js";
import {useCalc} from "./useCalc.js";
import {useCalcPacking} from "./useCalcPacking.js";

const minValue = value => Number(value) >= 0
export default {
  components: {MyButton},
  setup() {

    const {points_a, directions, direction_info, packing} = useLoadingDataCalc()

    const form = useSubmit({
      weight: {
        value: 1,
        validators: {minValue}
      },
      volume: {
        value: 0.01,
        validators: {minValue}
      },
      count_packing: {
        value: 0
      }
    })

    const {onChangePoint_A, onChangePoint_B, changePacking, inputProgress, inputParse} = useInputsCalc(form)

    const total_price = ref(0)
    const packing_price = ref(0)
    const price_sum = ref(0)
    const price_direction = useNumbersAnimation(total_price)
    const price_packing = useNumbersAnimation(packing_price)
    const price_total = useNumbersAnimation(price_sum)

    watch(form, async() => {
      total_price.value = await useCalc(direction_info, form)
      packing_price.value = useCalcPacking(packing, form)
      price_sum.value = total_price.value + packing_price.value
    })


    watch(direction_info, async() => {
      total_price.value = await useCalc(direction_info, form)
      price_sum.value = total_price.value + packing_price.value
    })


    watch(packing.value, () => {
      packing_price.value = useCalcPacking(packing, form)
      price_sum.value = total_price.value + packing_price.value
    })


    return {
      price_total,
      price_packing,
      inputProgress,
      points_a,
      onChangePoint_A,
      onChangePoint_B,
      directions,
      direction_info,
      form,
      packing,
      changePacking,
      total_price,
      inputParse,
      price_direction
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';

h6 {
  margin-top: 20px;
  color: $c_gray
}

.container {
  display: flex;
  justify-content: center;
}

.total__price {
  border-left: 1px solid $c_blue;
  padding: 20px;
}

.title {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.select {
  margin-bottom: 5px;
  width: 250px;
  height: 60px;
  border-radius: 20px;
  border: 2px solid $c_gray;
  font-size: 18px;
  padding: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none !important;
  background-color: #fff;
  color: #000;
}

.input__fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  .input {
    padding: 10px 0 0;

    .input__title {
      margin: 0 0 5px 5px;
      font-weight: bold;
    }
  }
}

.input__range {
  position: relative;
  top: -22px;
  left: 19px;
  width: 210px;
}

input[type=range] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: $c_gray;
  height: 2px;
}

/* Специальные правила для браузеров на движках WebKit/Blink */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid $c_orange;
  height: 16px;
  width: 16px;
  border-radius: 103px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Добавляем классные эффекты для слайдера! */
}


.btns {
  justify-content: center
}

.btn {
  color: $c_blue;
  background-color: #fff;
  font-size: 14px;

  &.between {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  &.left {
    border-radius: 37px 0 0 37px;
  }

  &.right {
    border-radius: 0 37px 37px 0;
  }

  &:hover {
    color: #fff;
    background-color: $c_orange;
    border-color: $c_orange;
  }

  &.active {
    color: #fff;
    background-color: $c_blue;
    border-color: $c_blue;
  }
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

.stretch_film {
  display: none;
}

.stretch_film + label {
  position: relative;
  padding-left: 30px;
  height: 1.5em;
  display: flex;
  align-items: center;
  color: #000;
  cursor: pointer;
  user-select: none;
}

.stretch_film + label:before {
  content: '';
  position: absolute;
  left: 3px;
  top: 1px;
  width: 15px;
  height: 15px;
  border: 4px solid $c_blue;
  border-radius: 20px;
}

.stretch_film:checked + label::before {
  border-color: $c_orange;
}

.more_detailed{
margin-left: 85px;
}
@media (max-width: 1024px) {
  .more_detailed{
    margin: 0;
    display: flex;
    justify-content: center
  }
}
@media (max-width: 768px) {
  .interaction {
    display: flex;
    flex-direction: column-reverse;
  }
  .input__fields {
    flex-direction: column;
    align-items: start;
    padding-bottom: 0;

    &.btns {
      button {
        border-radius: 30px;
      }
    }

  }
  .more_detailed{
    margin-top: 10px;
  }

}

@media (max-width: 415px) {
  .container {
    flex-direction: column;
  }
  .total__price {
    width: 100%;
    border-left: 0;
    display: flex;
    justify-content: space-between;

    div {
      padding: 5px;
    }
  }

  .input__fields {
    align-items: center;

    .select {
      width: 300px;
    }
  }
  .count_bord {
    margin-bottom: 10px;
    .select {
      width: 100px;
    }
  }
}
</style>