<template>
  <div>
    <h2>КОНТАКТЫ</h2>
    <div class="department">Отдел Продаж</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <article class="card__blue">
      <h3>Шаймиева Лилия Бахтияровна</h3>
      <address class="text__blue">
        <a href="tel:+79093143343">+7 (909)-314-33-43</a>
        <a href="mailto:astron2307@mail.ru">astron2307@mail.ru</a>
      </address>

      <div class="line"></div>

      <h3>Лыткина Ольга Викторовна</h3>
      <address class="text__blue">
        <a href="tel:+79093144424">+7 (909)-314-44-24</a>
        <a href="mailto:astronkamion@mail.ru">astronkamion@mail.ru</a>
      </address>
    </article>
    </aos-vue>

    <div class="department">Отдел Логистики</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <article class="card__white">
      <h3>Ибрин Никита Сергеевич</h3>
      <address class="text__white">
        <a href="tel:+79093129099">+7 (909)-312-90-99</a>
        <a href="mailto:astron91@mail.ru">astron91@mail.ru</a>
      </address>


      <div class="line"></div>

      <h3>Коберник Дмитрий Вадимович</h3>
      <address class="text__white">
        <a href="tel:+79093132353">+7 (909)-313-23-53</a>
        <a href="mailto:astron0408@gmail.com">astron0408@gmail.com</a>
      </address>
    </article>
    </aos-vue>

    <div class="department">Информация</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <article class="card__blue">
      <h3 style="margin-bottom: 0px">Общие контакты</h3>
      <div class="line"></div>
      <address class="text__blue">
        <span>Адрес: г.Набережные Челны, ул.Мензелинский тракт, д.30A</span>
        <a href="tel:+78552470590">Номер: +7 (855) 247-05-90</a>
        <a href="mailto:astron71@mail.ru">E-mail: astron71@mail.ru</a>
        <a href="tel:+79093137088">Сотрудничество: +7 (909)-313-70-88</a>
      </address>

    </article>
    </aos-vue>

  </div>
</template>

<script>
import AosVue from "aos-vue";
export default {
  components: { AosVue },
};
</script>

<style scoped lang="scss">
@import "../../variables";

h3{
  margin-bottom: 10px;
  text-align: center;
}

.card__white{
  @include card(white);
}
.card__blue{
  @include card($c_blue);
}

.card__white,
.card__blue{
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 30px;
  margin-bottom: 15px;
}
.department{
  color: $c_gray;
  text-align: center;
  margin: 10px;
}
.line{
  border: 0.5px solid gray;
  width: 50%;
  margin: 0 auto;
  margin: 12px;
}

.text__blue{
  color: $c_silver;
  text-align: center;
  a {
    color: $c_silver;
    text-decoration: none;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    display: block;
  }
}
.text__white{
  color: $c_gray;
  text-align: center;
  a {
    color: $c_gray;
    text-decoration: none;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
}

</style>