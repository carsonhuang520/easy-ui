<template>
  <div>
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
  </div>
</template>
<script lang="ts">
import Dialog from "../lib/Dialog.vue"
import Button from "../lib/Button.vue"
import { ref } from "vue"
export default {
  components: {
    Button,
    Dialog,
  },
  setup() {
    const visible = ref(false)
    const toggle = () => {
      visible.value = !visible.value
    }
    const handleConfirm = () => {
      return false
    }
    const handleCancel = () => {}
    return { visible, toggle, handleCancel, handleConfirm }
  },
}
</script>

<demo>
第一个例子
</demo>
