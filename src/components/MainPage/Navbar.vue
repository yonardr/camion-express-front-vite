<template>

    <div class="navbar" :class="uu">
      <router-link class="link logo" :to="{name:'main', hash: '#start'}"><img src="../../assets/logo.png" /></router-link>

      <div class="navbar__links">
        <router-link class="link" :to="{name:'main', hash: '#calc'}">Калькулятор</router-link>
        <router-link class="link" :to="{name:'main', hash: '#news'}">Новости</router-link>
        <router-link class="link" to="/documents">Документы</router-link>
        <router-link class="link" :to="{name:'main', hash: '#contacts'}" >Контакты</router-link>
        <router-link class="link" :to="{name:'main', hash: '#map'}" >Карта</router-link>
        <router-link class="link" to="/" style="margin-right: 0px;">+7 (855) 247-05-90</router-link>

      </div>
      <div class="burger" :class="{active: burger_active}" @click="burger_active=!burger_active"><span></span></div>

      <div class="navbar_tel" :class="{active: burger_active}">
        <ul class="menu_table">
          <li>
            <router-link class="menu_button" :to="{name:'main', hash: '#calc'}" @click="burger_active=!burger_active">Калькулятор</router-link>
          </li>
          <li>
            <router-link class="menu_button" :to="{name:'main', hash: '#news'}" @click="burger_active=!burger_active">Новости</router-link>
          </li>
          <li>
            <router-link class="menu_button" to="/documents" @click="burger_active=!burger_active">Документы</router-link>
          </li>
          <li>
            <router-link class="menu_button" :to="{name:'main', hash: '#contacts'}" @click="burger_active=!burger_active">Контакты</router-link>
          </li>
          <li>
            <router-link class="menu_button" :to="{name:'main', hash: '#map'}" @click="burger_active=!burger_active">Карта</router-link>
          </li>
        </ul>
      </div>

    </div>

</template>

<script>
export default {
  data(){
    return{
      pageOffset: 0,
      burger_active : false
    }
  },

  mounted() {
    window.addEventListener('scroll', async () =>this.pageOffset = window.pageYOffset)
  },

  computed:{
    uu(){
      if(this.pageOffset !== 0){
        return 'scroll'

      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';
.navbar{
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 104px;
  width: 100%;
  position: fixed;

  background: transparent;
  transition: all 0.6s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 0px 0px 0px;

  img{
    width: 150px;
  }
  .navbar__links{
    margin-left: calc(1000px - 150px - 734px);
    display: flex;

    .link{
      color: $c_gray;
      margin-right: 21px;
      text-decoration: none;
      font-weight: 600;
      line-height: calc(24 / 14 * 100%);

      &:after {
        background-color: #737373; /* Цвет линии при наведении на нее курсора мыши */
        display: block;
        content: "";
        height: 1px; /* Высота линии */
        width: 0%;
        -webkit-transition: width .3s ease-in-out;
        -moz--transition: width .3s ease-in-out;
        transition: width .3s ease-in-out;
      }

      &:hover:after{
        width: 100%;
      }
    }
  }
}
.navbar_tel{
  position: fixed;
  top: -200%;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsl(0,0%, 100%, 0.1);
  backdrop-filter: blur(1rem);
  -webkit-backdrop-filter: blur(10px);
  paddig: 70px 10px 20px 10px;
  transition: all 0.3s ease 0s;
  z-index: 15;
}
.menu_table{
  display: block;
  margin: 100px 45% 0 5%;
  padding: 7px 0px;
  font-size: 25px;
  line-height: 200%;
  list-style: none;
}
.menu_button{
  text-decoration: none;
  color:$c_blue
}

@media (max-width: 1024px) {
  .navbar{
    justify-content: flex-start;
    min-height: 80px ;
  }
  .navbar__links{
    display: none !important;
  }
  .navbar_tel.active{
    top:0 !important;
  }
  .logo{
    margin-left: 10px;
    z-index: 99;
  }
  .burger{
    display: block;
    position: fixed;
    left: 90%;
    width: 30px;
    height: 20px;
    top: 27px;
    z-index: 50;

    span{
      position: absolute;
      background-color: #1B1B1C;
      left:0;
      width: 100%;
      height: 2px;
      top: 9px;
      transition:all 0.3s ease 0s;
    }

    &:before,
    &:after{
      content: '';
      background-color: #1B1B1C;
      position:absolute;
      width: 100%;
      height: 2px;
      left:0;
      transition:all 0.3s ease 0s;
    }
    &:before{
      top: 0;
    }
    &:after{
      bottom: 0;
    }
    &.active:before{
      transform:rotate(45deg);
      top:9px;
    }
    &.active:after{
      transform:rotate(-45deg);
      bottom:9px;
    }
    &.active span{
      transform: scale(0);
    }
  }
  }

.scroll{
  background : rgb(245, 245, 247);
  transition: all 0.6s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.07) 15px 15px 15px 15px;
}



</style>