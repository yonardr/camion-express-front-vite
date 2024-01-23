import { createStore } from 'vuex'
import {advantageModule} from "./advantageModule";
import {partnerModule} from "./partnerModule";
import {mapModule} from "./mapModule";
import {documentsModule} from "./documentsModule.js";
import {newsModule} from "./newsModule.js";
import {calculatorModule} from "./calculatorModule.js";

export default createStore({
  modules: {
    advantages: advantageModule,
    partners: partnerModule,
    map: mapModule,
    docs: documentsModule,
    news: newsModule,
    calc: calculatorModule
  }
})
