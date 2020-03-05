<template>
  <ea-view center class="ea-document">
    <es />
  </ea-view>
</template>

<script>
  import es from './es.md'
  export default {
    components: {
      es,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
}
</style>