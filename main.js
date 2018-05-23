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
    $title.classList.add('shadow')
    $title.textContent = currentSlide.title

    const $sentence = document.createElement('h3')
    $sentence.classList.add('sentence')
    $sentence.classList.add('shadow')
    $sentence.textContent = currentSlide.sentence

    const $advance = document.createElement('div')
    $advance.classList.add('advance')

    const $previous = document.createElement('i')
    $previous.classList.add('fa-angle-left')
    $previous.classList.add('fas')
    $previous.classList.add('fa-3x')
    $previous.classList.add('shadow')

    const $next = document.createElement('i')
    $next.classList.add('fa-angle-right')
    $next.classList.add('fas')
    $next.classList.add('fa-3x')
    $next.classList.add('shadow')

    $current.appendChild($title)
    $current.appendChild($advance)
    $advance.appendChild($previous)
    $advance.appendChild($next)
    $current.appendChild($sentence)

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
    this.renderIndicators()

    this.timerId = setInterval(() => {
      this.renderSlide()
      this.renderIndicators()
      this.nextSlideRight()
    }, 2000)
  },

  renderIndicators: function () {
    const $indicators = document.createElement('div')

    for (let i = 0; i < this.slides.length; i++) {
      const $indicator = document.createElement('span')

      $indicator.classList.add('fa-dot-circle')
      $indicator.classList.add('fas')
      $indicator.classList.add('dots')

      if (i === this.current) $indicator.classList.add('current-slide')

      $indicator.addEventListener('click', () => {
        this.current = i
        this.renderSlide()
        this.renderIndicators()
      })

      $indicators.appendChild($indicator)
    }

    this.$carousel.firstChild.appendChild($indicators)
  }
}

window.addEventListener('load', () => {
  carousel.start(document.querySelector('.carousel'))
})
