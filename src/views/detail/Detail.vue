<template>
  <div id="detail">
    <detail-nav-bar class="nav-detail" 
                    @titleClick="titleClick"
                    ref="navbar"/>
    <scroll ref="myscroll" :handle-listen="true">
      <!-- 属性：ctopImages 传入值：ctop-images -->
      <detail-swipper :ctop-images="topImages" ref="goods"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
      <detail-param-info :param-info="goodsParam" ref="params"/>
      <detail-comments-info :comment-info="commentsInfo" ref="comment"/>
      <goods-list :cgoods="goodsRecommend" ref="recommend"/>
    </scroll>
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

import Scroll from '@/components/common/scroll/Scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import { getDetails, GoodsInfo, ShopInfo, GoodsParam, getRecommend } from '@/network/detail'
import { debounce } from '@/common/utils'

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
  },
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
        themes: ['goods', 'params', 'comment', 'recommend'],
        themePosition: [],
        getThemePosition: []
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
      this.themePosition.push(this.$refs.params.$el.offsetTop)
      this.themePosition.push(this.$refs.comment.$el.offsetTop)
      this.themePosition.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themePosition);
    },500)
  },
  methods: {
    detailImgLoad() {
      this.getThemePosition()
    },
    titleClick(e, index) {
      console.log(index);
      // let target = this.themes
      // this.$refs.params.$el.scrollTo(0, this.themePosition[index])
      if(index == 0){   
        this.$refs.goods.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }
      if(e.target.dataset.index==2){
        this.$refs.params.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        })
      }
        //  if(e.target.dataset.index==3){
        //   document.getElementById("turn").scrollIntoView({
        //      block: 'start',
        //      behavior: 'smooth'
        //   })
        // }
        //  if(e.target.dataset.index==4){
        //   document.getElementById("contantsend").scrollIntoView({
        //      block: 'start',
        //      behavior: 'smooth'
        //   })
        // }
    }
  },
}
</script>

<style scoped>
  #detail {
    /* position: relative;
    z-index: 9;
    background-color: #fff; */

    padding-top: 44px;
    height: 100vh;
  }
  .nav-detail {
    position: fixed; 
    top: 0; 
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }

</style>