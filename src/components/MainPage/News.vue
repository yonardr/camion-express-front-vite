<template>
  <div>
    <h2>НОВОСТИ И СПЕЦПРЕДЛОЖЕНИЯ</h2>
    <div class="news">
      <swiper
          :slidesPerView="count_news"
          :spaceBetween="30"
          :navigation="{
      prevEl: prev,
      nextEl: next,
    }"
          :modules="modules"
          :pagination="{
      clickable: true,
    }"
          class="mySwiper"
      >
        <swiper-slide v-for="item in news">
          <div class="__slide">
            <img :src="imgUrl(item.newsImgs[0].path)" class="slide__img"/>
            <h3 class="slide__title">
              {{ item.title }}
            </h3>
            <div class="slide__description">
              <p class="demo-1">{{ item.description }}</p>
            </div>


            <router-link :to="{path: `/news/${item.id}`}" style="text-decoration: none">
              <my-button :color="'orange'" class="slide__btn">Подробнее</my-button>
            </router-link>

          </div>
        </swiper-slide>
        <div ref="prev" class="swiper-button-prev"><img src="../../assets/swiper/back.svg"/></div>
        <div ref="next" class="swiper-button-next"><img src="../../assets/swiper/right.svg"/></div>
      </swiper>

    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";

import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation';
import MyButton from "../UI/MyButton.vue";
import {Navigation} from "swiper/modules";

export default {
  components: {MyButton, Swiper, SwiperSlide},
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('fetchNews'))
    const news = computed(() => store.getters.getNews);

    const imgUrl = (path) => new URL(`${import.meta.env.VITE_APP_API_URL}${path}`, import.meta.url).href

    const prev = ref(null);
    const next = ref(null);

    const count_news = ref(3)
    onMounted(()=>{
      if(window.innerWidth > 768) count_news.value = 3
      if(window.innerWidth < 768) count_news.value = 1
      window.addEventListener("resize", myEventHandler);
    })
    onUnmounted(()=>{
      window.removeEventListener("resize", myEventHandler);
    })
    function myEventHandler(e) {
      if(window.innerWidth > 768) count_news.value = 3
      if(window.innerWidth < 768) count_news.value = 1
    }

    return {
      news, imgUrl, prev, next, count_news,
      modules: [Navigation],
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../variables';


.news {
  width: 1100px;
  margin: 0 auto;
}

.mySwiper {
  height: 500px;
  padding: 35px;
  width: 1100px;
  .__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 11px 11px 11px 11px rgba(0, 0, 0, 0.07);
    border-radius: 30px;
    height: 410px;
    padding: 10px;
    justify-content: space-between;

    .slide__img {
      border-radius: 30px 30px 0px 0px;
      width: 100%;
      height: 140px;

    }

    .slide__title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      color: $c_blue;
      text-align: center;
      font-weight: 700;
      letter-spacing: 0.1px;
      font-size: 24px;
      line-height: 133%;
    }

    .slide__description {
     min-height: 80px;
      color: $c_gray;
      text-align: center;
      line-height: 120%;

    }
    .demo-1 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .slide__btn {

    }
  }

}

.swiper-button-prev,
.swiper-button-next {
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 11px 11px 11px 11px rgba(0, 0, 0, 0.07);

  img {
    margin: 13px;
  }
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}

.line {
  position: absolute;
  height: 40px;
  top: 250px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, red 8%, transparent 20%);
  z-index: 12;
}

@media (max-width: 1200px) {
  h2{
font-size: 30px;
  }
  .news{
    width: 100%;
  }
  .mySwiper{
    width: 100%;
  }
}
@media (max-width: 375px) {
  h2{
    font-size: 26px;
  }
  .__slide{
    height: 100px;
  }
}
</style>