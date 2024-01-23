<template>
  <div>
      <h2>ПАРТНЕРЫ</h2>
    <div class="group">
      <aos-vue animation="fade-right" :delay="75" placement="top-bottom">
      <div class="group first__group">
        <img
            v-for="img in getPartners.filter(i=> i.id <= 3 )"
            :key="img.id"
            :src=imgUrl(img.img_name)
            @click="OpenDialog(img)"
        />
      </div>
      </aos-vue>
      <aos-vue animation="fade-left" :delay="75" placement="top-bottom">
      <div class="group second__group">
        <img
            v-for="img in getPartners.filter(i=> i.id >= 4 )"
            :key="img.id"
            :style="{'width': img.size}"
            :src=imgUrl(img.img_name)
            @click="OpenDialog(img)"
        />
      </div>
      </aos-vue>
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
import AosVue from "aos-vue";
import {mapGetters} from "vuex";

export default {
  components: {MyDialog, AosVue},

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
.group{
  display: grid;
  justify-items: center;
  align-items: center;

  .first__group,
  .second__group
  {
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
@media (max-width: 1024px) {
  .first__group,
  .second__group {
    grid-template-columns: repeat(3, calc(768/3)-0.1px) !important;
  }
  .second__group{
    grid-template-columns: repeat(2, 200px) !important;
  }
}
</style>