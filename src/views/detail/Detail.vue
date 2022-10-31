<template>
  <div id="detail">
    <detail-nav-bar class="nav-detail" 
                    @titleClick="titleClick"
                    ref="detailNav"/>
    <scroll ref="myscroll" class="wrapper"
            :probe-type="3" 
            :pull-up-load="true" @handleScroll="contentScroll">
      <!-- 属性：ctopImages 传入值：ctop-images -->
      <detail-swipper :ctop-images="topImages" ref="goods"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
      <detail-param-info :param-info="goodsParam" ref="params"/>
      <detail-comments-info :comment-info="commentsInfo" ref="comment"/>
      <goods-list :cgoods="goodsRecommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwipper from './childComps/DetailSwipper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentsInfo from './childComps/DetailCommentsInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import { getDetails, GoodsInfo, ShopInfo, GoodsParam, getRecommend } from '@/network/detail'
import { debounce } from '@/common/utils'
import {BackTopMixin} from '@/common/mixin'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar, 
    DetailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentsInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [BackTopMixin],
  data() {
    return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        goodsParam: {},
        commentsInfo: {},
        goodsRecommend: [],
        themePosition: [],
        getThemePosition: [],
        currentIndex: 0
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetails(this.iid).then(res => {
      // 2.1 获取顶部图片的轮播数据
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.2 获取商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 2.3 获取商品的店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo)
      // 2.4 获取商品的详情数据
      this.detailInfo = data.detailInfo
      // 2.5 获取商品的参数信息
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 2.6 获取商品的评论信息
      if(data.rate.cRate !== 0) {
        this.commentsInfo = data.rate.list[0]
      }
    })
    
    // 3.获取推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.goodsRecommend = res.data.list
    })

    // 4.给 getThemePosition 赋值并对此操作防抖
    this.getThemePosition = debounce(() => {
      this.themePosition = []
      this.themePosition.push(0)
      this.themePosition.push(this.$refs.params.$el.offsetTop - 44)
      this.themePosition.push(this.$refs.comment.$el.offsetTop - 44)
      this.themePosition.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themePosition.push(Number.MAX_VALUE)
      console.log(this.themePosition);
    },1000)
  },
  methods: {
    ...mapActions(['addCart']),
    detailImgLoad() {
      this.getThemePosition()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.myscroll.scrollTo(0, -(this.themePosition[index]), 500)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.将 positionY 与主题中值对比 [0, 13474, 14150, 14440]
      // positionY 在 [0, 13474) 中,index = 0
      // positionY 在 [13474, 14150) 中,index = 1
      // positionY 在 [14150, 14440) 中,index = 2
      // positionY 在 [14440, +∞) 中,index = 3
      let length = this.themePosition.length
      for (let i = 0; i < length - 1; i++) {
        if(i !== this.currentIndex && (positionY >= this.themePosition[i] && positionY < this.themePosition[i+1])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }

        // 3.是否显示回到顶部
        this.listenShowBackTop(position)
      }

      // 普通做法
      // for (let i = 0; i < length; i++) {
      //   if (this.currentIndex !== i && ((i < length -1 && positionY >= this.themePosition[i] && positionY < this.themePosition[i+1]) || (i === length - 1 && positionY >= this.themePosition[i]))) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.detailNav.currentIndex = this.currentIndex
      //   }
      // }
    },
    addToCart() {
      // 1.创建购物车对象,获取购物车需要展示的信息
      const product = {}
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.image = this.topImages[0];
      product.iid = this.iid;

      // 2.将商品添加到购物车里(1.Promise 2.mapActions)
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        console.log(res);
      })
    }
  },
}
</script>

<style scoped>
  #detail {
    /* 隐藏底部tabbar,可通过meta设置 */
    /* position: relative;
    z-index: 9;
    background-color: #fff; */

    height: 100vh;
  }
  .nav-detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .wrapper {
    height: calc(100% - 44px);
    overflow: hidden;
  }

</style>