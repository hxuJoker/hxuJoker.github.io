<template>
  <ea-view center class="ea-document">
    <el-row style="margin-top:20px">
      <el-col :span="18" :offset="3">
        <div v-for="(item,index) in daliyList" :key="index" class="daily-list">
          <div class="word">
            <h3 class="title" @click="goToDaily(item.path)">{{item.title}}</h3>
            <p class="description">{{item.description}}</p>
          </div>
          <img :src="item.image" class="image"/>
        </div>
      </el-col>
    </el-row>
  </ea-view>
</template>

<script>
  import daliyList from '../daily-list'
  export default {
    data() {
      return {
        daliyList,
      }
    },
    methods: {
      goToDaily(route){
        this.$router.push(route)
      }
    },
  }
</script>

<style lang="less" scoped>
.daily-list{
  background: rgba(255,255,255,0.8);
  padding: 15px;
  overflow: hidden;
  color: #797b7c;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .image {
    width:150px
  }
  .title{
    font-size: 16px;
    line-height: 25px;
    text-shadow: #FFF 1px 1px 1px;
    color: #222;
    font-weight: 700;
    cursor: pointer;
  }
  .description{
    margin: 20px 0 0 0;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    font-size: 15px
  }
}
</style>