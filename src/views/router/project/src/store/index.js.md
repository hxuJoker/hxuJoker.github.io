```
import Vue from 'vue';

const store = {

  title: 'joker-blog',

  user: {
    id: '',
    name: '',
  },

};

Vue.observable(store);

export default store;
```