import Vue from "vue";

import FlexboxgridVue from "@vivid-web/flexboxgrid-vue";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(FlexboxgridVue);

new Vue({
  render: h => h(App)
}).$mount("#app");
