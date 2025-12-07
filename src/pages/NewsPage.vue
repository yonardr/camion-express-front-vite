<template>
  <Navbar />
  <article class="news" itemscope itemtype="https://schema.org/NewsArticle">
    <header class="news__title">
      <h1 itemprop="headline">{{ data.title }}</h1>
    </header>

    <figure class="news__imgs" v-if="data.newsImgs?.length">
      <swiper
          :loop="true"
          :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
          :modules="modules"
          :centeredSlides="true"
          class="mySwiper"
          role="region"
          aria-label="Галерея изображений">
        <swiper-slide v-for="(item, index) in data.newsImgs" :key="item.path">
          <img :src="imgUrl(item.path)" :alt="`${data.title} - изображение ${index + 1}`" itemprop="image" loading="lazy" />
        </swiper-slide>
      </swiper>
    </figure>

    <section class="news__attr" v-if="data.newsAddress?.length">
      <h2>Адреса</h2>
      <address class="news__item" v-for="item in data.newsAddress" :key="item.value">
        {{ item.value }}
      </address>
    </section>

    <section class="news__attr" v-if="data.newsContacts?.length">
      <h2>Контакты для связи</h2>
      <address class="news__item" v-for="item in data.newsContacts" :key="item.value">
        {{ item.value }}
      </address>
    </section>

    <section class="news__attr" v-if="data.description">
      <div class="des" itemprop="articleBody">
        <pre>{{ data.description }}</pre>
      </div>
    </section>

    <section class="news__attr" style="margin-bottom: 100px" v-if="data?.newsDocs?.length >= 1">
      <h2>Документы</h2>
      <div class="news__item" v-for="item in data.newsDocs" :key="item.path">
        <a :href="f(item.path)" target="_blank" rel="noopener noreferrer" style="text-decoration: none">{{ item.name }}</a>
      </div>
    </section>
  </article>
  <Footer/>
</template>

<script>
import {useRoute} from 'vue-router'
import {useGetById} from "../components/hooks/NewsPage/useGetById.js";
import { Swiper, SwiperSlide } from 'swiper/vue';
import Footer from "../components/MainPage/Footer.vue";
import Navbar from "../components/MainPage/Navbar.vue";
import { Autoplay} from 'swiper/modules';
import { useSeo } from "../composables/useSeo.js";
import { watch } from 'vue';
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

    const { updateMeta } = useSeo({
      title: 'Новости — КамионЭкспресс',
      description: 'Новости и спецпредложения транспортной компании КамионЭкспресс.',
      keywords: 'новости грузоперевозки, акции КамионЭкспресс, спецпредложения'
    })

    watch(data, (newData) => {
      if (newData && newData.title) {
        document.title = `${newData.title} — КамионЭкспресс`
        const descMeta = document.querySelector('meta[name="description"]')
        if (descMeta && newData.description) {
          descMeta.setAttribute('content', newData.description.substring(0, 160))
        }
      }
    })

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
h1{
  font-size: 40px;
}
h2{
  font-size: 25px;
}
@media (max-width: 768px){
  h1{
    font-size: 30px;
  }
  h2{
    font-size: 20px;
  }
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
.news__item{
  margin: 5px 0;
}
</style>