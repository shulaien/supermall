<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" 
         class="tab-control-item" 
         :class="{active: currentIndex === index}" 
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  components: {},
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex : 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    background-color: #fff;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px;
  }
</style>