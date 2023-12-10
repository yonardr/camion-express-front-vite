<template>
  <div>
    <h2>КАРТА</h2>
<!--    <div v-for="car in cars">{{car}}</div>-->
    <div class="text_map">Местоположение машин отслеживается в реальном времени.</div>
    <div class="position_map">
      <div>
  <div class="mask_map"> </div>
    <YandexMap :settings="settings"
               :coordinates="[56.08318, 86.018216]"
               :zoom="5"
               :controls="['fullscreenControl']"
               class="map">
      <YandexMarker
          v-for="car in cars"
          :coordinates="[car.Lat, car.Lng]"
          :properties="{
            hintContent : car.Name
          }"
          :options="{
            iconLayout: getIco(),
            iconImageHref: typeIco(car.Angle),
            iconImageSize: [15, 50],
            iconShape: {type: 'Circle', coordinates: [0, 0], radius: 30 },
            iconRotate: car.Angle,
            iconImageOffset: [car.Angle < 180 ? -15 : 0, -25],
            hintLayout: getHint(),
          }"

      ></YandexMarker>
   <YandexMarker
       :coordinates="[55.741272, 52.403662]"
       :options="{
            preset: 'islands#dotIcon',
            iconColor: '#d4142f'
          }"
   ></YandexMarker>
      <YandexMarker
          v-for="point in $store.state.map.main_cities"
          :coordinates="[point.lat, point.lng]"
          :properties="{
            iconCaption: point.name
          }"
          :options="{
            preset: 'islands#dotIcon',
            iconColor: '#177BC9'
          }"
      ></YandexMarker>
      <YandexMarker
          v-for="point in $store.state.map.cities"
          :coordinates="[point.lat, point.lng]"
          :properties="{
            hintContent: point.name
          }"
          :options="{
            hintLayout: getHint(),
            preset: 'islands#dotIcon',
            iconColor: '#177BC9'
          }"
      ></YandexMarker>
    </YandexMap>

      </div>
  </div>
  </div>
</template>

<script>
import { YandexMap, YandexMarker } from 'vue-yandex-maps'
import {useMap} from "../hooks/MainPage/useMap";
import { loadYmap } from 'vue-yandex-maps';
export default {
  components: { YandexMap, YandexMarker },
  data() {
    return {
      settings: {
        apiKey: 'dcd16f0c-9275-43da-87b2-f77c71a230ab',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1',
      },
    }
  },
  setup(props){
      const {cars} = useMap()
      return{
        cars
    }
  },
  async mounted() {
    await loadYmap(this.settings);
  },
  methods:{
    getIco(){
      return ymaps.templateLayoutFactory.createClass([
        '<div style="transform:rotate({{options.rotate}}deg);">',
        '{% include "default#image" %}',
        '</div>'
      ].join(''))
    },
    typeIco(angle){
      let img = angle < 180 ? 'ico_fu' : 'ico_fu_mirror'
      return new URL(`../../assets/map/${img}.png`, import.meta.url).href
    },
    getHint(){
      return ymaps.templateLayoutFactory.createClass(
          "<div class='my-hint'>" +
          "<b>{{ properties.hintContent}}</b>" +
          "</div>", {
            getShape: function () {
              var el = this.getElement(),
                  result = null;
              if (el) {
                var firstChild = el.firstChild;
                result = new ymaps.shape.Rectangle(
                    new ymaps.geometry.pixel.Rectangle([
                      [0, 0],
                      [firstChild.offsetWidth, firstChild.offsetHeight]
                    ])
                );
              }
              return result;
            }
          }
      )
    },
  }


}
</script>

<style lang="scss">
@import '../../variables';
.map{
  height: 600px;
}
.position_map{
  position: relative;
}

.mask_map{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 56px 96px 88px;
  background: linear-gradient(to top, #fff 8%, transparent 20%, transparent 90%, #fff 95%);
  pointer-events: none;
  z-index: 1;
  height: 105%;
}
.my-hint {
  display: inline-block;
  padding: 5px;
  height: 30px;
  position: relative;
  width: 195px;
  font-size: 11px;
  line-height: 17px;
  text-align: center;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #CDB7B5;
  border-radius: 20px;
}
.text_map{
  text-align: center;
  color: $c_gray;
  margin-top: 10px;
}
</style>