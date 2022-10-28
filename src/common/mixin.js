// // 导入防抖函数

// import const itemListnerMixin = {
//   data() {
//     return {
//       itemImgListner: null
//     }
//   },
//   mounted() {
//     let newRefresh = debouce(this.$refs.scroll.refresh, 100)
//     this.itemImgListner = () => {
//       newRefresh()
//     }
//   },
// }