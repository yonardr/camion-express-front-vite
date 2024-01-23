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
import DocumentsAdmin from "../components/Personal/DocumentsAdmin.vue";
import SideNavbar from "./PersonalPage.vue";
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