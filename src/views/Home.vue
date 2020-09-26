<template>
  <div class="home">
    <div class="topnavAndBanner">
      <Topnav />
      <div class="banner">
        <h1>Easy UI</h1>
        <h2>一个面向学习者的 UI 框架</h2>
        <p class="actions">
          <a href="https://github.com/carsonhuang520/easy-ui" target="_blank"
            >GitHub</a
          >
          <router-link to="/doc">开始</router-link>
        </p>
      </div>
    </div>
    <div class="features">
      <ul>
        <li>
          <svg>
            <use xlink:href="#icon-vue"></use>
          </svg>
          <h3>基于 Vue 3</h3>
          <p>使用了 Vue 3 Composition API</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-typescript"></use>
          </svg>
          <h3>基于 TypeScript</h3>
          <p>源代码采用 TypeScript 书写</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-light"></use>
          </svg>
          <h3>代码易读</h3>
          <p>每个组件的源代码都极其简洁</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Topnav from "../components/Topnav.vue"
export default {
  components: { Topnav },
}
</script>
<style lang="scss" scoped>
.topnavAndBanner {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(221, 231, 246, 1) 100%
  );
}
.banner {
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > .actions {
    color: #091841;
    h1,
    h2 {
      text-shadow: 0 0 2px white;
    }
  }
  > .actions {
    padding: 8px 0;
    a {
      margin: 0 8px;
      background: #1e40c8;
      display: inline-block;
      color: white;
      border-radius: 4px;
      padding: 8px 24px;
    }
  }
}
.features {
  margin: 64px auto;
  // width: 400px;
  padding: 0 16px;
  @media (min-width: 800px) {
    width: 800px;
    > ul {
      > li {
        width: 50%;
      }
    }
  }
  @media (min-width: 1200px) {
    width: 1200px;
    > ul {
      > li {
        width: 33.3333%;
      }
    }
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      // width: 400px;
      margin: 16px 0;
      display: grid;
      justify-content: start;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;
      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }
      > h3 {
        grid-area: title;
        font-size: 28px;
      }
      > p {
        grid-area: text;
      }
    }
  }
}
</style>
