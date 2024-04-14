<template>
  <Navbar />
  <div class="news">
    <div class="news__title">
      <h2>{{ data.title }}</h2>
    </div>

    <div class="news__imgs">
      <swiper
          :loop="true"
          :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
          :modules="modules"
          :centeredSlides="true"
          class="mySwiper">
        <swiper-slide v-for="item in data.newsImgs">
          <img :src="imgUrl(item.path)" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="news__attr">
      <h6>Адреса</h6>
      <div class="news__item" v-for="item in data.newsAddress">
        {{ item.value }}
      </div>
    </div>

    <div class="news__attr">
      <h6>Контакты для связи</h6>
      <div class="news__item" v-for="item in data.newsContacts">
        {{ item.value }}
      </div>
    </div>

    <div class="news__attr">
      <div class="des">
        <pre>{{ data.description }}</pre>
      </div>
    </div>

    <div class="news__attr" style="margin-bottom: 100px">
      <h6 v-if="data?.newsDocs?.length > 1">Документы</h6>
      <div class="news__item" v-for="item in data.newsDocs">
        <a :href="f(item.path)" target="_blank" style="text-decoration: none">{{ item.name }}</a>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import {useRoute} from 'vue-router'
import {useGetById} from "../components/hooks/NewsPage/useGetById.js";
import { Swiper, SwiperSlide } from 'swiper/vue';
import Footer from "../components/MainPage/Footer.vue";
import Navbar from "../components/MainPage/Navbar.vue";
import { Autoplay} from 'swiper/modules';
import 'swiper/css';
export default {
  components: {
    Navbar,
    Footer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const {data} = useGetById({id: useRoute().params.id})
    const imgUrl = (path) => new URL(`${import.meta.env.VITE_APP_API_URL}${path}`, import.meta.url).href
    const f = (path) => `${import.meta.env.VITE_APP_API_URL}${path}`

    return {data, imgUrl, f,
      modules: [Autoplay]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../variables";
.news{
  position: relative;
  top: 130px;
  width: 900px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
@media (max-width: 1024px){
  .news{
    width: 100%;
    padding: 0px 15px;
  }
  .mySwiper{
    width: 100%;
  }
}
h2{
  font-size: 40px;
}
@media (max-width: 768px){
  h2{
    font-size: 30px;
  }
}
h6{
  font-size: 25px;
}
.news__imgs{
  display: flex;
  justify-content: center;
}
.mySwiper{
  margin-top: 25px;
  height: 400px;
  img{
    width: 100%;
    height: 100%;
  }
}
.news__attr{
  color: $c_blue;
  margin-top: 25px;
}
.des{
  overflow-wrap: anywhere;
  text-align: left;
  color: $c_gray;

}
pre{
  font-family: Montserrat,serif;
  word-wrap: normal;
  white-space: pre-wrap;
  display: block;
  height: auto;
  line-height: 1.4;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

</style>