<template>
  <template v-if="visible">
    <div class="easy-dialog-overlay" @click="closeDialogOverlay"></div>
    <div class="easy-dialog-wrapper">
      <div class="easy-dialog">
        <header>
          {{ title }} <span class="easy-dialog-close" @click="close"></span>
        </header>
        <main>
          <slot name="content" />
        </main>
        <footer>
          <Button level="main" @click="confirm">OK</Button>
          <Button @click="cancel">Cancel</Button>
        </footer>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
import Button from "./Button.vue"
export default {
  props: {
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    closeOverlay: {
      type: Boolean,
      default: true,
    },
    handleConfirm: {
      type: Function,
    },
    handleCancel: {
      type: Function,
    },
  },
  components: {
    Button,
  },
  setup(props, context) {
    const close = () => {
      context.emit("update:visible", false)
    }
    const closeDialogOverlay = () => {
      if (props.closeOverlay) {
        close()
      }
    }
    const cancel = () => {
      close()
    }
    const confirm = () => {
      if (props.handleConfirm && props.handleConfirm() !== false) {
        close()
      }
    }
    return { close, closeDialogOverlay, confirm, cancel }
  },
}
</script>
<style lang="scss">
$radius: 4px;
$border-color: #d9d9d9;
.easy-dialog {
  background: #ffffff;
  border-radius: $radius;
  box-shadow: 0 0 3px fade-out($color: black, $amount: 0.5);
  min-width: 15em;
  max-width: 90%;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade-out($color: black, $amount: 0.5);
    z-index: 10;
  }
  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  > header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  > main {
    padding: 12px 16px;
  }
  > footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
