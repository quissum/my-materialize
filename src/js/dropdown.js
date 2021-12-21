import { css } from './utils'

const computeHeight = (acc, el) => acc + el.getBoundingClientRect().height

export class Dropdown {
  static init(root, options) {
    this.root = document.querySelector(root)
    this.btn = this.root.querySelector('.dropdown__btn')
    this.content = this.root.querySelector('.dropdown__content')

    this.computeHeight()
    document.addEventListener('click', this.click.bind(this))
  }

  static computeHeight() {
    const items = Array.from(this.content.children)
    this.height = items.reduce(computeHeight, 0)
  }

  static click(e) {
    if (e.target.classList.contains('dropdown__btn')) this.open()
    else if (!e.target.closest('.dropdown')) this.close()
  }

  static open() {
    const { height } = this.btn.getBoundingClientRect()
    this.root.classList.add('active')
    css(this.btn, {
      transform: `translateY(${this.height - height}px)`,
      opacity: 0,
    })
    css(this.content, { height: this.height + 'px' })
  }

  static close() {
    this.root.classList.remove('active')
    css(this.btn, {
      transform: `translateY(0px)`,
      opacity: 1,
    })
    css(this.content, { height: '0px' })
  }
}
