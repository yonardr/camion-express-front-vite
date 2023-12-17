<template >
  <aos-vue animation="zoom-in" :delay="75" placement="top-bottom">
<div class="item" :class="changeColor">
  <vue-flip :active-hover="true" :horizontal="flipChange" style="padding: 20px; height: 100%">
    <template v-slot:front class="front">
        <img :src=imgUrl(item.img) />
        <h3>{{item.title}}</h3>
      <div class="des">{{item.description}}</div>
    </template>
    <template v-slot:back class="back" >
      <div :class="rotate"><p style="white-space: pre;">{{item.back_description}}</p></div>
    </template>
  </vue-flip>
</div>

  </aos-vue>
</template>

<script>
import {VueFlip} from "vue-flip";
import AosVue from "aos-vue";
export default {
  components:{
    'vue-flip': VueFlip,
    AosVue
  },
  data(){
    return{
      flipChange: false
    }
  },
  props: {
    item:{
      type: Object,
      required: true
    },
  },
  methods:{
    imgUrl(path){
      return new URL(`../../assets/advantages/${path}`, import.meta.url)
    }
  },
  computed:{
    changeColor(){
      if(this.item.id % 2 === 0) {
        this.flipChange = true;
        return 'card__blue'
      }
      else return 'card__white'
    },
    rotate(){
      if(this.flipChange === true) return 'rotate'
    }

  },


}
</script>

<style scoped lang="scss">
@import '../../variables';

.item{
  margin: 15px;
  width: 303px ;
  height: 200px;

  img{
    margin: 5px;
  }
  h3{
    margin-bottom: 10px;
  }
}

.card__white{
  @include card(white);
  .des{
    color: $c_gray;
  }
}
.card__blue{
  @include card($c_blue);
  .des{
    color: $c_silver;
  }
  .rotate p{
    margin-top: 30px;
    transform: rotate(180deg);
  }
}



</style>