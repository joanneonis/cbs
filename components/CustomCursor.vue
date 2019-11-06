<template>
  <div>
    <div class="cursor-container">
      <div ref="pointer" class="cursor-pointer"></div>
      <div ref="contentContainer" class="cursor-inner">
        <div ref="content" class="cursor-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: null,
      mouseY: null,
      currentX: 0,
      currentY: 0,
      w: 40,
      h: 40,
      currentTarget: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const ctx = this;
      this.currentX = window.innerWidth / 2;
      this.currentY = window.innerHeight / 2;

      document.body.addEventListener('mousemove', (e) => {
        ctx.currentTarget = e.target;
        ctx.mouseX = e.clientX;
        ctx.mouseY = e.clientY;

        ctx.scrollFalse = false;
      });

      window.onscroll = () => {
        // document.body.dispatchEvent(new Event('mousemove'));

        ctx.scrollDirection = ctx.prevScroll > window.pageYOffset;
        ctx.prevScroll = window.pageYOffset;

        ctx.moveCursor(ctx.currentTarget, true);
        ctx.updateCursor();
      };

      setInterval(() => { ctx.updateCursor(); ctx.moveCursor(ctx.currentTarget, false); }, 1000 / 60);
    },

    moveCursor(target, scrollTriggered) {
      if (!target) { return; }

      if (target.tagName === 'circle' && target.id !== 'dot') {
        this.$refs.contentContainer.classList.add('is-active');
        this.$refs.content.innerHTML = target.getAttribute('data-content');

      } else {
        this.$refs.contentContainer.classList.remove('is-active');
      }
    },

    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },

    updateCursor() {
      if (!this.$refs.pointer || !this.$refs.contentContainer) return;

      const pl = this.mouseX - 5 / 2;
      const pt = this.mouseY - 5 / 2;
      this.$refs.pointer.style.transform = `translate3d(${pl}px, ${pt}px, 0)`;

      this.currentX = this.lerp(this.currentX, this.mouseX, 0.1);
      this.currentY = this.lerp(this.currentY, this.mouseY, 0.1);

      const l = this.currentX - this.w / 2;
      const t = this.currentY - this.h / 2;

      this.$refs.contentContainer.style.transform = `translate3d(${l}px, ${t}px, 0)`;
    },
  },
};
</script>

<style lang="scss">

.cursor-container {
	position: fixed;
  top: 0;
  z-index: 999;
  pointer-events: none;
}

.cursor-inner {
	position: fixed;
  top: 0;
  z-index: 999;
	pointer-events: none;


	position: fixed;
	top: 0;
	left: 0;
	transition: opacity .2s;
	opacity: 0;
	pointer-events: none;
	z-index: 2;

	color: black;
	line-height: 40px;
	text-align: center;
}

.cursor-content {
	background: white;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	display: block;
	transform: scale3d(.7, .7, .7);
  transition: all .2s;
  font-family: $headings-font-family;
  font-size: 12px;
}

.cursor-inner.is-active .cursor-content {
	transform: scale3d(1, 1, 1);
}

.cursor-inner.is-active {
	opacity: 1;
}
</style>
