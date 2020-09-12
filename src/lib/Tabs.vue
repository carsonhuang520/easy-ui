<template>
  <div class="easy-tabs">
    <div class="easy-tabs-nav" ref="container">
      <div
        class="easy-tabs-nav-item"
        :class="{ selected: t === selected }"
        v-for="(t, index) in titles"
        :key="index"
        :ref="
          (el) => {
            if (t === selected) selectedItem = el
          }
        "
        @click="select(t)"
      >
        {{ t }}
      </div>
      <div class="easy-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="easy-tabs-content">
      <!-- 方法一：css控制display -->
      <component
        class="easy-tabs-content-item"
        v-for="(c, index) in defaults"
        :class="{ selected: c.props.title === selected }"
        :is="c"
        :key="index"
      />
      <!-- 方法二：因为传入两个相同类型的vnode，故需要加入 key，否则不起作用 -->
      <!-- <component class="easy-tabs-content-item" :is="current" :key="selected" /> -->
    </div>
  </div>
</template>
<script lang="ts">
import Tab from "./Tab.vue"
import { computed, ref, watchEffect, onMounted, onUpdated } from "vue"
export default {
  props: {
    selected: {
      type: String,
    },
  },
  setup(props, context) {
    const selectedItem = ref<HTMLDivElement>(null)
    const indicator = ref<HTMLDivElement>(null)
    const container = ref<HTMLDivElement>(null)
    const user = ref(0)
    const handler = () => {
      const { width } = selectedItem.value.getBoundingClientRect()
      indicator.value.style.width = width + "px"
      const { left: left1 } = container.value.getBoundingClientRect()
      const { left: left2 } = selectedItem.value.getBoundingClientRect()
      const left = left2 - left1
      indicator.value.style.left = left + "px"
    }
    onMounted(handler)
    onUpdated(handler) //可以用 watchEffect 替代
    // watchEffect(() => {
    //   console.log(selectedItem)
    //   const { width } = selectedItem.value.getBoundingClientRect()
    //   indicator.value.style.width = width + "px"
    //   const { left: left1 } = container.value.getBoundingClientRect()
    //   const { left: left2 } = selectedItem.value.getBoundingClientRect()
    //   const left = left2 - left1
    //   indicator.value.style.left = left + "px"
    // })
    const defaults = context.slots.default()
    defaults.forEach((item) => {
      if (item.type !== Tab) {
        throw new Error("Tabs子标签必须是Tab")
      }
    })
    const current = computed(() => {
      return defaults.filter((item) => {
        return item.props.title === props.selected
      })[0]
    })
    const titles = defaults.map((item) => {
      return item.props.title
    })
    const select = (title: string) => {
      context.emit("update:selected", title)
    }

    return {
      defaults,
      titles,
      current,
      select,
      selectedItem,
      indicator,
      container,
    }
  },
}
</script>
<style lang="scss">
$blue: #40a9ff;
$color: #333333;
$border-color: #d9d9d9;

.easy-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;
    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
      transition: all 250ms;
    }
  }
  &-content {
    padding: 8px 0;
    &-item {
      display: none;
      &.selected {
        display: block;
      }
    }
  }
}
</style>
