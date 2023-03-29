const svgStroke = {
  items: document.querySelectorAll(".l-intro__item"),
  addHandlers() {
    for (let item of this.items) {
      item.addEventListener("mouseenter", this.hoverHandler)
    }
  },
  hoverHandler({target}) {
    const rect = target.closest(".l-intro__item").querySelector("rect")
    const r = rect.rx.baseVal.value
    const w = rect.clientWidth
    const h = rect.clientHeight
    const length = 2 * Math.PI * r + 2 * (w - 2 * r) + 2 * (h - 2 * r)
  
    rect.style.strokeDasharray = `${length} ${length}`
    rect.style.strokeDashoffset = `${length}`
  },
  init() {
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
  // svgStroke.init()
})