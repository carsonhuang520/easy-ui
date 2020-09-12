<template>
  <!-- <div>Button示例</div>
  <h1>示例1</h1>
  <div>
    <Button @click="onClick">你好</Button>
    <Button theme="button">你好</Button>
    <Button theme="link">你好</Button>
    <Button theme="text">你好</Button>
  </div>
  <h1>示例2</h1>
  <div>
    <div>
      <Button size="big">你好</Button>
      <Button size="normal">你好</Button>
      <Button size="small">你好</Button>
    </div>
    <div>
      <Button theme="link" size="big">你好</Button>
      <Button theme="link" size="normal">你好</Button>
      <Button theme="link" size="small">你好</Button>
    </div>
    <div>
      <Button theme="text" size="big">你好</Button>
      <Button theme="text" size="normal">你好</Button>
      <Button theme="text" size="small">你好</Button>
    </div>
  </div>
  <h1>示例3</h1>
  <div>
    <dir>
      <Button level="main">主要按钮</Button>
      <Button>普通按钮</Button>
      <Button level="danger">危险按钮</Button>
    </dir>
    <dir>
      <Button theme="link" level="main">主要链接按钮</Button>
      <Button theme="link">普通链接按钮</Button>
      <Button theme="link" level="danger">危险链接按钮</Button>
    </dir>
    <dir>
      <Button theme="text" level="main">主要文字按钮</Button>
      <Button theme="text">普通文字按钮</Button>
      <Button theme="text" level="danger">危险文字按钮</Button>
    </dir>
  </div>
  <h1>示例4</h1>
  <div>
    <Button disabled>禁用按钮</Button>
    <Button theme="link" disabled>禁用链接按钮</Button>
    <Button theme="text" disabled>禁用按钮</Button>
  </div>
  <h1>示例5</h1>
  <div>
    <Button loading>加载中</Button>
  </div> -->
  <div>
    <h1>Button 组件示例</h1>
    <div class="demo-wrapper">
      <h2>示例1</h2>
      <div class="demo">
        <component :is="ButtonDemo1" />
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre class="language-html" v-html="x"></pre>
      </div>
    </div>
    <div class="demo-wrapper">
      <h2>示例2</h2>
      <div class="demo">
        <component :is="ButtonDemo2" />
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre class="language-html" v-html="x2"></pre>
      </div>
    </div>
    <div class="demo-wrapper">
      <h2>示例3</h2>
      <div class="demo">
        <component :is="ButtonDemo3" />
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre class="language-html" v-html="x3"></pre>
      </div>
    </div>
    <div class="demo-wrapper">
      <h2>示例4</h2>
      <div class="demo">
        <component :is="ButtonDemo4" />
      </div>
      <div class="demo-actions">
        <Button>查看代码</Button>
      </div>
      <div class="demo-code">
        <pre class="language-html" v-html="x4"></pre>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "prismjs"
import "prismjs/themes/prism.css"
import Button from "../lib/Button.vue"
import ButtonDemo1 from "./Button1.demo.vue"
import ButtonDemo2 from "./Button2.demo.vue"
import ButtonDemo3 from "./Button3.demo.vue"
import ButtonDemo4 from "./Button4.demo.vue"
export default {
  components: {
    Button,
  },
  setup() {
    const onClick = () => {
      console.log("hi")
    }
    const Prism: any = (window as any).Prism
    const x = Prism.highlight(ButtonDemo1.__demo, Prism.languages.html, "html")
    const x2 = Prism.highlight(ButtonDemo2.__demo, Prism.languages.html, "html")
    const x3 = Prism.highlight(ButtonDemo3.__demo, Prism.languages.html, "html")
    const x4 = Prism.highlight(ButtonDemo4.__demo, Prism.languages.html, "html")
    return {
      onClick,
      ButtonDemo1,
      ButtonDemo2,
      ButtonDemo3,
      ButtonDemo4,
      x,
      x2,
      x3,
      x4,
    }
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
