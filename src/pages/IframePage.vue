<template>
  <div class="wrapper">
    <div class="container">
      <div class="interaction">
        <img src="../assets/logo.png" class="logo">
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
              <div class="input__unit">
                <input v-model="form.weight.value" class="select" type="number" max="5000">
              </div>
              <div style="height: 1px"><input type="range" v-model="form.weight.value" max="5000" class="input__range"
                          :style="inputProgress('weight')"
                          @input="inputParse($event, 'weight')"
              ></div>
              <small v-if="form.weight.errors.minValue" style="color:#ff7b47">Введите корректные значения</small>
            </div>
            <div class="input">
              <div class="input__title">
                Объем
              </div>
              <div class="input__unit m3">
                <input v-model="form.volume.value" class="select" type="number" max="30">
              </div>
              <div style="height: 1px"><input type="range" v-model="form.volume.value" max="30" class="input__range" step="0.1"
                          :style="inputProgress('volume')"
                          @input="inputParse($event, 'volume')"
              ></div>
              <small v-if="form.volume.errors.minValue" style="color:#ff7b47">Введите корректные значения</small>
            </div>

          </div>


      </div>
      <div class="total__price">
        <div>
          <h6>
            Приблизительная стоимость грузоперевозки
          </h6>
          <h3>{{ price_direction }} ₽</h3>
        </div>
        <div>
          <h6>
            Сроки доставки
          </h6>
          <h5>{{ direction_info.deadline }}</h5>
        </div>
      </div>

    </div>
    <div class="more_detailed">
      <a href="https://camionexpress.ru/calculator#calc" target="_blank" style="text-decoration: none; display: flex">
        <my-button color="orange" class="btn3">Рассчитать подробнее на нашем сайте
          <svg class="arrow__svg"
               viewBox="0 0 492.004 492.004">
            <g>
              <g>
                <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"/>
              </g>
            </g>
          </svg>
        </my-button>
      </a>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import MyButton from "../components/UI/MyButton.vue";
import {useSubmit} from "../components/hooks/MainPage/useSubmit.js";
import {useLoadingDataCalc} from "../components/Calc/useLoadingDataCalc.js";
import {useInputsCalc} from "../components/Calc/useInputsCalc.js";
import {useNumbersAnimation} from "../components/hooks/useNumbersAnimation.js";
import {useCalc} from "../components/Calc/useCalc.js";
import {useCalcPacking} from "../components/Calc/useCalcPacking.js";

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
@import '../variables';
.wrapper{
  border-radius: 20px;
}
.logo{
  width: 140px;
  height: 50px;
  margin: 0 auto;
}
h6 {

  color: $c_gray
}

.container {
  display: flex;
  justify-content: center;
}

.total__price {
  border-left: 1px solid $c_blue;
}

.title {
  margin: 10px 0;
  font-size: 28px;
  font-weight: bold;
}

.select {
  margin-bottom: 5px;
  width: 250px;
  height: 45px;
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
  padding: 5px;

  .input {
    padding: 5px 0 0;

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
    flex-direction: column;
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
  }

}
.arrow__svg{
  width: 20px;
  margin-left: 25px;
  fill: #fff;

}
.btn3{
  font-size: 14px;
}

.btn3:hover{
  .arrow__svg{
    fill: $c_orange;
    transition: .6s;
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
.input__unit {
  display: inline-block;
  position: relative;

  &::before {
    content: "кг";
    display: block;
    position: absolute;
    right: 8px;
    top: 18px;
    font-size: 18px;
    color: #86868b;
  }
  &.m3::before {
    content: "м³";
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>