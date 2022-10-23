<template>
  <div class="wrapper" ref="wrapper">
    <!-- <div class="content"> -->
      <slot></slot>
    <!-- </div> -->
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  components: {},
  props: {
    handleListen: {
      type: Boolean,
      default: false
    },
    pullListen: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 0.监听滚动相关事件
    window.addEventListener('scroll', this.handleScroll, this.handleListen)
    window.addEventListener('scroll', this.pullUpLoad, this.pullListen)
  },
  methods: {
    // 1.获取滚动的位置,是否显示回到顶部组件
    handleScroll() {
        // 1.1 获取滚动条距离顶部的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        this.$emit('handleScroll', scrollTop)
    },
    // 2.获取上拉事件,是否上拉加载更多
    pullUpLoad() {
      // 2.1 获取滚动条高度 scrollTop, 可视区的高度 clientHeight, 页面高度 scrollHeight
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let clientHeight = document.documentElement.clientHeight
        let scrollHeight = document.documentElement.scrollHeight      
        if (scrollTop + clientHeight >= scrollHeight) {
          // console.log('上拉加载更多');
          this.$emit('pullUpLoad')
        }
    },
    // 2.2 监听到上拉刷新动作之后事件 pullUpLoad 只能调用一次，需要调用 finishPullUp() 来提供下一次 pullUpLoad 事件
    // 的消费机会
    // finishPullUp() {
    //   this.pullUpLoad()
    // },
    backTop() {
      // 3.返回顶部事件,设置定时器实现缓冲效果
      var timer = setInterval(() => {
        let currentTop = document.documentElement.scrollTop || document.body.scrollTop
        let backSpace = Math.floor(-currentTop / 5)
        document.documentElement.scrollTop = currentTop + backSpace
        if (currentTop === 0) {
          clearInterval(timer)
        }
      },30)
    }
  },
  destroyed() {
    // 离开该页面需要移除这个监听的 scroll 事件，不然会报错
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.pullUpLoad)
  },
//   data() {
//     return {
//         scroll: null
//     }
//   },
//   mounted() {
//     this.scroll = new BScroll(this.$refs.wrapper, {
//       probeType: 3,
//       click: true
//     })
//     this.scroll.scrollTo(0, 0)
//   },
}
</script>

<style scoped>
  
</style>