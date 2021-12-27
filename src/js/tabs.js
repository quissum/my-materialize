import { css } from './utils'

export class Tabs {
  static init(root) {
    this.root = document.querySelector(root)
    this.content = Array.from(this.root.querySelectorAll('.tabs__content'))
    this.tabsNav = this.root.querySelector('.tabs__nav')
    this.tabs = this.root.querySelectorAll('.tabs__nav>li')

    this.tabsNav.addEventListener('click', this.click.bind(this))
  }

  static click(e) {
    if (e.target.nodeName === 'LI') {
      this.tabs.forEach((tab, i) => {
        if (e.target === tab) {
          tab.classList.add('active')
          this.change(i)
        } else tab.classList.remove('active')
      })
    }
  }

  static change(num) {
    this.content.forEach((el, i) => {
      if (i === num) css(el, { order: 0 })
      else css(el, { order: 1 })
    })
  }
}
