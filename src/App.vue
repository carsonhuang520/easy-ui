<template>
  <router-view />
</template>

<script lang="ts">
import { ref, provide, computed, watch } from "vue"
import { router } from "./router"
export default {
  name: "App",
  setup() {
    const width = ref(document.documentElement.clientWidth)
    const toggleMenuButtonVisible = computed(() =>
      width.value <= 500 ? true : false
    )
    const asideVisible = ref(width.value <= 500 ? false : true)
    watch(width, (newWidth) => {
      if (newWidth > 500) {
        asideVisible.value = true
      } else {
        asideVisible.value = false
      }
    })
    provide("aside", asideVisible)
    window.addEventListener("resize", () => {
      width.value = document.documentElement.clientWidth
    })
    router.afterEach(() => {
      if (width.value <= 500) {
        asideVisible.value = false
      }
    })
  },
}
</script>
