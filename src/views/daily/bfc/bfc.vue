<template>
  <ea-view center class="ea-document">
    <bfc />
  </ea-view>
</template>

<script>
  import bfc from './bfc.md'
  export default {
    components: {
      bfc,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
}

</style>