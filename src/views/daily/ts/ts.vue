<template>
  <ea-view center class="ea-document">
    <ts />
  </ea-view>
</template>

<script>
  import ts from './ts.md'
  export default {
    components: {
      ts,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
}

</style>