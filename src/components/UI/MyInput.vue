<template>
  <input :value="modelValue" @input="updateInput" :class="applyColor" type="text">
</template>

<script>
export default {
  name: 'my-input',
  props:{
    modelValue: [String, Number],
    type: String
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  },
  computed: {
    applyColor(){
      if(this.type === 'main') return 'input'
      else if(this.type === 'personal') return 'input input2'
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../variables";
.input{
  width: 100%;
  padding: 0 20px;
  background: #f9f9f9;
  color: #737373;
  border-radius: 37px;
  min-height: 58px;
  border: 1px solid #e6e6e6;
}

.input2{
  margin-top: 11px;
  border: solid 1px $c_blue;
  border-radius: 20px;
  background: #F9F9F9;
  width: 100%;
  height: 53px;
  font-size: 16px !important;
  font-weight: 700 !important;
  &::placeholder{
    color: rgba(0, 0, 0, 0.20);
    font-family: Montserrat, sans-serif;
    font-size: 16px !important;
    font-weight: 700 !important;
  }
}

</style>