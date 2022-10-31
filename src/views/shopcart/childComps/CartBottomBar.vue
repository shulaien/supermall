<template>
  <div class="cart-bottom">
    <div class="check-all">
      <check-button class="check-tick" 
                    :is-checked="isSelectAll" 
                    @click.native="checkAllClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">去结算({{checkList}})</div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + (item.price * item.count)
      }, 0).toFixed(2)
    },
    checkList() {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      // 1.普通遍历
    //   for (let item of this.cartList) {
    //     if (!item.checked) {
    //       return false
    //     }
    //   }
    //   return true  

      // 2.使用filter
    //   return !(this.cartList.filter(item => !item.checked).length)

      // 3.使用find
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkAllClick() {
      if (this.isSelectAll) {   // 全部选中
        return this.cartList.forEach(item => item.checked = false)
      } else {  // 部分或全部不选中
        return this.cartList.forEach(item => item.checked = true)
      }
    }
  },
}
</script>

<style scoped>
  .cart-bottom {
    /* 底部tabbar的高度为49px */
    position: relative;
    bottom: 89px;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 14px;
  }

  .check-all {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-tick {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 85px;
    background-color: #d81e06;
    color: #fff;
    text-align: center;
  }
</style>