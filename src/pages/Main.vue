<template>
  <div>
    <Navbar/>
    <StartView id="start"/>

    <CalcOnMain id="calc" class="__container margin"/>

    <News id="news" class="margin"/>

    <Advantages class="__container margin"/>

    <SubmitApplication class="__container margin"/>

    <Partners class="margin"/>

    <Contacts id="contacts" class="__container margin"/>

    <Map id="map"/>
    <Footer/>
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
import Calculator from "./CalculatorPage.vue"
import News from "../components/MainPage/News.vue";
import Footer from "../components/MainPage/Footer.vue";
import CalcOnMain from "../components/Calc/CalcOnMain.vue";


export default {
  components: {
    CalcOnMain,
    Footer, News, Calculator, Map, Contacts, Partners, SubmitApplication, Advantages, StartView, Navbar
  },
}
</script>

<style>
.__container {
  margin: 0 auto;
  max-width: 1000px;
}
.margin{
  margin-bottom: 70px;
}
@media (max-width: 1024px) {
  .__container {
    padding: 0 15px;
  }
}

</style>