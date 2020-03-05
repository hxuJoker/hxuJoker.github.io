<template>
  <ea-admin>
    <template v-slot:header>
      <ea-header
          :collapse.sync="headerCollapse"
          :fullscreen="fullscreen"
          :nav-data="headerNavData"
          :user="user"
          @command="handleCommand">
      </ea-header>
    </template>
    <template v-slot:side>
      <ea-logo
          name="joker-blog"
          v-if="logoVisible"
          logo-type="image"
      />
      <ea-nav-menu
          router
          :data="navData"
          v-model="active"
      />
    </template>
  </ea-admin>
</template>
<script>
  import navData from './nav-data';
  import store from '@/store';

  export default {
    name: 'Index',
    data() {
      return {
        user: store.user,
        collapse: false,
        active: '',
        navData,
        headerCollapseActive: true,
        fullscreen: true,
        headerNavDataActive: true,
        logoVisible: true,
      };
    },
    computed: {
      headerCollapse: {
        get() {
          return this.headerCollapseActive ? this.$ea.config.collapse : 'false';
        },
        set(v) {
          this.$ea.config.collapse = v;
        },
      },
      headerNavData() {
        return this.headerNavDataActive ? navData : [];
      },
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'me':
            this.$message.warning('未实现');
            break;
          case 'setting':
            this.$message.warning('未实现');
            break;
          case 'logout':
            store.user = {
              name: '',
              id: '',
            };
            this.$message.success('已退出');
            localStorage.setItem('document_user', JSON.stringify(store.user));
            this.$router.push('/login');
            break;
        }
      },
    },
    created() {
    },
    mounted() {
    },
  };
</script>
<style scoped>
  .icon-github {
    font-size: 22px
  }
</style>