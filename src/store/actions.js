// import { reject, resolve } from 'core-js/fn/promise';
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 1.查找之前数组中是否有该商品,payload 是新添加的商品
        let oldProduct = context.state.CartList.find(item => item.iid === payload.iid)
      
        // 2.判断 oldProduct
        if (oldProduct) {
          // 这里的数组是引用类型，直接改oldProduct的值，就会改引用地址的值
          // oldProduct.count += 1;
          context.commit(ADD_COUNTER, oldProduct)
          resolve('商品的数量+1')
        } else {
          payload.count = 1;
          // state.CartList.push(payload)
          context.commit(ADD_TO_CART, payload)
          resolve('添加了新的商品')
        }
      })
    }

}