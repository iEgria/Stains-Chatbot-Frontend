import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import ArgonDashboard from "./argon-dashboard";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPaperPlane);
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem('bearerToken')}`, Accept : 'application/json'};

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueAxios, axios);
appInstance.use(ArgonDashboard);
appInstance.component('font-awesome-icon', FontAwesomeIcon);

appInstance.mount("#app");
