<template>
    <div id="home">
      <nav-bar class="nav-home"><div slot="center">购物商城</div></nav-bar>
      <tab-control :titles="['流行', '新款', '精选']" 
                    ref="tabControl1"
                    @tabClick="tabClick" 
                    v-show="isTabFixed"/>
      <!-- coderwhy老师这里使用了better-scroll组件封装,
      但在应用中bug太多,我一开始用原生 scroll 实现滚动相关功能了;
      后来又下载最新版本的 better-scroll组件 封装-->
      <scroll class="wrapper" ref="myscroll" 
              :probe-type="3"
              @handleScroll="contentScroll" 
              :pull-up-load="true" 
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-views :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行', '新款', '精选']" 
                      ref="tabControl2"
                      @tabClick="tabClick"
                      v-show="!isTabFixed"/>
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
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个首页数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
      this.$refs.myscroll.scroll.refresh()
      this.$refs.myscroll.scrollTo(0,this.saveY)
  },
  // deactivated() {
  //   if(this.$refs.myscroll.scroll) {
  //     this.saveY = this.$refs.myscroll.scroll.y
  //     console.log(this.saveY);
  //   }
  // },
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
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
     },
     backClick() {
      this.$refs.myscroll.scrollTo(0, 0, 500)
     },
     contentScroll(position) {
      // 1.判断是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000

      // 2.判断tabControl是否吸顶(-position.y > 546)
      this.isTabFixed = (-position.y) > this.tabOffsetTop

      // 3.获取首页的位置信息
      this.saveY = position.y
     },
     loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.myscroll.refresh()
     },
     swiperImageLoad() {
      // 每个组件都有一个属性$el: 用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 44
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.myscroll.finishPullUp()
      })
    }
  },
}
</script>

<style>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }
  .nav-home {
    color: #fff;
    background-color: pink;
    /* background-color: var(--color-tint); */

    /* 当使用浏览器原生滚动时,为了不让导航栏跟着滚动
       需要配合 #home 中的padding-top使用 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* 使用Better-Scroll后粘性定位失效 */
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .wrapper {
    height: calc(100% - 49px);
    overflow: hidden;
  }
  /* .wrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
 
</style>
