<template>
  <div>CheckCode 示例</div>
  <h1>示例1</h1>
  <check-code />
  <h2 style="margin-bottom: 300px">示例2</h2>
  <Code />
  <!-- <dynamic-code /> -->
</template>
<script lang="ts">
import DynamicCode from "../lib/DynamicCode.vue"
import CheckCode from "../lib/CheckCode.vue"
import Code from "../lib/Code.vue"
export default {
  components: {
    CheckCode,
    DynamicCode,
    Code,
  },
}
</script>
