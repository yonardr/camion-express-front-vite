<template>
  <div class="card__white">
    <div class="img"></div>
    <div class="content">
      <h2>Авторизация</h2>
      <div>
      <h3>Логин</h3>
      <my-input v-model="form.login.value"
                placeholder="Номер телефона или Email"
                :type="'personal'"
      />
      </div>
      <div>
      <h3>Пароль</h3>
      <my-input v-model="form.password.value"
                placeholder="Введите пароль"
                :type="'personal'"/>
      </div>

      <my-button class="btn btn2" @click="submit">Войти</my-button>
      <my-button class="btn">Регистрация</my-button>
    </div>
  </div>
</template>

<script>
import MyInput from "../UI/MyInput.vue";
import MyButton from "../UI/MyButton.vue";
import {useAuth} from "../hooks/Auth/useAuth";
import {useFetchSub, useSubmit} from "../hooks/MainPage/useSubmit";
import router from "../../router";
const required = val => !!val
const minLength = num => val => val.length >= num
export default {
  components: {MyButton, MyInput},
  setup(){
    const form = useSubmit({
      login: {
        value: '',
        validators: {required, minLength: minLength(6)}
      },
      password:{
        value : '',
        validators: {required, minLength: minLength(8)}
      },
    });
    const submit = async() => {
      const {jwt} = await useAuth(form)
      console.log(jwt.value)
      if(jwt.value === false){
        alert('Невенрный логин или пароль')
      }
      else{
        localStorage.jwt = jwt.value;
        router.push({name: 'personal'})
      }

    }
    return{form, submit}
  }
}
</script>

<style lang="scss" scoped>
@import "../../variables";

.card__white{
  @include card(white);
  display: flex;
  width: 1200px;
  height: 600px;
}
.img{
  width: 600px;
  height: 600px;
  border-radius: 30px;
  background: no-repeat center url("../../assets/auth/auth_img2.png"), lightgray 50%;
}
.content{
  width: 600px;
  padding: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2{
  text-align: center;
  margin-bottom: 24px;
}
h3{
  margin-top: 11px;
}

.btn{
  width: 100%;
  height: 100%;
  max-height: 53px;
  border-radius: 30px;
  background: #F2B976;
  border: 3px solid #F2B976;

  color: #000;

  font-family: Montserrat,serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin: 7px 0;
}
.btn2{
  border: 3px solid #F2B976;
  background: #FFF;
  margin-top: 51px;
}
</style>