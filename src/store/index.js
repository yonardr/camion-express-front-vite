import { createStore } from 'vuex'
import {advantageModule} from "./advantageModule";
import {partnerModule} from "./partnerModule";
import {mapModule} from "./mapModule";

export default createStore({
  modules: {
    advantages: advantageModule,
    partners: partnerModule,
    map: mapModule
  }
})
