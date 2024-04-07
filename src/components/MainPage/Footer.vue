<template>
  <div class="wrapper">
  <div class="footer">
    <div class="footer__content __container">
      <router-link to="" class="link">Правила перевозки груза</router-link>
      <router-link to="" class="link">Документы компании</router-link>
      <router-link to="" class="link">Документы для перевозки</router-link>
    </div>
    <div class="line __container"></div>
    <div class="footer__content __container" style="margin-top: 25px">
      <router-link to="" class="link">
        <img src="../../assets/footer/01.svg">
        8 (855)-247-51-20
      </router-link>
      <router-link to="" class="link">
        <img src="../../assets/footer/02.svg">
        г.Набережные Челны, ул.Мензелинский тракт, д.30A
      </router-link>
      <router-link to="" class="link">
        <img src="../../assets/footer/03.svg">
        astron71@gmail.com
      </router-link>
    </div>
  </div>
  <div class="footer__bottom __container">
    <p>© Транспортная компания Камион Экспресс, 2022 | Политика конфиденциальности</p>
    <div class="social">
      <img src="../../assets/footer/phone.png"/>
      <img src="../../assets/footer/mail.png"/>
      <img src="../../assets/footer/telegram.png"/>
    </div>
  </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import '../../variables';

.wrapper{
  position: relative;
  top:150px;
}
.footer {
  background: $c_blue;
  padding: 35px 0;
}

.footer__content {
  display: flex;

  .link {
    color: #fff;
    margin: 0 auto;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  img{
    width: 25px;
    margin-right: 5px;
  }

}

.line {
  border: 0.5px solid gray;
  width: 100%;
  margin-bottom: 12px;
  margin-top: 12px;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #737373;
  line-height: 171%;
  font-size: 12px;
  padding: 25px 0;
  .social{
    display: flex;
    align-items: center;
  }
  img {
    width: 25px;
    margin-left: 25px;
  }
}
@media (max-width: 768px){
  .footer__content{
    flex-direction: column;
    .link{
      margin: 10px;
    }
  }
  .footer__bottom{
    flex-direction: column;
    p{
      text-align: center;
      margin: 5px;
    }
    .social{
      margin: 10px;
    }
  }
}
</style>