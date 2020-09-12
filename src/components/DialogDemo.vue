<template>
  <!-- <div>Dialog示例</div>
  <h1>示例1</h1>
  <Button @click="toggle">toggle</Button>
  <Dialog
    v-model:visible="visible"
    :closeOverlay="true"
    :handleConfirm="handleConfirm"
    :handleCancel="handleCancel"
  >
    <template v-slot:content>
      <div>first</div>
      <div>second</div>
    </template>
  </Dialog>
  <h1>示例2</h1>
  <Button @click="showDialog">show</Button> -->
  <div>
    <h1>Dialog 组件示例</h1>
    <div class="demo-wrapper">
      <h2>示例1</h2>
      <div class="demo">
        <component :is="DialogDemo1" />
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
import { openDialog } from "../lib/openDialog"
import Dialog from "../lib/Dialog.vue"
import Button from "../lib/Button.vue"
import DialogDemo1 from "./Dialog1.demo.vue"
import { ref, h } from "vue"
export default {
  components: {
    Dialog,
    Button,
  },
  setup() {
    const Prism: any = (window as any).Prism
    const x = Prism.highlight(DialogDemo1.__demo, Prism.languages.html, "html")
    const visible = ref(false)
    const toggle = () => {
      visible.value = !visible.value
    }
    const handleConfirm = () => {
      return false
    }
    const handleCancel = () => {}
    const showDialog = () => {
      openDialog({
        title: h("strong", {}, "你好"),
        content: "hello",
        closeOverlay: false,
        handleConfirm() {
          console.log("ok")
          // return false
        },
        handleCancel() {
          console.log("cancel")
        },
      })
    }
    return {
      visible,
      toggle,
      handleCancel,
      handleConfirm,
      showDialog,
      DialogDemo1,
      x,
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
