const findElementsTop = i =>
  document.querySelector(i.getAttribute('href')).offsetTop

export class ScrollSpy {
  static init(root) {
    this.root = document.querySelector(root)
    this.items = Array.from(this.root.querySelectorAll('a'))
    this.elementsTop = this.items.map(findElementsTop)
    this.height = window.innerHeight / 2

    this.root.addEventListener('click', this.click.bind(this))
    document.addEventListener('scroll', this.scroll.bind(this))
    this.scroll()
  }

  static click(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))

    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  static scroll() {
    console.log('scroll')
    const scrollTop = document.documentElement.scrollTop
    let num

    this.elementsTop.forEach((e, i) => {
      if (scrollTop + this.height > e) {
        num = i
      }
    })
    this.changeClass(this.items[num])
  }

  static changeClass(link) {
    this.items.forEach(item => {
      if (item === link) item.classList.add('active')
      else item.classList.remove('active')
    })
  }
}
