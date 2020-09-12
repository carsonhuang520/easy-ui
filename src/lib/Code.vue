<template>
  <div>
    <div id="code-tip" style="position: relative; width: 260px; height: 1px">
      <div class="tncode_div_bg" id="tncode_div_bg"></div>
      <div class="tncode_div" id="tncode_div">
        <div class="loading">加载中</div>
        <canvas class="tncode_canvas_bg"></canvas>
        <canvas class="tncode_canvas_mark"></canvas>
        <div class="hgroup"></div>
        <div class="tncode_msg_error"></div>
        <div class="tncode_msg_ok"></div>
        <div class="slide">
          <div class="slide_block">
            <Icon type="md-log-in" size="32" />
          </div>
          <div class="slide_block_text">拖动左边滑块完成上方拼图</div>
        </div>
        <div class="tools">
          <div class="tncode_close"></div>
          <div class="tncode_refresh"></div>
          <div class="tncode_tips"></div>
        </div>
      </div>
    </div>
    <Button style="position: relative" @click="handleClick"
      >点击按钮进行验证</Button
    >
  </div>
</template>
<script lang="ts">
import { onMounted } from "vue"
import Button from "./Button.vue"
export default {
  components: {
    Button,
  },
  setup() {
    const w = 240
    const h = 150
    const l = 42
    const r = 9
    const PI = Math.PI
    const L = l + r * 2 + 3
    let canvas = null
    let block = null
    let slider = null
    let canvasCtx = null
    let blockCtx = null
    let refresh = null
    let img = null
    onMounted(() => {
      canvas = document.getElementsByClassName("tncode_canvas_bg")[0]
      block = document.getElementsByClassName("tncode_canvas_mark")[0]
      slider = document.getElementsByClassName("slide_block")[0]
      refresh = document.getElementsByClassName("tncode_refresh")[0]
      canvasCtx = canvas.getContext("2d")
      blockCtx = block.getContext("2d")
      initImg()
      bindEvents()
    })
    function getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    }
    function getRandomImgSrc() {
      return `https://picsum.photos/id/${getRandomNumberByRange(
        0,
        1084
      )}/${w}/${h}`
    }
    function drawPath(ctx, x, y, operation) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      console.log(x, y)
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
      ctx.lineTo(x + l, y)
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
      ctx.lineTo(x, y)
      ctx.lineWidth = 2
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
      ctx.stroke()
      ctx.globalCompositeOperation = "destination-over"
      operation === "fill" ? ctx.fill() : ctx.clip()
    }
    function draw(img) {
      const x = getRandomNumberByRange(L + 10, w - (L + 10))
      const y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
      drawPath(canvasCtx, x, y, "fill")
      drawPath(blockCtx, x, y, "clip")

      canvasCtx.drawImage(img, 0, 0, w, h)
      blockCtx.drawImage(img, 0, 0, w, h)

      const y1 = y - r * 2 - 1
      const imageData = blockCtx.getImageData(x - 3, y1, L, L)
      block.width = L
      blockCtx.putImageData(imageData, 0, y1)
    }
    function createImg(onload) {
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.onload = onload
      img.onerror = () => {
        img.setSrc(getRandomImgSrc()) // 图片加载失败的时候重新加载其他图片
      }

      img.setSrc = function (src) {
        const isIE = window.navigator.userAgent.indexOf("Trident") > -1
        if (isIE) {
          // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
          const xhr = new XMLHttpRequest()
          xhr.onloadend = function (e) {
            const file = new FileReader() // FileReader仅支持IE10+
            file.readAsDataURL(e.target.response)
            file.onloadend = function (e) {
              img.src = e.target.result
            }
          }
          xhr.open("GET", src)
          xhr.responseType = "blob"
          xhr.send()
        } else img.src = src
      }

      img.setSrc(getRandomImgSrc())
      return img
    }
    function initImg() {
      const img1 = createImg(() => {
        // this.setLoading(false)
        draw(img1)
      })
      img = img1
    }
    function bindEvents() {
      refresh.onclick = () => {
        reset()
      }
      let originX,
        originY,
        trail = [],
        isMouseDown = false
      const handleDragStart = (e) => {
        originX = e.clientX || e.touches[0].clientX
        console.log(originX)
        originY = e.clientY || e.touches[0].clientY
        isMouseDown = true
      }

      const width = w
      const handleDragMove = (e) => {
        if (!isMouseDown) {
          return false
        }
        e.preventDefault()
        const eventX = e.clientX || e.touches[0].clientX
        const eventY = e.clientY || e.touches[0].clientY
        let moveX = eventX - originX
        const moveY = eventY - originY
        console.log(moveX)
        if (moveX < 0) {
          moveX = 0
        }
        if (moveX + 51 > width) {
          moveX = width - 51
        }
        slider.style.left = moveX + "px"
        const blockLeft = ((width - 40) / (width - 40)) * moveX
        if (moveX < 10) {
          block.style.left = 10 + "px"
        } else {
          block.style.left = blockLeft + "px"
        }

        // console.log(moveX, blockLeft)
        // trail.push(moveY)
      }
      const handleDragEnd = (e) => {
        if (!isMouseDown) {
          return false
        }
        isMouseDown = false
      }

      slider.addEventListener("mousedown", handleDragStart)
      slider.addEventListener("touchstart", handleDragStart)
      block.addEventListener("mousedown", handleDragStart)
      block.addEventListener("touchstart", handleDragStart)
      document.addEventListener("mousemove", handleDragMove)
      document.addEventListener("touchmove", handleDragMove)
      document.addEventListener("mouseup", handleDragEnd)
      document.addEventListener("touchend", handleDragEnd)
    }
    function reset() {
      // 重置样式
      // setClass(this.sliderContainer, 'sliderContainer')
      slider.style.left = 0 + "px"
      block.width = w
      block.style.left = 10 + "px"
      // sliderMask.style.width = 0 + 'px'

      // 清空画布
      canvasCtx.clearRect(0, 0, w, h)
      blockCtx.clearRect(0, 0, w, h)

      // 重新加载图片
      // this.setLoading(true)
      img.setSrc(getRandomImgSrc())
    }
    const handleClick = () => {}
    return { handleClick }
  },
}
</script>
<style lang="scss">
.tncode {
  width: 260px;
  cursor: pointer;
  opacity: 1;
  line-height: 24px;
  font-size: 14px;
}

/*浮层*/
.tncode_div_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.3;
  filter: alpha(opacity=30);
  background-color: #000;
  *zoom: 1;
  display: none;
}

.tncode_div {
  // display: none;
  background-color: white;
  z-index: 99999;
  width: 260px;
  height: 260px;
  position: absolute;
  left: 50%;
  top: -134px;
  margin-top: -130px;
  margin-left: -130px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  overflow: hidden;
  filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=135, Strength=5);
  box-shadow: 2px 2px 5px #969696;
}

.tncode_div .tncode_canvas_bg {
  z-index: 0;
}

.tncode_div .tncode_canvas_mark {
  z-index: 10000;
}

.tncode_div canvas {
  position: absolute;
  left: 10px;
  top: 10px;
}

.tncode_div .loading {
  padding-top: 60px;
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #ccc;
  width: 240px;
  height: 150px;
  text-align: center;
  box-sizing: border-box;
}

.dd {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: ddf 0.1s ease-in 0s infinite;
  -o-animation: ddf 0.1s ease-in 0s infinite;
  animation: ddf 0.1s ease-in 0s infinite;
}

@-webkit-keyframes ddf {
  0% {
    -webkit-transform: translate(-8px, 3px);
  }

  20% {
    -webkit-transform: translate(-3px, 1.5px);
  }

  50% {
    -webkit-transform: translate(0px, 0px);
  }

  70% {
    -webkit-transform: translate(5px, -1.5px);
  }

  100% {
    -webkit-transform: translate(0px, 0px);
  }
}

@-o-keyframes ddf {
  0% {
    -o-transform: translate(-8px, 3px);
  }

  20% {
    -o-transform: translate(-3px, 1.5px);
  }

  50% {
    -o-transform: translate(0px, 0px);
  }

  70% {
    -o-transform: translate(5px, -1.5px);
  }

  100% {
    -o-transform: translate(0px, 0px);
  }
}

@-moz-keyframes ddf {
  0% {
    -moz-transform: translate(-8px, 3px);
  }

  20% {
    -moz-transform: translate(-3px, 1.5px);
  }

  50% {
    -moz-transform: translate(0px, 0px);
  }

  70% {
    -moz-transform: translate(5px, -1.5px);
  }

  100% {
    -moz-transform: translate(0px, 0px);
  }
}

@keyframes ddf {
  0% {
    transform: translate(-8px, 3px);
  }

  20% {
    transform: translate(-3px, 1.5px);
  }

  50% {
    transform: translate(0px, 0px);
  }

  70% {
    transform: translate(5px, -1.5px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

.hgroup {
  z-index: 20000;
  content: "";
  position: absolute;
  left: -800px;
  top: 70px;
  width: 250px;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: searchLights 3s ease-in 0s infinite;
  -o-animation: searchLights 3s ease-in 0s infinite;
  animation: searchLights 3s ease-in 0s infinite;
}

@-webkit-keyframes searchLights {
  0% {
    left: -800px;
    top: 70px;
  }

  to {
    left: 350px;
    top: 70px;
  }
}

@-o-keyframes searchLights {
  0% {
    left: -800px;
    top: 70px;
  }

  to {
    left: 350px;
    top: 70px;
  }
}

@-moz-keyframes searchLights {
  0% {
    left: -800px;
    top: 70px;
  }

  to {
    left: 350px;
    top: 70px;
  }
}

@keyframes searchLights {
  0% {
    left: -800px;
    top: 70px;
  }

  to {
    left: 350px;
    top: 70px;
  }
}

/*拉条*/
.slide,
.slide_block,
.tools .tncode_close,
.tools .tncode_refresh {
  background-repeat: no-repeat;
  background-image: url("../assets/images/icon.png");
}

.tncode_msg_ok {
  background-color: #24c628;
}

.tncode_msg_error {
  background-color: #de5145;
}

.tncode_msg_ok,
.tncode_msg_error {
  position: absolute;
  top: 136px;
  left: 10px;
  width: 240px;
  height: 26px;
  line-height: 20px;
  color: #fff;
  margin: 0;
  padding: 2px 10px;
  overflow: visible;
  background-position: 0px 0px;
  font-size: 14px;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 10000;
}

.slide {
  position: absolute;
  top: 160px;
  width: 93.52%;
  height: 0px;
  background-color: white;
  background-size: 100%;
  margin: 5.39% 3.24%;
  padding: 0px 0px 13.67%;
  overflow: visible;
  background-position: 0px 0px;
}

.tools {
  position: absolute;
  top: 210px;
  width: 93.52%;
  height: 0px;
  background-color: white;
  background-size: 100%;
  margin: 5.39% 3.24%;
  padding: 5px 0px 13.67%;
  overflow: visible;
  background-position: 0px 0px;
  border-top: 1px solid #eeeeee;
}

.slide_block {
  background-position: 0px 12.9794%;
  width: 65px;
  height: 65px;
  position: absolute;
  left: 0px;
  top: 0px;
  margin: -4.62% 0 0 -2.31%;
  cursor: pointer;
}

.slide_block_text {
  background-position: 0px 12%;
  height: 65px;
  position: absolute;
  left: 65px;
  top: 18px;
  margin: -4.62% 0 0 -2.31%;
  cursor: pointer;
  font-size: 14px;
  color: rgb(136, 148, 157);
  display: none;
}

.tncode_canvas_bg,
.tncode_canvas_mark {
  /* width: 240px;*/
}

.tools .tncode_close {
  background-position: 0 50%;
  height: 30px;
  width: 30px;
  float: left;
  margin-right: 10px;
  cursor: pointer;
}

.tools .tncode_refresh {
  background-position: 0 94%;
  height: 30px;
  width: 30px;
  float: left;
  cursor: pointer;
}

.tools .tncode_tips {
  float: right;
}

.tools .tncode_tips a {
  text-decoration: none;
  font-size: 10px;
  color: rgb(136, 148, 157);
}
</style>
