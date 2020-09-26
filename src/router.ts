import Home from "./views/Home.vue"
import Doc from "./views/Doc.vue"
import SwitchDemo from "./components/SwitchDemo.vue"
import ButtonDemo from "./components/ButtonDemo.vue"
import DialogDemo from "./components/DialogDemo.vue"
import TabsDemo from "./components/TabsDemo.vue"
import CheckCodeDemo from "./components/CheckCodeDemo.vue"
import { createWebHashHistory, createRouter } from "vue-router"
import { h } from "vue"
import Markdown from "./components/Markdown.vue"
import intro from "./markdown/intro.md"
import getStarted from "./markdown/get-started.md"
import install from "./markdown/install.md"

const history = createWebHashHistory()
const md = (string) => h(Markdown, { content: string, key: string })
export const router = createRouter({
  history: history,
  routes: [
    { path: "/", component: Home },
    {
      path: "/doc",
      component: Doc,
      children: [
        { path: "", redirect: "/doc/intro" },
        { path: "switch", component: SwitchDemo },
        { path: "button", component: ButtonDemo },
        { path: "dialog", component: DialogDemo },
        { path: "tabs", component: TabsDemo },
        { path: "intro", component: md(intro) },
        { path: "install", component: md(install) },
        { path: "getStarted", component: md(getStarted) },
        { path: "checkcode", component: CheckCodeDemo },
      ],
    },
  ],
})
