<template>
  <div class="navbar"
       @mouseover="show = true"
       @mouseleave="show = false"
       :class="extension">
    <div class="group">
      <router-link to="/" style="color : white">Главная</router-link>
      <router-link :to="{name: 'calcEdit'}" class="field">
        <img src="../assets/personal/menu_icons/calculator.svg">
        <Transition>
        <div v-if="show" class="text">Калькулятор</div>
        </Transition>
      </router-link>
      <router-link :to="{name: 'docsEdit'}" class="field">
        <img src="../assets/personal/menu_icons/documents.svg">
        <Transition>
          <div v-if="show" class="text">Документы</div>
        </Transition>
      </router-link>
    <router-link :to="{name: 'newsEdit'}" class="field">
        <img src="../assets/personal/menu_icons/news.svg">
        <Transition>
          <div v-if="show" class="text">Новости</div>
        </Transition>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show : false
    }
  },
  computed:{
    extension(){
      if(this.show){
        return 'extension'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../variables";
.navbar{
  position: relative;
  height: 100vh;
  width: 100px;
  background-color: $c_blue;
  transition: 1s;
  &.extension{
    width: 250px;
    transition: 1s;
  }
  .group{
    margin-top: 50px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    .field{
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .field:hover {
      transition: 0.6s;
      transform: scale(1.1); /* Увеличиваем масштаб */
      background-color:$c_blue ;
      opacity: 2;
      width: 100%;
    }
    img{
      width: 60px;
      margin-bottom: 20px;
    }
  }
  .text{
    margin-left: 5px;
    color: #fff
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>