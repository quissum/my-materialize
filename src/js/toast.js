const container = `<div id="toast" class="toast"></div>`
const buildContent = text => `<div class="toast__content">${text}</div>`
const body = document.querySelector('body')

export class Toast {
  static init(root) {
    this.trigger = document.querySelector(`[data-target="${root.slice(1)}"]`)

    this.trigger.addEventListener('click', this.open.bind(this))
  }

  static touchstart(e) {
    this.x = e.touches[0].clientX
    this.y = e.touches[0].clientY
  }

  static touchmove(e) {
    this.xEnd = e.touches[0].clientX
    this.yEnd = e.touches[0].clientY
  }

  static touchend(e) {
    if (Math.abs(this.xEnd - this.x) > Math.abs(this.yEnd - this.y)) {
      if (this.xEnd - this.x > 0) {
        this.close(e.target)
      }
    }
    delete this.x
    delete this.y
    delete this.xEnd
    delete this.yEnd
  }

  static open() {
    if (!this.container) {
      body.insertAdjacentHTML('afterbegin', container)
      this.container = document.querySelector('#toast')
    }
    this.container.insertAdjacentHTML('beforeend', buildContent('I am Toast'))
    const content = this.container.lastElementChild

    if (!!window.navigator.maxTouchPoints) {
      content.addEventListener('touchstart', this.touchstart.bind(this))
      content.addEventListener('touchmove', this.touchmove.bind(this))
      content.addEventListener('touchend', this.touchend.bind(this))
    }

    setTimeout(() => {
      content.classList.add('active')
    }, 0)
    setTimeout(() => {
      this.close(content)
    }, 3000)
  }

  static close(el) {
    el.classList.remove('active')

    setTimeout(() => {
      el.remove()
      if (this.container && !this.container.children.length) {
        this.container.remove()
        delete this.container
      }
    }, 220)
  }
}
