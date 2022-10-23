<template>
    <div id="home">
      <nav-bar class="nav-home"><div slot="center">购物商城</div></nav-bar>
      <!-- coderwhy老师这里使用了better-scroll组件封装,
      但在应用中bug太多,我直接用原生 scroll 实现滚动相关功能了 -->
      <scroll ref="myscroll" 
              :handle-listen="true"
              @handleScroll="contentScroll" 
              :pull-listen="true" 
              @pullUpLoad="loadMore">
        <home-swiper :banners="banners"/>
        <recommend-views :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行', '新款', '精选']" 
                      class="tab-control" 
                      @tabClick="tabClick"/>
        <goods-list :cgoods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendViews from './childComps/RecommendViews.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '@/components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from '@/network/home'

export default {
  components: {
    HomeSwiper,
    RecommendViews,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
},
  name: 'Home',
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 1.请求多个首页数据
  created() {
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
     tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
          
      }
     },
     backClick() {
      // console.log('backClick');
      // document.documentElement.scrollTop = 0;
      this.$refs.myscroll.backTop()
     },
     contentScroll(scrollTop) {
      this.isShowBackTop = scrollTop > 1000
     },
     loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
     },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  },
}
</script>

<style>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .nav-home {
    color: #fff;
    background-color: pink;
    /* background-color: var(--color-tint); */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /* .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
  } */
</style>
