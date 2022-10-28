<template>
  <swiper class="detail-swipper">
    <swiper-item v-for="(item, index) in ctopImages" :key="index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: 'DetailSwipper',
  components: {
    Swiper, 
    SwiperItem
  },
  props: {
    ctopImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .detail-swipper {
    height: 300px;
    overflow: hidden;
  }
</style>