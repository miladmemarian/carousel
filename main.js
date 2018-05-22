const carousel = {
  current: 1,

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

  renderSlide: function () {
    const $current = document.createElement('div')
    const currentSlide = this.slides[this.current]

    $current.classList.add('current')
    $current.style.backgroundImage = `url("Images/${currentSlide.source}")`

    const $title = document.createElement('div')
    $title.classList.add('title')
    $title.textContent = currentSlide.title

    const $sentence = document.createElement('div')
    $sentence.classList.add('sentence')
    $sentence.textContent = currentSlide.sentence

    $current.appendChild($title)
    $current.appendChild($sentence)

    this.$carousel.innerHTML = ''
    this.$carousel.appendChild($current)
  },

  start: function ($element) {
    this.$carousel = $element

    setInterval(() => {
      this.renderSlide()
      this.nextSlideRight()
    }, 2000)
  }
}

window.addEventListener('load', () => {
  carousel.start(document.querySelector('.carousel'))
})
