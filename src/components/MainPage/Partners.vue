<template>
  <div>
      <h2>ПАРТНЕРЫ</h2>
    <div class="__container">
    <div class="group">

      <div class="group first__group">
        <img
            v-for="img in getPartners.filter(i=> i.id <= 3 )"
            :key="img.id"
            :src=imgUrl(img.img_name)
            @click="OpenDialog(img)"
        />
      </div>


      <div class="group second__group">
        <img
            v-for="img in getPartners.filter(i=> i.id >= 4 )"
            :key="img.id"
            :style="{'width': img.size}"
            :src=imgUrl(img.img_name)
            @click="OpenDialog(img)"
        />
      </div>

  </div>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <h3 class="title"><img :src=imgUrl(partner.img_name) /> {{partner.name}}</h3>
      <div class="group__modal">
        <div class="name">Адрес: </div>
        <div>{{partner.address}}</div>
      </div>
      <div class="group__modal">
        <div class="name">Контакты: </div>
        <div>{{partner.contact}}</div>
      </div>
      <div class="text">
        <p>{{partner.description}}</p>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from "../UI/MyDialog.vue";
import {mapGetters} from "vuex";

export default {
  components: {MyDialog},

  data(){
    return {
      dialogVisible: false,
    }
  },
  computed:mapGetters(['getPartners']),
  methods:{
     OpenDialog(partner){
      this.dialogVisible = true;
      this.partner = partner;
    },
    imgUrl(path){
      return new URL(`../../assets/partners/${path}`, import.meta.url)
    }
  }
}
</script>

<style scoped lang="scss">
.__container{
  margin: 0 auto;
  max-width: 1000px;
}
.group{
  display: grid;
  justify-items: center;
  align-items: center;
  justify-content: center;
  .first__group,
  .second__group
  {
    margin-top: 50px;
    grid-template-columns: repeat(3, calc(1000/3)-0.1px);
    img{
      width: 50%;
      transition: 1s;
      opacity: 100%;
      &:hover{
        transition: .8s;
        opacity: 50%;
      }
    }
  }
  .second__group{
    grid-template-columns: repeat(2, 280px);
  }
}


//Модальное окно
.title{
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-weight: 700;
  letter-spacing: 0.1px;
  font-size: 24px;
  line-height: 133%;
  img{
    width: 80px;
    margin: 0 15px ;
  }
}
.group__modal{
  display: flex;
  column-count: 2;
  margin: 17px 0;
  .name{
    font-size: 20px;
    margin-right: 5px;

  }
}
.text{
  font-size: 14px;
  margin: 10px 0;
  line-height: 130%;
}
@media (max-width: 375px) {
  .title{
    font-size: 20px;
  }
  .group__modal {
    .name {
      font-size: 15px;
    }
  }
  .text{
    font-size: 12px;
  }
}

@media (max-width: 1024px) {
  .first__group,
  .second__group {
    grid-template-columns: repeat(3, calc(768/3)-0.1px) !important;
  }
  .second__group{
    grid-template-columns: repeat(2, 200px) !important;
  }
}

@media (max-width: 768px) {
  .group{
    width: 100%;
  }
  .first__group,
  .second__group {
    grid-template-columns: repeat(3, calc(425/3)-0.1px) !important;
  }
  .second__group{
    grid-template-columns: repeat(2, 150px) !important;
  }
}

@media (max-width: 460px) {
  .__container{
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .first__group,
  .second__group {
    grid-template-columns: repeat(3, calc(350/3)-0.1px) !important;
  }
  .second__group{
    grid-template-columns: repeat(2, 120px) !important;
  }
}
@media (max-width: 350px) {
  .first__group,
  .second__group {
    grid-template-columns: repeat(3, calc(320/3)-0.1px) !important;
  }
  .second__group{
    grid-template-columns: repeat(2, 110px) !important;
  }
}
</style>