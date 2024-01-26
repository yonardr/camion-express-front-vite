<template>
  <div class="container">
    <div>
      <div class="input__fields btns">
        <my-button color="blue" class="btn left" :class="{active: packing.rigid_packaging}"
                   @click="changePacking('rigid_packaging')">Паллетный борт
        </my-button>
        <my-button color="blue" class="btn between" :class="{active: packing.palletizing}"
                   @click="changePacking('palletizing')">Паллета
        </my-button>
        <my-button color="blue" class="btn right" :class="{active: packing.bubble_wrap}"
                   @click="changePacking('bubble_wrap')">Деревянная упаковка
        </my-button>
      </div>
      <div class="input__fields">
        <div style="display: flex">
          <my-button color="blue">+</my-button>
          <input />
          <my-button color="blue">-</my-button>
        </div>
        <div>
          <input type="checkbox" id="stretch_film"/>
          <label for="stretch_film">Стрейч пленка</label>
        </div>
      </div>
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
          <div><input type="range" v-model="form.weight.value" max="5000"  class="input__range"
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
    <div class="total__price">
      <h6>
        Стоймость грузоперевозки
      </h6>
      <h3>{{ result }} ₽</h3>
      <h6>
        Стоймость упаковки
      </h6>
      <h3>1297 ₽</h3>
      <h6>
        Стоймость упаковки
      </h6>
      <h3>{{ result}} ₽</h3>
      <h6>
        Сроки доставки
      </h6>
      <h3>{{ direction_info.deadline }}</h3>

    </div>
  </div>

</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import MyButton from "../UI/MyButton.vue";
import {useSubmit} from "../hooks/MainPage/useSubmit.js";

const minValue = value => Number(value) >= 0
export default {
  components: {MyButton},
  setup() {
    const store = useStore()

    const points_a = computed(() => store.getters.getPoints_a);
    const directions = computed(() => store.getters.getDirections)
    const direction_info = computed(() => store.getters.getDirectionById)

    onMounted(() => store.dispatch('fetchPoints_a'))

    watchEffect(async () => {
      await store.dispatch('fetchDirections', {id: points_a.value[1]?.id})
    })
    watchEffect(async () => {
      await store.dispatch('fetchDirectionById', {id_direction: directions.value[0]?.id_direction})
    })

    const packing = computed(() => store.getters.getPacking)


    async function onChangePoint_A(event) {
      await store.dispatch('fetchDirections', {id: event.target.value})
    }

    async function onChangePoint_B(event) {
      await store.dispatch('fetchDirectionById', {id_direction: event.target.value})
    }

    function changePacking(change_key) {
      store.commit('updatePacking', change_key)
    }

    const form = useSubmit({
      weight: {
        value: 1,
        validators: {minValue}
      },
      volume: {
        value: 0.01,
        validators: {minValue}
      },
    })

    function inputParse(event, key) {
      if (event.target.value >= 5000 && key === 'weight') {
        event.target.value = 5000
      } else if (event.target.value >= 30 && key === 'volume') {
        event.target.value = 30
      } else {
        event.target.value = Number(event.target.value)
        if (form[key].value < 0) form[key].value = 0
      }
    }

    const fn = () => {
      if (form.valid) {
        let price_by_weight = 0
        let min_value = direction_info.value.weights[4].value
        let value_price = 0
        direction_info.value.weights.map((item) => {
          //alert(`${Math.fround(min_value)} >= ${Math.fround(item.value)} ${Math.fround(min_value) >= Math.fround(item.value)} ${Math.fround(min_value)} >= ${Math.fround(form.weight.value)} ${Math.fround(min_value) >= Math.fround(form.weight.value)}`)
          if (Math.fround(min_value) >= Math.fround(item.value) && Math.fround(min_value) >= Math.fround(form.weight.value)) {
            min_value = item.value
            value_price = item.price
            //alert(value_price)
          }
        })

        price_by_weight = form.weight.value * value_price
        //alert(`${form.weight.value} * ${value_price} =  ${price_by_weight}`)
        if (price_by_weight < direction_info.value.min_price) price_by_weight = direction_info.value.min_price


        let price_by_volume = 0
        direction_info.value.volumes.map((item) => {
          if (form.volume.value <= item.value) {
            price_by_volume = form.volume.value * item.price
            if (price_by_volume < direction_info.value.min_price) price_by_volume = direction_info.value.min_price
          }

        })

        total_price.value = Math.max(price_by_weight, price_by_volume)
      }
    }
    const total_price = ref(0)
    const result = ref(0)
    watch(form, fn)

    watch(total_price, (newValue, oldValue) => {
      if (oldValue < newValue) {
        for (let i = oldValue; i <= newValue; i += 10) {
          setTimeout(() => {
            result.value = i.toFixed()
          }, 300)
        }
      } else {
        for (let i = oldValue; i >= newValue; i -= 10) {
          setTimeout(() => {
            result.value = i.toFixed()
          }, 300)
        }
      }
      setTimeout(() => {
        result.value = total_price.value
      }, 300)
    })

    watch(direction_info, (newValue) => {
      total_price.value = newValue.min_price
      fn()
    })

    const inputProgress = (type) =>{
      let value = 0;
      if(type === 'weight') value = (form.weight.value)/(5000)*100
      if(type === 'volume') value = (form.volume.value)/(30)*100
      return{
        background: `linear-gradient(to right, #737373 0%, #ff7b47 10%, #ff7b47 ${value}%, #ff7b47 ${value+2}%, #737373 ${value+20}%, #737373 100%)`
      }
    }



    return {
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
      result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
h6{
  margin-top: 20px;
  color: $c_gray
}
.container {
  margin-bottom: 200px;
  display: flex;
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
}

.input__fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .input {
    padding: 10px;

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
</style>