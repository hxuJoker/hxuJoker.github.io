<template>
  <ea-view center class="ea-document">
    <retina />
  </ea-view>
</template>

<script>
  import retina from './retina.md'
  export default {
    components: {
      retina,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
  margin-top: 50px !important;
}

</style>