<template>
  <textarea :value="modelValue" @input="updateInput" type="text" class="textarea pl"></textarea>
</template>

<script>
export default {
  name: 'my-textarea',
  props:{
    modelValue: [String, Number],
    type: String
  },
  methods:{
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../variables";
.textarea{
  width: 100%;
  padding: 10px 20px;
  background: #f9f9f9;
  color: #737373;
  border-radius: 37px;
  min-height: 158px;
  border: 1px solid #e6e6e6;
  max-width: 900px;
}

.pl{
  margin-top: 11px;
  border: solid 1px $c_blue;
  border-radius: 20px;
  background: #F9F9F9;
  width: 100%;
  height: 53px;
  font-size: 17px !important;
  font-weight: 700 !important;
  &::placeholder{
    color: rgba(0, 0, 0, 0.20);
    font-family: Montserrat, sans-serif;
    font-size: 16px !important;
    font-weight: 700 !important;
  }
}

</style>