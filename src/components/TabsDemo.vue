<template>
  <!-- <div>Tabs示例</div>
  <h1>示例1</h1>
  <Tabs v-model:selected="selected">
    <Tab title="导航1">内容1</Tab>
    <Tab title="导航2">内容2</Tab>
    <Tab title="导航3">内容3</Tab>
    <Tab title="导航4">内容4</Tab>
    <Tab title="导航5">内容5</Tab>
  </Tabs> -->
  <div>
    <h1>Tabs 组件示例</h1>
    <div class="demo-wrapper">
      <h2>示例1</h2>
      <div class="demo">
        <component :is="TabsDemo1" />
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre class="language-html" v-html="x"></pre>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "prismjs"
import "prismjs/themes/prism.css"
import Button from "../lib/Button.vue"
import Tabs from "../lib/Tabs.vue"
import Tab from "../lib/Tab.vue"
import TabsDemo1 from "./Tabs1.demo.vue"
import { ref } from "vue"
export default {
  components: {
    Tabs,
    Tab,
    Button,
  },
  setup() {
    const selected = ref("导航2")
    const Prism: any = (window as any).Prism
    const x = Prism.highlight(TabsDemo1.__demo, Prism.languages.html, "html")
    return { selected, TabsDemo1, x }
  },
}
</script>
<style lang="scss" scoped>
$border-color: #d9d9d9;
.demo {
  padding: 16px;
  &-wrapper {
    border: 1px solid $border-color;
    margin: 16px 0 32px;
    > h2 {
      padding: 16px;
      border-bottom: 1px solid $border-color;
    }
  }
  &-actions {
    border-top: 1px dashed $border-color;
    padding: 4px;
  }
  &-code {
    padding: 4px;
    border-top: 1px dashed $border-color;
    > pre {
      line-height: 1.1;
      font-family: Consolas, "Courier New", Courier, monospace;
      margin: 0;
    }
  }
}
</style>
