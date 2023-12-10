<template>
  <div>
    <h2>ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
    <div class="items">
      <AdvantageItem
          v-for="item in $store.state.advantages.items"
          :item="item"
          :key="item.id"
      />

    </div>
  </div>
</template>

<script>
import AdvantageItem from "../MainPage/AdvantageItem.vue";

export default {
  components: {AdvantageItem},
}
</script>

<style scoped lang="scss">
@import '../../variables';

.items{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>