<template>
  <div>
      <Navbar />
    <div class="__container">
      <div class="title">
      <h2>Документы</h2>
        <ViewDocs></ViewDocs>
      </div>
    </div>

<Footer style="margin-top: 15%"/>
  </div>
</template>

<script>
import Navbar from "../components/MainPage/Navbar.vue";
import ViewDocs from "../components/Docs/ViewDocs.vue";
import Footer from "../components/MainPage/Footer.vue";
export default {
components:{
  Footer,
  Navbar,ViewDocs
}
}
</script>

<style scoped lang="scss">
.__container{
  display: flex;
  justify-content: center;
}

.title{
  width: 100%;
  margin-top: 100px;
}
</style>