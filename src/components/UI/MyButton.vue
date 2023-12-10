<template>
  <button v-bind:class="applyColor">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
  props:{
    color: {
      type: String
    }
  },
  computed: {
    applyColor(){
      if(this.color === 'orange') return 'btn__orange'
      else if(this.color === 'blue') return 'btn__blue'
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../variables";
.btn__orange{
  @include btn__universal($c_orange)
}
.btn__blue{
  @include btn__universal($c_blue)
}
</style>