<template>
  <div class="page">
    <SideNavbar />
    <div class="content">
      <router-view/>
      <router-view name="calc"/>
    </div>

  </div>
</template>

<script>
import DocumentsAdmin from "./DocumentsAdmin.vue";
import SideNavbar from "../components/Personal/SideNavbar.vue";
export default {
  components:{SideNavbar, DocumentsAdmin}
}
</script>

<style lang="scss" scoped>
.page{
  display: flex;
  background-color: #f1f4f6;
}
.content{
  margin-left: 50px;
}
</style>