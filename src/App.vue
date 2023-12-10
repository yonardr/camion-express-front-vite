<template>
  <div class="app" >
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style lang="scss">
@import "variables";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app{
  font-family: Montserrat, serif;
  font-size: 18px;
  font-weight: 600;
}
h2{
  color: $c_blue;
  font-size: 40px;
  text-align: center;
}
</style>
