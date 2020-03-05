<template>
  <div>
    <div class="about-me">
      <div class="about">关于</div>
      <div class="content">
        <img :src="require('@/assets/image/myself.png')" class=""/>
        <span><b>徐广昊</b>，一个95后小青年，17年入行。一直潜心研究web前端技术，一边工作一边积累经验，分享一些个人博客模板，以及SEO优化等心得。</span>
      </div>
    </div>
    <div class="about-me">
      <div class="about">分类</div>
      <div class="content">
        <p @click="goDailyList">文章（{{daliyList.length}}）</p>
        <p>相册（10）</p>
      </div>
    </div>
    <div class="about-me">
      <div class="about">友情链接</div>
      <ul class="url">
        <li>
          <a href="https://hxujoker.github.io/docs" title="Joker个人博客">Joker个人博客</a>
        </li>
      </ul>
    </div>
    <div class="about-me">
      <div class="about">关注我</div>
      <div class="qr-content">
        <img :src="require('@/assets/image/qr.png')" class="qr"/>
      </div>
    </div>
  </div>
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
      goDailyList() {
        this.$router.push('/daily')
      }
    },
  }
</script>

<style lang="less"  scoped>
.about-me{
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid #ddd;
}
.about {
  color: #333;
  font-size: 15px;
  font-weight: 700;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 5px 0
}
.content{
  padding: 10px 0;
  background: #f7f7f7;
  line-height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: top;
  cursor: pointer;
  img{
    width: 110px;
    height: auto;
    padding: 0px 10px 0 5px
  }
}
.url{
  padding: 10px;
  background: #f7f7f7;
  color: #555;
  font-weight: 700;
  font-size: 15px
}
.qr-content{
  background: #f7f7f7;
  padding: 20px;
  text-align: center
}
.qr{
  width: 80%;
}
</style>