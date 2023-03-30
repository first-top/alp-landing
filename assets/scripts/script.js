const svgStroke = {
  items: document.querySelectorAll(".stroke-item"),
  strokeLength: 0,
  interval: null,
  hoverHandlerBind: null,
  leaveHandlerBind: null,
  addHandlers() {
    for (let item of this.items) {
      item.addEventListener("mouseenter", this.hoverHandlerBind)
      item.addEventListener("mouseleave", this.leaveHandlerBind)
    }
  },
  leaveHandler({target}) {
    clearInterval(this.interval)
    target.closest(".stroke-item").querySelector("rect").classList.remove("hovered")
  },
  hoverHandler({target}) {
    const _this = this
    this.strokeLength = 0
    const rect = target.closest(".stroke-item").querySelector("rect")
    rect.classList.add("hovered")
    const r = rect.rx.baseVal.value
    const w = rect.closest(".stroke-item").clientWidth + 6
    const h = rect.closest(".stroke-item").clientHeight + 6
    const length = 2 * Math.PI * r + 2 * (w - 2 * r) + 2 * (h - 2 * r)
    rect.style.height = `${h}px`
    rect.style.width = `${w}px`
    
    rect.style.strokeDasharray = `${this.strokeLength} ${length}`
    this.interval = setInterval(() => {
      _this.strokeLength += 20
      if (_this.strokeLength >= length) {
        rect.style.strokeDasharray = `${_this.strokeLength} ${length}`
        clearInterval(_this.interval)
      } else {
        rect.style.strokeDasharray = `${_this.strokeLength} ${length}`
      }
    }, 1)
  },
  init() {
    this.leaveHandlerBind = this.leaveHandler.bind(this)
    this.hoverHandlerBind = this.hoverHandler.bind(this)
    this.addHandlers()
  }
}

const videoHandler = {
  videoWrapper: null,
  introItems: null,
  wrapper: null,
  setVideoHeightBind: null,
  setVideoHeight() {
    console.log(this)
    console.log(window.innerWidth)
    const introRect = this.introItems.getBoundingClientRect()
    const wrapperRect = this.wrapper.getBoundingClientRect()
    let videoHeight = 0
    console.log(wrapperRect.top)
    console.log(introRect.top)
    console.log(introRect.top - wrapperRect.top)
    if (window.innerWidth < 921) {
      videoHeight = introRect.top - wrapperRect.top
    }  else {
      videoHeight = introRect.bottom - wrapperRect.top
    }
    this.videoWrapper.style.height = `${videoHeight}px`
    // const introRect = this.introItems.getBoundingClientRect()
  },
  init() {
    this.videoWrapper = document.querySelector(".content__video")
    this.introItems = document.querySelector(".l-intro__items")
    this.wrapper = document.querySelector(".wrapper")
    this.setVideoHeightBind = this.setVideoHeight.bind(this)
    this.setVideoHeightBind()
    window.addEventListener("resize", this.setVideoHeightBind)
  }
}

const setGradient = {
  from: "#0363cf",
  point: "#023271",
  to: "#021740",
  contentNode: null,
  contentBGNode: null,
  introNode: null,
  headerNode: null,
  pointValue: null,
  setGradientBind: null,
  setValues() {

  },
  setGradient() {
    if (!this.contentNode || !this.contentBGNode) return false
    if (window.innerWidth < 920) {
      this.pointValue = this.contentNode.clientHeight - (this.headerNode.clientHeight * 2)
    } else {
      this.pointValue = this.contentNode.clientHeight - (this.headerNode.clientHeight + this.introNode.clientHeight)
    }
    this.pointValue = this.pointValue * 100 / this.contentNode.clientHeight
    this.contentNode.style.background =
      `linear-gradient(to top, ${this.from} 0%, ${this.point} ${this.pointValue}%, ${this.point} ${this.pointValue}%, ${this.to} 100% )`
    this.contentBGNode.style.background =
      `linear-gradient(to top, ${this.from} 0%, ${this.point} ${this.pointValue}%, ${this.point} ${this.pointValue}%, transparent 100% )`
  },
  init() {
    this.contentNode = document.querySelector(".content")
    this.contentBGNode = document.querySelector(".content__bg")
    this.headerNode = document.querySelector("header")
    this.introNode = document.querySelector(".l-intro")
    this.setGradientBind = this.setGradient.bind(this)
    this.setGradientBind()
    window.addEventListener("resize", this.setGradientBind)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  svgStroke.init()
  setGradient.init()
  // videoHandler.init()
})