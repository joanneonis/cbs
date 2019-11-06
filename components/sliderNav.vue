<template>
  <div class="slider-nav">
    <!-- <div class="fake-slider-nav" @click="slide()"></div> -->
    <div
      class="slider-nav__slider"
      v-swiper:SwiperObject="swiperOptions"
     >
      <div class="swiper-wrapper">
        <div
          v-for="(type) in items"
          :key="type.title"
          class="swiper-slide"
        >
          <h4 class="mb-0 slide-title">{{ type.title }}</h4>
        </div>
      </div>
    </div>
    <div class="slider-nav__suffix">
      <h4 class="mb-0">NL</h4>
      <div>
        <svg version="1.1" id="indicator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 29.1 100" style="enable-background:new 0 0 29.1 100;" xml:space="preserve">
        <style type="text/css">
          .dot{stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;opacity: 1;}
          .arrow{fill:#FFFFFF;}
        </style>
        <g id="Layer_1">
          <polygon class="arrow" points="16,22 20.3,22 14.6,12 8.8,22 13.2,22 13.2,78 8.8,78 14.5,88 20.3,78 16,78 	"/>
          <circle id="dot" class="dot" cx="14.5" cy="50" r="7.2"/>
        </g>
        </svg>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { type: 'inkomen', title: 'Laag inkomen' },
        { type: 'armoede', title: 'Armoede' },
        { type: 'bijstand', title: 'Bijstand' },
        { type: 'koopkracht', title: 'Koopkracht' }
      ],
      swiperOptions: {
        grabCursor: true,
        direction: 'vertical',
        loop: true,
        mousewheelControl: true,
        mousewheel: {
          eventsTarged: this.navContainer,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        // slidesPerView: 4,
        slidesPerView: 'auto',
        // centeredSlides: true,
        autoHeight: true,
      },
      movingClass: 'is-moving',
      spaceBetween: 20,
    };
  },

  mounted() {
    this.swiperEvents();
    this.$emit('slideChanges', 0);
    this.navContainer = document.querySelector('.nav-container');
  },

  methods: {
    swiperEvents() {
      const swiper = this.SwiperObject;

      swiper.on('sliderMove', () => {
        swiper.$el[0].classList.add(this.movingClass);
      });

      swiper.on('touchEnd', () => {
        swiper.$el[0].classList.remove(this.movingClass);
      });

      swiper.on('slideChange', () => {
        this.$emit('slideChanges', swiper.realIndex);
      });
    },

    slide() {
      const swiper = this.SwiperObject;
      swiper.slideNext();
    }
  },
}
</script>

<style lang="scss" scoped>
$height: 50px;

h4 {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
  font-size: 31px;
}

.swiper-container {
  height: ($height * 4);
  margin: 0 20px 0 0;
}

.swiper-slide {
  height: $height;
  text-align: right;

  .slide-title {
    color: #0000;
    text-transform: uppercase;
    display: block;
  }

  &.swiper-slide-active h4 {
    color: white;
  }
}

.slider-nav {
  display: flex;
  justify-content: flex-end;

  &__suffix {
    display: flex;
    flex-flow: column;
    // align-items: center;
    padding-bottom: 10px;
  }
}

#indicator {
    width: 19px;
    margin-top: 13px;
}

@keyframes slide {
  0% {transform: translate(0px, -10px)}
  50% {transform: translate(0px, 10px)}
  100% {transform: translate(0px, -10px)}
}

#dot {
  animation: slide 2.5s infinite;
}

.fake-slider-nav {
    position: absolute;
    left: 0;
    right: 70px;
    bottom: 60px;
    height: 160px;
    background: red;
    z-index: 2;
    opacity: 0;
    // pointer-events: none;
}
</style>
