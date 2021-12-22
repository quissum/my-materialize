import { css } from './utils'

export class ImageBox {
  static init(root) {
    this.root = document.querySelector(root)
    this.top = this.root.getBoundingClientRect().top

    this.root.addEventListener('click', this.switch.bind(this))
    document.addEventListener('scroll', this.switch.bind(this))
  }

  static switch(e) {
    if (this.root.classList.contains('active')) this.close()
    else if (e.type === 'click') this.open()
  }

  static open() {
    this.root.classList.add('active')
    css(this.root, {
      transform: `translateY(${
        document.documentElement.scrollTop - this.top
      }px)`,
    })
  }

  static close() {
    this.root.classList.remove('active')
    css(this.root, {
      transform: `translateY(0px)`,
    })
  }
}
