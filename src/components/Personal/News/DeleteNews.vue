<template>
  <div class="card__container">
    <h3>Удаление новостей</h3>
    <div class="content">
      <select class="selected" v-model="selected">
        <option disabled>Выберите новость</option>
        <option v-for="option in options" :value="option.id">
          {{ option.title }}
        </option>
      </select>
      <my-button :color="'orange'" @click="submit">Удалить</my-button>
    </div>

  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import MyButton from "../../UI/MyButton.vue";
import {useDelNews} from "../../hooks/NewsPage/useDelNews.js";

export default {
  components: {MyButton},
  setup() {
    const selected = ref([])

    const store = useStore()
    const options = computed(() => store.getters.getNews);

    async function submit() {
      const {data} = await useDelNews({id: selected.value})
    }

    return {selected, options, submit}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../variables';

.selected {
  width: 100%;
  margin-top: 11px;
  border: solid 1px #252B42;
  border-radius: 20px;
  background: #F9F9F9;
  height: 53px;
  font-size: 16px !important;
  font-weight: 700 !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none !important;
  background-color: #fff;
  color: #000;
}

.card__container {
  margin: 25px;
  width: 350px;
  padding: 25px;
  height: 100%;
  @include card(white)
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>