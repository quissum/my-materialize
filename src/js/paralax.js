import { css } from './utils'

export class Paralax {
  static init(root) {
    this.paralax = Array.from(document.querySelectorAll(root))
    this.window = window.innerHeight

    this.NUMBER = !!window.navigator.maxTouchPoints ? 25 : 50

    document.addEventListener('scroll', this.scroll.bind(this))
  }

  static scroll() {
    this.paralax.forEach(paralax => {
      const { y, height } = paralax.getBoundingClientRect()

      if (y < this.window && y + height > 0) {
        const PERCENTAGE = this.NUMBER / (height + this.window)
        const translate = (y + height) * PERCENTAGE

        css(paralax.children[0], { transform: `translateY(-${translate}%)` })
      }
    })
  }
}
