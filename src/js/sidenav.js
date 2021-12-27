import { css } from './utils'

export class Sidenav {
  static init(root) {
    this.root = document.querySelector(root)
    this.trigger = document.querySelector(`[data-target="${root.slice(1)}"]`)

    this.trigger.addEventListener('click', this.open.bind(this))
    this.root.addEventListener('click', this.close.bind(this))
  }

  static open() {
    css(this.root, { top: 0 })
    css(document.documentElement, { overflow: 'hidden' })
    setTimeout(() => {
      this.root.classList.add('active')
    }, 0)
  }

  static close(e) {
    if (!e.target.closest('.sidenav__container')) {
      this.root.classList.remove('active')
      setTimeout(() => {
        css(this.root, { top: '-100%' })
        css(document.documentElement, { overflow: 'visible' })
      }, 220)
    }
  }
}
