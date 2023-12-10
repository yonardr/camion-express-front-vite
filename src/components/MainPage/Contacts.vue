<template>
  <div>
    <h2>КОНТАКТЫ</h2>
    <div class="department">Отдел Продаж</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <div class="card__blue">
      <h3>Шаймиева Лилия Бахтияровна</h3>
      <div class="text__blue">
        <div>+7 (909)-314-33-43</div>
        <div>astron2307@mail.ru</div>
      </div>

      <div class="line"></div>

      <h3>Лыткина Ольга Викторовна</h3>
      <div class="text__blue">
        <div>+7 (909)-314-44-24</div>
        <div>astronkamion@mail.ru</div>
      </div>
    </div>
    </aos-vue>

    <div class="department">Отдел Логистики</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <div class="card__white">
      <h3>Ибрин Никита Сергеевич</h3>
      <div class="text__white">
        <div>+7 (909)-312-90-99</div>
        <div>astron91@mail.ru</div>
      </div>


      <div class="line"></div>

      <h3>Коберник Дмитрий Вадимович</h3>
      <div class="text__white">
        <div>+7 (909)-313-23-53</div>
        <div>astron0408@gmail.com</div>
      </div>
    </div>
    </aos-vue>

    <div class="department">Информация</div>
    <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
    <div class="card__blue">
      <h3 style="margin-bottom: 0px">Общие контакты</h3>
      <div class="line"></div>
      <div class="text__blue">
        <div>Адрес: г.Набережные Челны, ул.Мензелинский тракт, д.30A</div>
        <div>Номер: +7 (855) 247-05-90</div>
        <div>E-mail: astron71@mail.ru</div>
        <div>Сотрудничество: +7 (909)-313-70-88</div>
      </div>

    </div>
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

}
.text__white{
  color: $c_gray;
  text-align: center;
}

</style>