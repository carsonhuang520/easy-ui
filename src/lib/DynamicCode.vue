<template>
  <div class="easy-sliding-pictures">
    <div class="easy-sliding-imgs">
      <canvas id="codeImg"></canvas>
      <canvas id="sliderImg"></canvas>
    </div>
    <div class="easy-sliding-slider">
      <div class="track" :class="{ pintuTrue: puzzle }">
        {{ tips }}
      </div>
      <div class="button" @mousedown.prevent="drag"></div>
    </div>
    <div class="easy-sliding-operation">
      <span title="关闭验证码" class="iconfont icon-close"></span>
      <span
        title="刷新验证码"
        @click="canvasInit"
        class="iconfont icon-refresh"
      ></span>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue"
export default {
  setup() {
    let puzzle = ref(false)
    let tips = ref("向右滑动填充拼图")
    let slider = {
      mx: 0,
      bx: 0,
    }
    const canvasInit = () => {
      puzzle.value = false
      tips.value = "向右滑动填充拼图"
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      //x: 254, y: 109
      let mx = random(127, 234),
        bx = random(10, 97),
        y = random(10, 99)

      slider = { mx, bx }

      draw(mx, bx, y)
    }
    const drag = (e) => {
      tips.value = ""
      console.log("drag")
      let dom = e.target
      console.log(dom)
      let sliderImg = document.querySelector("#sliderImg")
      const downCoordinate = { x: e.x, y: e.y }

      let checkx = Number(slider.mx) - Number(sliderImg.style.left)
      let x = 0
      const move = (moveEV) => {
        // console.log(moveEV)
        x = moveEV.x - downCoordinate.x
        if (x > 251 || x <= 0) {
          return false
        }
        dom.style.left = x + "px"
        sliderImg.style.left = x + "px"
      }

      const up = (e) => {
        // console.log(e)
        // console.log("checkx: " + checkx)
        // console.log(e.x - downCoordinate.x, checkx)
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
        dom.style.left = ""
        // 实际滑动会偏小，进行偏移
        let max = checkx - 5
        let min = checkx - 10
        // 采用点击距离和最终离开距离计算滑动距离
        let movex = e.x - downCoordinate.x
        console.log(max, movex, min, checkx)
        //允许正负误差1
        if ((max >= movex && movex >= min) || movex === checkx) {
          console.log("滑动解锁成功")
          puzzle.value = true
          tips.value = "验证成功"
          // setTimeout(() => {
          // this.visible = false
          // }, 300)
          // this.login() // 登录函数
        } else {
          console.log("拼图位置不正确")
          tips.value = "验证失败，请重试"
          puzzle.value = false
          sliderImg.style.left = 0 + "px"
          canvasInit()
        }
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    }

    function draw(mx = 200, bx = 20, y = 50) {
      let mainDom = document.querySelector("#codeImg")
      let bg = mainDom.getContext("2d")
      let width = 300
      let height = 170

      let blockDom = document.querySelector("#sliderImg")
      let block = blockDom.getContext("2d")
      //重新赋值，让canvas进行重新绘制
      blockDom.height = height
      blockDom.width = width
      mainDom.width = width
      mainDom.height = height

      // let imgsrc = "back.jpg"
      // let img = document.createElement("img")
      // img.style.objectFit = "scale-down"
      // img.src = imgsrc
      // img.onload = function () {
      //   bg.drawImage(img, 0, 0, width, height)
      //   block.drawImage(img, 0, 0, width, height)
      // }
      let mainxy = { x: mx, y: y, r: 9 }
      let blockxy = { x: bx, y: y, r: 9 }
      drawBlock(bg, mainxy, "fill")
      drawBlock(block, mainxy, "clip")
      let imgsrc = "back.jpg"
      let img = document.createElement("img")
      img.style.objectFit = "scale-down"
      img.src = imgsrc
      img.onload = function () {
        bg.drawImage(img, 0, 0, width, height)
        block.drawImage(img, 0, 0, width, height)
        const ImageData = block.getImageData(mx, y, 55, 50)
        console.log(ImageData)
        blockDom.width = 55
        block.putImageData(ImageData, 0, y)
      }
      // 提取滑块并放到最左边
      // const y = this.y - r * 2 - 1
    }

    function drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40
      let PI = Math.PI
      //绘制
      ctx.beginPath()
      //left
      ctx.moveTo(x, y)
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true)
      ctx.lineTo(x + w + 5, y)
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false)
      ctx.lineTo(x + w + 5, y + w)
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false)
      ctx.lineTo(x, y + w)
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true)
      ctx.lineTo(x, y)
      //修饰，没有会看不出效果
      ctx.lineWidth = 1
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.stroke()
      // ctx[type]()
      ctx.globalCompositeOperation = "destination-over"
      type === "fill" ? ctx.fill() : ctx.clip()
    }
    const handler = () => {
      canvasInit()
    }
    onMounted(handler)
    return { drag, puzzle, tips, canvasInit }
  },
}
</script>
<style lang="scss">
.easy-sliding {
  &-pictures {
    padding: 0;
    width: 300px;
    border-radius: 2px;
  }
  &-imgs {
    width: 100%;
    height: 170px;
    position: relative;
    #codeImg,
    #sliderImg {
      position: absolute;

      padding: 7px 7px 0 7px;
      // width: inherit;
      // height: inherit;
    }
    #sliderImg {
      position: absolute;
      z-index: 4000;
    }
  }
  &-slider {
    position: relative;
    width: 100%;
    height: 65px;
    border-bottom: #c7c9d0 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .track {
      margin-left: 7px;
      text-align: center;
      width: 286px;
      height: 38px;
      background: rgba(28, 136, 188, 0.5);
      border-radius: 25px;
      font-size: 14px;
      line-height: 38px;
      padding-right: 15px;
      padding-left: 70px;
    }
    .pintuTrue {
      background: #67c23a;
      color: #ffffff;
    }
    .button {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 48px;
      background: #ffffff;
      box-shadow: #b9bdc8 0 0 3px;
      border-radius: 50%;
      left: 7px;
      text-align: center;
      font-size: 28px;
      color: #3e5d8b;
      &:hover {
        color: #2181bd;
      }
    }
  }
  &-operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }
}
</style>
