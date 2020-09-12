<template>
  <div class="topnav">
    <router-link to="/" class="logo-wrapper">
      <svg class="logo">
        <use xlink:href="#icon-fly"></use>
      </svg>
    </router-link>
    <ul class="menu">
      <li>
        <router-link to="/doc">文档</router-link>
      </li>
    </ul>
    <svg v-if="toggleButtonVisible" class="toggleAside" @click="toggleMenu">
      <use xlink:href="#icon-menu"></use>
    </svg>
  </div>
</template>
<script lang="ts">
import { inject, Ref } from "vue"
export default {
  props: {
    toggleButtonVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const asideVisible = inject<Ref<boolean>>("aside")
    const toggleMenu = () => {
      asideVisible.value = !asideVisible.value
    }
    return { toggleMenu }
  },
}
</script>
<style lang="scss" scoped>
.topnav {
  display: flex;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  justify-content: center;
  align-items: center;
  .logo {
    &-wrapper {
      margin-right: auto;
    }
    width: 32px;
    height: 32px;
  }
  > .menu {
    color: #4385e8;
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    > li {
      margin: 0 1em;
    }
  }
  > .toggleAside {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 16px;
    top: 50%;
    color: #d9d9d9;
    transform: translateY(-50%);
    display: none;
  }
  @media (max-width: 500px) {
    > .menu {
      display: none;
    }
    .logo-wrapper {
      margin: 0 auto;
    }
    > .toggleAside {
      display: inline-block;
    }
  }
}
</style>
