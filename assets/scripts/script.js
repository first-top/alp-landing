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
    } else {
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
/*
const modal = {
  modalOpen: null,
  bodyNode: document.querySelector("body"),
  modal: null,
  showModal(e) {
    e.preventDefault()
    const _this = this

    this.modal.classList.add("opening")
    setTimeout(() => {
      _this.modal.classList.remove("opening")
    }, 1500)
    setTimeout(() => {
      _this.modal.classList.add("opened")
    }, 1000)
    // this.bodyNode.classList.add("no-scroll")
    this.modal.addEventListener("click", this.closeModalBind)
    window.addEventListener("keyup", this.closeModalBind)
  },
  closeModal({key, keyCode, code, target, type}) {
    const _this = this
    if (type === "keyup") {
      if (key === "Escape" || code === "Escape" || keyCode === 27) {
        _this.modal.classList.add("closing")
        setTimeout(() => {
          _this.modal.classList.remove("closing")
        }, 1500)
        setTimeout(() => {
          _this.modal.classList.remove('opened')
        }, 1000)
        this.bodyNode.classList.remove("no-scroll")
        this.modal.removeEventListener("click", this.closeModalBind)
        window.removeEventListener("keyup", this.closeModalBind)
      }
    }
    if (type === "click") {
      if (target.closest(".modal__close") || !target.closest(".modal__body")) {
        _this.modal.classList.add("closing")
        setTimeout(() => {
          _this.modal.classList.remove("closing")
        }, 1500)
        setTimeout(() => {
          _this.modal.classList.remove('opened')
        }, 1000)
        // this.modal.classList.remove('opened')
        this.bodyNode.classList.remove("no-scroll")
        this.modal.removeEventListener("click", this.closeModalBind)
        window.removeEventListener("keyup", this.closeModalBind)
      }
    }
  },
  addListeners() {
    this.modalOpen.addEventListener("click", this.showModalBind)
  },
  init(type) {
    switch (type) {
      case "request":
        this.modalOpen = document.querySelector(".header__request")
        this.modal = document.querySelector(".modal.modal-request")
        break
      case "automation":
        this.modalOpen = document.querySelector(".automation-open")
        this.modal = document.querySelector(".modal.modal-automation")
        break
    }
    if (this.modalOpen && this.modal) {
      // this.form = this.modal.querySelector("form")
      this.closeModalBind = this.closeModal.bind(this)
      this.showModalBind = this.showModal.bind(this)
      // this.form.addEventListener("submit", formUtils.sendData.bind(formUtils, "feedback-form"))
      this.addListeners()
    }
  }
}
*/
window.addEventListener("DOMContentLoaded", () => {
  svgStroke.init()
  setGradient.init()
  let mask = new PhoneMask({})
  const request = new LandingModal("request")
  const automation = new LandingModal("automation")
  const outsourcing = new LandingModal("outsourcing")
  const digital = new LandingModal("digital")
  // modal.init("request")
  // modal.init("automation")
  if (document.querySelector('.l-projects__slider')) {
    const projects = new Swiper('.l-projects__slider', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 68,
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 90,
        slideShadows: false,
      },
    })
  }
  // videoHandler.init()
})