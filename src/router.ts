import Home from "./views/Home.vue"
import Doc from "./views/Doc.vue"
import SwitchDemo from "./components/SwitchDemo.vue"
import ButtonDemo from "./components/ButtonDemo.vue"
import DialogDemo from "./components/DialogDemo.vue"
import TabsDemo from "./components/TabsDemo.vue"
import DocDemo from "./components/DocDemo.vue"
import Intro from "./views/Intro.vue"
import Install from "./views/Install.vue"
import GetStarted from "./views/GetStarted.vue"
import CheckCodeDemo from "./components/CheckCodeDemo.vue"
import { createWebHashHistory, createRouter } from "vue-router"

const history = createWebHashHistory()
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
        { path: "intro", component: Intro },
        { path: "install", component: Install },
        { path: "getStarted", component: GetStarted },
        { path: "checkcode", component: CheckCodeDemo }
      ],
    },
  ],
})