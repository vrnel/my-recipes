import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { db, firebase } from "@/firebase";
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';


Vue.config.productionTip = false;
Vue.use(Croppa);


Vue.component("login", require('./components/login.vue'));
Vue.component("unos", require('./components/unos.vue'));



let app = '';

firebase.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      
      render: h => h(App)
    }).$mount("#app");
    
  }

});
