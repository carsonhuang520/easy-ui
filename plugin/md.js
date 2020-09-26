import path from "path"
import fs from "fs"
import marked from "marked"
const mdToJs = (str) => { // 将 markdown 转换为 js
  const content = marked(str).replace(/\\/g, "\\\\").replace(/\`/g, "\\`")
  return `export default \`${content}\``
}
const configureServer = [
  async ({ app }) => {
    app.use(async (ctx, next) => {
      if (ctx.path.endsWith("md")) {
        ctx.type = "js"
        const filePath = path.join(process.cwd(), ctx.path)
        ctx.body = mdToJs(fs.readFileSync(filePath).toString())
      } else {
        await next()
      }
    })
  },
]
const transform = ({ code }) => {
  return mdToJs(code)
}
export function md() {
  return {
    configureServer, // 用于开发
    transforms: [    // 用于rollup // 插件
      {
        test(ctx) {
          return ctx.path.endsWith(".md")
        },
        transform,
      },
    ],
  }
}
