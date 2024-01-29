<template>
  <div class="add__card">
    <h3>Добавление новостей</h3>
    <form>
      <my-input
          v-model="form.title.value"
          :type="'personal'"
          placeholder="Введите название новости"
      />
      <my-textarea placeholder="Введите описание новости" v-model="form.description.value"/>
      <div class="add__column">
        <div class="inputs">
          <my-input
              v-for="(item, index) in form.addressArray.value"
              v-model="form.addressArray.value[index]"
              :type="'personal'"
              placeholder="Введите адрес"
              class="item_field"
          />
        </div>
        <div style="display:flex;flex-direction: column;align-items: end">
          <my-button :color="'blue'" @click="form.addressArray.value.push('')">Добавить адрес +</my-button>
          <my-button :color="'blue'" @click="form.addressArray.value.pop()">Удалить адрес -</my-button>
        </div>
      </div>
      <hr style="margin: 20px"/>
      <div class="add__column">
        <div class="inputs">
          <my-input
              v-for="(item, index) in form.contactsArray.value"
              v-model="form.contactsArray.value[index]"
              :type="'personal'"
              placeholder="Введите контакт"
              class="item_field"
          />
        </div>
        <div style="display:flex;flex-direction: column;align-items: end">
          <my-button :color="'blue'" @click="form.contactsArray.value.push('')">Добавить контакт +</my-button>
          <my-button :color="'blue'" @click="form.contactsArray.value.pop()">Удалить контакт -</my-button>
        </div>
      </div>
      <div class="footer">
        <h4>
          Добавление изображений
        </h4>
        <my-input-file :multiple="true" v-model="form.images.value"/>
        <h4>
          Добавление документов
        </h4>
        <my-input-file :multiple="true" v-model="form.files.value"/>
        <div class="submit__btn">
          <my-button :color="'orange'" @click="submit">Добавить новость</my-button>
        </div>

      </div>

    </form>

  </div>
</template>
<script>
import News from "../MainPage/News.vue";
import MyInput from "../UI/MyInput.vue";
import MyTextarea from "../UI/MyTextarea.vue";
import MyButton from "../UI/MyButton.vue";
import {reactive, ref} from "vue";
import MyInputFile from "../UI/MyInputFile.vue";
import {useAddNews} from "../hooks/NewsPage/useAddNews.js";

export default {
  components: {MyInputFile, MyButton, MyTextarea, MyInput, News},
  setup() {
    const form = reactive({
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      addressArray: {
        value: ['']
      },
      contactsArray: {
        value: ['']
      },
      images: {
        value: []
      },
      files: {
        value: []
      }
    })

    async function submit() {
      const {result} = await useAddNews(form)
      console.log(result)
    }

    return {form, submit}
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";

.page {
  display: flex;
  flex-direction: column;
}

.add__card {
  margin: 25px;
  width: 950px;
  padding: 25px;
  @include card(white);
}

.add__column {
  display: flex;
  justify-content: space-between;

}

.inputs {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: 20px;

  h4 {
    margin: 10px 0;
  }

  .submit__btn {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end
  }
}

</style>