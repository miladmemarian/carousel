const carousel = {
  timerId: null,

  current: 0,

  $carousel: null,

  slides: [
    {
      source: 'image1.jpg',
      title: 'Sky',
      sentence: 'Near Flagstaff, Arizona in the San Francisco Peaks.'
    },
    {
      source: 'image2.jpg',
      title: 'Mountain',
      sentence: 'Near South Island, New Zealand'
    },
    {
      source: 'image3.jpg',
      title: 'Desert',
      sentence: 'Near Oljato-Monument Valley, United States'
    }
  ],

  nextSlideRight: function () {
    if (this.current === this.slides.length - 1) {
      this.current = 0
    }
    else {
      this.current++
    }
  },

  nextSlideLeft: function () {
    if (this.current === 0) {
      this.current = this.slides.length - 1
    }
    else {
      this.current--
    }
  },

  renderSlide: function () {
    const $current = document.createElement('div')
    const currentSlide = this.slides[this.current]

    $current.classList.add('current')
    $current.style.backgroundImage = `url("Images/${currentSlide.source}")`

    const $title = document.createElement('h1')
    $title.classList.add('title')
    $title.textContent = currentSlide.title

    const $sentence = document.createElement('h3')
    $sentence.classList.add('sentence')
    $sentence.textContent = currentSlide.sentence

    const $previous = document.createElement('button')
    $previous.classList.add('previuos')
    $previous.textContent = 'Previous'

    const $next = document.createElement('button')
    $next.classList.add('next')
    $next.textContent = 'Next'

    $current.appendChild($title)
    $current.appendChild($sentence)
    $current.appendChild($previous)
    $current.appendChild($next)

    this.$carousel.innerHTML = ''
    this.$carousel.appendChild($current)

    $previous.addEventListener('click', () => {
      clearInterval(this.timerId)
      this.nextSlideLeft()
      this.renderSlide()
      this.start(this.$carousel)
    })

    $next.addEventListener('click', () => {
      clearInterval(this.timerId)
      this.nextSlideRight()
      this.renderSlide()
      this.start(this.$carousel)
    })
  },

  start: function ($element) {
    this.$carousel = $element
    this.renderSlide()

    this.timerId = setInterval(() => {
      this.renderSlide()
      this.nextSlideRight()
    }, 2000)
  }
}

window.addEventListener('load', () => {
  carousel.start(document.querySelector('.carousel'))
})
