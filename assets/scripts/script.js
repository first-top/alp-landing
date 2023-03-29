const svgStroke = {
  items: document.querySelectorAll(".l-intro__item"),
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
    target.closest(".l-intro__item").querySelector("rect").classList.remove("hovered")
  },
  hoverHandler({target}) {
    const _this = this
    this.strokeLength = 0
    const rect = target.closest(".l-intro__item").querySelector("rect")
    rect.classList.add("hovered")
    const r = rect.rx.baseVal.value
    const w = rect.closest(".l-intro__item").clientWidth + 6
    const h = rect.closest(".l-intro__item").clientHeight + 6
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
    
    //   this.circles.forEach(circle => {
    //     const percent = circle.getAttribute("data-percent")
    //     const picture = circle.querySelector("circle.current")
    //     const radius = picture.r.baseVal.value
    //     const length = 2 * Math.PI * radius
    //     picture.style.strokeDasharray = `${length} ${length}`
    //     picture.style.strokeDashoffset = length - length * percent / 100
    //   })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  svgStroke.init()
})