<template>
  <div>
      <Navbar />
    <div class="__container">
      <div class="title">
      <h2>Документы</h2>
        <ViewDocs></ViewDocs>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "../components/MainPage/Navbar.vue";
import ViewDocs from "../components/Docs/ViewDocs.vue";
export default {
components:{
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