<template>
  <div>
  <div id="zayavka">
    <h2>Оставить заявку</h2>
    <div class="card" @submit.prevent="submit">
      <my-input
          type="text"
          v-model="form.name.value"
          placeholder="Имя"
          class="input"
      />
      <my-input
          type="email"
          v-model="form.email.value"
          placeholder="Email"
          class="input"
      />
      <my-input
          type="tel"
          v-model="form.tel.value"
          placeholder="Телефон"
          class="input"
          :class="{invalid: !form.tel.valid && form.tel.touched}"
          @blur="form.tel.blur"
          :type="'main'"
      />
      <small v-if="form.tel.touched && form.tel.errors.required" style="color:#ff7b47; margin-left: 10px">Введите номер телефона</small>
      <small v-else-if="form.tel.touched && form.tel.errors.minLength" style="color:#ff7b47; margin-left: 10px">Недостаточное кол-во символов 8. Символов сейчас {{form.tel.value.length}}</small>
      <div class="upload">
          <input
              class="input__file"
              type="file"

              @change="onChange($event)"
              multiple
          >
        <div class="file-dummy" :style="green">
          <div class="success" :style="view">Файл выбран</div>
          <div class="default" :style="noview" >Выберите файл</div>
        </div>

        <a href="../../assets/applicationSubmit/Заявка%20на%20перевозку%20груза.docx" class="sub">Скачать файл</a>
      </div>

      <my-button :color="'orange'" class="btn" type="submit" @click="submit" :disabled="!form.valid">Отправить</my-button>
    </div>
  </div>
  <my-dialog v-model:show="dialogVisible" >
    <div class="modal">
      <img src="../../assets/dialog/done.svg" />
      <h1>Спасибо</h1>
      <p>В ближайшее время с Вами свяжется наш специалист</p>
    </div>
  </my-dialog>
  </div>
</template>

<script>
import MyButton from "../UI/MyButton.vue";
import MyInput from "../UI/MyInput.vue";
import {useFetchSub, useSubmit} from "../hooks/MainPage/useSubmit";
import {onMounted, ref, watch} from "vue";
import {useAnimationSubmit} from "../hooks/MainPage/useAnimationSubmit";
import MyDialog from "../UI/MyDialog.vue";
const required = val => !!val
const minLength = num => val => val.length >= num
export default {
  components: {MyDialog, MyInput, MyButton},

  setup(){
    const file = ref(null)
    const changeInput = ref(false)
    const dialogVisible = ref(false)
    const form = useSubmit({
      name: {
        value: '',
      },
      email:{
        value : '',
      },
      tel:{
        value: '',
        validators: {required, minLength: minLength(8)}
      }
    });
    function onChange(event) {
      file.value = event.target.files[0]

      let files = event.target.files || event.dataTransfer.files;
      if (files.length) changeInput.value = true;
      else changeInput.value = true;
    }
    const submit = async() => {
      if(201 === await useFetchSub(form, file.value)){
        dialogVisible.value = true
      }
      else alert('Ошибка')
    }

    const {view, noview, green} = useAnimationSubmit(changeInput)

    return {form, submit, onChange, view, noview, green, dialogVisible}
  },

}
</script>

<style scoped lang="scss">
@import "../../variables";

h2{
  margin-bottom: 20px;
}

.card{
  @include card(white);
  padding: 30px 50px;
  width: 100%;
  margin: 0 auto;

}
.upload{
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}
.file-area {
  width: 100%;
  position: relative;
}

.file-dummy {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 58px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px dashed #252b42;
  border-radius: 37px;
  text-align: center;
  transition: background 0.3s ease-in-out;
}

.file-dummy:hover {
  background: rgba(255, 255, 255, 0.1);
}
.input__file{
  position: absolute;
  width: 50%;
  opacity: 0;
  cursor: pointer;
}
.input__file:focus + .file-dummy {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline: -webkit-focus-ring-color auto 5px;
}
.input{
  margin: 5px 0;
}
.invalid{
  border-color: $c_orange;
}
.sub{
  display: flex;
  width: 100%;
  margin-left: 1%;
  min-height: 58px;
  color: #252B42;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: 2px dashed #252b42;
  border-radius: 37px;
  text-align: center;
  transition: background 0.3s ease-in-out;
  text-decoration: none;
}

.btn{
  width: 100%;
  height: 58px;
  &:hover{
    border-color: $c_orange;
  }

}

.modal{
  text-align: center;
  img{
    margin: 0 auto;
    width:150px
  }
}
@media (max-width: 425px) {
  .card{
    padding: 15px 25px;
  }
  .upload{
    flex-direction: column;
    .file-dummy{
      margin: 5px;
    }
  }
}
</style>