import { css } from './utils'

export class Modal {
  static init(root) {
    this.root = document.querySelector(root)
    this.trigger = document.querySelector(`[data-target="${root.slice(1)}"]`)

    this.trigger.addEventListener('click', this.open.bind(this))
    this.root.addEventListener('click', this.click.bind(this))
    if (!!window.navigator.maxTouchPoints) {
      this.root.addEventListener('touchstart', this.touchstart.bind(this))
      this.root.addEventListener('touchmove', this.touchmove.bind(this))
      this.root.addEventListener('touchend', this.touchend.bind(this))
    }
  }

  static touchstart(e) {
    this.x = e.touches[0].clientX
    this.y = e.touches[0].clientY
  }

  static touchmove(e) {
    this.xEnd = e.touches[0].clientX
    this.yEnd = e.touches[0].clientY
  }

  static touchend() {
    if (Math.abs(this.xEnd - this.x) < Math.abs(this.yEnd - this.y)) {
      if (this.yEnd - this.y < 0) this.close()
    }
    delete this.x
    delete this.y
    delete this.xEnd
    delete this.yEnd
  }

  static open() {
    css(this.root, { top: 0 })
    css(document.documentElement, { overflow: 'hidden' })
    setTimeout(() => {
      this.root.classList.add('active')
    }, 0)
  }

  static click(e) {
    if (
      !e.target.closest('.modal__container') ||
      e.target.classList.contains('close')
    ) {
      this.close()
    }
  }

  static close() {
    this.root.classList.remove('active')
    setTimeout(() => {
      css(this.root, { top: '-100%' })
      css(document.documentElement, { overflow: 'visible' })
    }, 220)
  }
}
