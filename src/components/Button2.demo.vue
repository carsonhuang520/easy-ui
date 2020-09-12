<template>
  <div>
    <Button theme="button" level="main">主要链接按钮</Button>
    <Button theme="button">普通链接按钮</Button>
    <Button theme="button" level="danger">危险链接按钮</Button>
  </div>
</template>
<script lang="ts">
import Button from "../lib/Button.vue"
export default {
  components: {
    Button,
  },
}
</script>

<demo>
第一个例子
</demo>
