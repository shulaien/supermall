<template>
    <div id="shopCart">
      <!-- 导航部分 -->
      <nav-bar class="nav-cart">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>

      <!-- 商品的展示 -->
      <scroll class="wrapper" 
              ref="myscroll"
              :probe-type="3" 
              :pull-up-load="true">
        <cart-list/>
      </scroll>

      <!-- 底部汇总 -->
      <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'

import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'Shopcart',  
  components: { 
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated() {
    this.$refs.myscroll.refresh()
  },
}
</script>

<style scoped>
  #shopCart {
    height: 100vh;
  }

  .nav-cart {
    background-color: pink;
    color: #fff;
  }

  .wrapper {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
