<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- 动态展示图片和文字,多个插槽需要需要具名插槽,用于指定要替换的插槽 -->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="isActivestyle"><slot name="item-text"></slot></div>
        <!-- <slot name="item-text"></slot> -->
        <!-- <img src="../../assets/img/tabbar/home.svg"/>
        <div>首页</div> -->
    </div>
  </template>
  
  <script>  
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#db639b'
      }
    },
    data() {
      return {
        // isActive: true,
      }
    },
    computed: {
      isActive() {
        return this.$route.path == this.path
      },
      isActivestyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    },
  }
  </script>
  
  <style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  
  </style>
  