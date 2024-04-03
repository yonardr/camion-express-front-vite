<template>
  <div>
    <div class="page">

      <div class="card">
        <ViewDocs :deleteField="true"></ViewDocs>
      </div>

      <div class="card">
        <AddDoc/>
      </div>

      <div class="card">
        <AddTypesDocs/>
      </div>
      <div class="card">
        <DeleteTypeDocs />
      </div>
    </div>
  </div>
</template>

<script>

import ViewDocs from "../Docs/ViewDocs.vue";
import MyDialog from "../UI/MyDialog.vue";
import MyInputFile from "../UI/MyInputFile.vue";
import MyInput from "../UI/MyInput.vue";
import MyButton from "../UI/MyButton.vue";
import AddDoc from "./Docs/AddDoc.vue";
import AddTypesDocs from "./Docs/AddTypesDocs.vue";
import DeleteTypeDocs from "./Docs/DeleteTypeDocs.vue";


export default {
  components: {DeleteTypeDocs, AddTypesDocs, AddDoc, MyButton, MyInput, MyInputFile, MyDialog, ViewDocs},

}
</script>

<style lang="scss" scoped>
@import "../../variables";

.page {
  display: flex;
  flex-wrap: wrap
}

.card {
  margin: 25px;
  width: 700px;
  padding: 25px;
  @include card(white);


}


</style>