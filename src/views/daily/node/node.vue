<template>
  <ea-view center class="ea-document">
    <node/>
  </ea-view>
</template>

<script>
  import node from './node.md'
  export default {
    components: {
      node,
    },
  }
</script>

<style lang="less" scoped>
.ea-document{
  width: 1000px !important;
}

</style>