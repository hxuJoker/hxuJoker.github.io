<template>
  <ea-view center class="ea-document">
    <js />
  </ea-view>
</template>

<script>
  import js from './js.md'
  export default {
    components: {
      js,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
}
</style>