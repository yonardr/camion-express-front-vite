<template>
  <div class="wrapper">

      <Auth/>

  </div>
</template>

<script>
import Auth from "../components/Auth/Auth.vue";

export default {
  components: {Auth}

}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>