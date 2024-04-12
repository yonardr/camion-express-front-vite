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

@font-face {
  font-family: Montserrat;
  src: url('./assets/fonts/Montserrat-VariableFont_wght.ttf');
}

*::-webkit-scrollbar {
  width: 5px; /* Ширина всего элемента навигации */
  height: 5px;
}

*::-webkit-scrollbar-track {
  background: transparent; /* Цвет дорожки */
}
*::-webkit-scrollbar-thumb {
  background-color: $c_orange;
  border-radius: 25px;
  border: 3px solid $c_orange;
}
@media (max-width: 1024px) {
  body{
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
