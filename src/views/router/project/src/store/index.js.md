```
import Vue from 'vue';

const store = {

  title: 'joker-blog',

  route: {
    stopJump: false,
    to: null,
  },

  user: {
    id: '',
    name: '',
  },

};

Vue.observable(store);

export default store;
```