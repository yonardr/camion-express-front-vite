<template>
  <div>
    <div class="edit__container">
      <News/>
      <AddNews/>
      <DeleteNews/>
    </div>

  </div>
</template>

<script>
import News from "../MainPage/News.vue";
import MyInput from "../UI/MyInput.vue";
import MyTextarea from "../UI/MyTextarea.vue";
import MyButton from "../UI/MyButton.vue";
import MyInputFile from "../UI/MyInputFile.vue";
import AddNews from "./News/AddNews.vue";
import DeleteNews from "./News/DeleteNews.vue";

export default {
  components: {DeleteNews, AddNews, MyInputFile, MyButton, MyTextarea, MyInput, News},

}
</script>

<style lang="scss" scoped>
@import "../../variables";

.edit__container {
  position: relative;
  top: 25px;
  display: flex;
  flex-wrap: wrap;
}

</style>