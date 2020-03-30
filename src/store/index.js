import Vue from 'vue';
const store = {
  title: 'joker-blog',
  route: {
    stopJump: false,
    to: null,
  },
};

Vue.observable(store);

export default store;