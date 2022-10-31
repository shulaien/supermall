import { debounce } from "./utils";
import BackTop from '@/components/content/backTop/BackTop.vue'

export const itemListnerMixin = {
  data() {
    return {
      itemImgListner: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListner = () => {
      newRefresh()
    }
  },
}

export const BackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.myscroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      // 1.判断是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    }
  },
}