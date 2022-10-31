<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  components: {},
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      observeImage: true,
      mouseWheel: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置,是否显示回到顶部组件
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('handleScroll', position)
    })

    // 3.监听上拉事件,是否上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },

  methods: {
    scrollTo(x, y, timer) {
      this.scroll && this.scroll.scrollTo(x, y, timer)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
}




  // 二、用原生滚动实现相关功能
  // mounted () {
  //   // 0.监听滚动相关事件
  //   window.addEventListener('scroll', this.handleScroll, true)
  //   window.addEventListener('scroll', this.pullUpLoad, true)
  // },
  // methods: {
  //   // 1.获取滚动的位置,是否显示回到顶部组件
  //   handleScroll() {
  //       // 1.1 获取滚动条距离顶部的高度
  //       let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //       this.$emit('handleScroll', scrollTop)
  //   },

  //   // 2.获取上拉事件,是否上拉加载更多
  //   pullUpLoad() {
  //     // 2.1 获取滚动条高度 scrollTop, 可视区的高度 clientHeight, 页面高度 scrollHeight
  //       let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //       let clientHeight = document.documentElement.clientHeight
  //       let scrollHeight = document.documentElement.scrollHeight  
  //       let distance = 50    
  //       if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
  //         setTimeout(() => {
  //           this.$emit('pullUpLoad')
  //         },200)
  //       }
  //   },

  //   // 3.返回顶部事件,设置定时器实现缓冲效果
  //   backTop() {
  //     var timer = setInterval(() => {
  //       let currentTop = document.documentElement.scrollTop || document.body.scrollTop
  //       let backSpace = Math.floor(-currentTop / 5)
  //       document.documentElement.scrollTop = currentTop + backSpace
  //       if (currentTop === 0) {
  //         clearInterval(timer)
  //       }
  //     },30)
  //   },
  // }
    

</script>

<style scoped>
  
</style>