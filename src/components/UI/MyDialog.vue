<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      required: false
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    }
  },
};
</script>

<style scoped lang="scss">
@import '../../variables';
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  z-index: 99999;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 37px;
  min-height: 50px;
  min-width: 300px;
  padding: 35px;
  border: 1px solid $c_blue;
  width: 700px;
  box-shadow: 15px 15px 15px 15px rgba(0.5, 0.5, 0.5, 0.17);
}



</style>
