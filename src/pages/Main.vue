<template>
  <div>
    <Navbar />
    <StartView id="start"/>
    <div class="__container">
      <CalcOnMain id="calc"/>
    </div>
<!--      <News id="news" />-->
    <div class="__container">
      <Advantages/>

<!--      <SubmitApplication />-->
    </div>
    <div class="__container">
<!--      <Partners />-->
      <Contacts id="contacts" />
    </div>
    <Map id="map"/>
<!--    <Footer/>-->
  </div>
</template>

<script>
import Navbar from "../components/MainPage/Navbar.vue";
import StartView from "../components/MainPage/StartView.vue";
import Advantages from "../components/MainPage/Advantages.vue";
import SubmitApplication from "../components/MainPage/SubmitApplication.vue";
import Partners from "../components/MainPage/Partners.vue";
import Contacts from "../components/MainPage/Contacts.vue";
import Map from "../components/MainPage/Map.vue";
import Calculator from "../components/Calc/CalculatorPage.vue"
import News from "../components/MainPage/News.vue";
import Footer from "../components/MainPage/Footer.vue";
import CalcOnMain from "../components/Calc/CalcOnMain.vue";


export default {
  components: {
    CalcOnMain,
    Footer, News, Calculator, Map, Contacts, Partners, SubmitApplication, Advantages, StartView, Navbar},
}
</script>

<style >
.__container{
  margin: 0 auto;
  max-width: 1000px;
}
@media (max-width: 1024px) {
  .__container{
    padding: 0 15px;
  }
}

</style>