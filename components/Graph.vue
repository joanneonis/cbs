<template>
  <div class="container body-container">
    <div
      class="row-container"
    >
      <div
        class="nav-container"
      >
        <h1 class="multi-color">
          <span>
            Armoede
          </span> <br>
          <span>
            Als trend
          </span>
        </h1>
        <strong class="help">Selecteer categorie (versleep de titels)</strong>
        <sliderNav @slideChanges="handleSlides" />
      </div>


      <div class="graph-container-outer">
        <div class="graph-container">
          <graphSvg :active="selectedItem.circle" />
        </div>
      </div>
    </div>

    <div class="info info-item">
      <template v-if="selectedItem.articles && lastClicked === 'circle'">
        <strong>
          {{ selectedItem.paper }} - {{ selectedItem.articles.length }} artikelen in {{ getMonthName(selectedItem.month) }} 2018
        </strong>
        <div class="info__inner info-item">
          <ul class="info-item">
            <li
              v-for="(item, i) in selectedItem.articles"
              :key="`item-${i}`"
              class="info-item"
            >
              <a class="info-item" target="_blank" :href="item.url">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </template>
      <div v-if="lastClicked === 'polygon'">
        <!-- {{ selectedCbs }} -->
        <strong class="info-item">
          CBS - {{ getMonthName(selectedCbs.month) }} 2018
        </strong>
        <h6 class="info-item">{{ selectedCbs.titel }}</h6>
        <p class="info-item">
          {{ selectedCbs.intro }}
        </p>
      </div>

      <strong class="mb-1 info-item" v-if="!lastClicked">
        Klik op een bol of ruit voor informatie
      </strong>
    </div>

    <div class="legend">
      <legend-info />
    </div>
  </div>
</template>

<script>
import cbsData from '~/assets/data/cbs';
import trendData from '~/assets/data/trends';
import sliderNav from '~/components/sliderNav';
import graphSvg from '~/components/graphSvg';
import LegendInfo from '~/components/LegendInfo';

export default {
  components: {
    sliderNav,
    graphSvg,
    LegendInfo,
  },

  props: {
    news: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      cbs: cbsData,
      trends: trendData,
      activeStats: 'inkomen',
      papers: ['nrc', 'trouw'],
      items: [
        'inkomen',
        'armoede',
        'bijstand',
        'koopkracht'
      ],
      maxValueArticles: 20,
      paperColors: ['#4285F4', '#0F9D58'],
      selectedItem: {
        paper: null,
        month: 0,
        circle: null,
        articles: null,
      },
      selectedCbs: null,
      cbsTriangle: null,
      lastClicked: null,
    };
  },

  mounted() {
    this.clickedCircle();
  },

  methods: {
    switchType(type) {
      if (this.activeStats === type) return;
      this.activeStats = type;
      this.draw();
    },

    draw() {
      this.drawNewsCircles();
      this.drawCbsTriangles();
      this.drawGraphline();
    },

    drawNewsCircles() {
      var countCircles = 0;
      this.papers.forEach((paper, pi) => {
        const monthly = this.news[this.activeStats][paper].monthlyCount;

        monthly.forEach((month, i) => {
          var circleSize = this.mapRange(month, 0, (this.maxValueArticles * 1.3), 10, 70);
          var circleY = (this.mapRange(month, 0, this.maxValueArticles, 348, 200)); //+ ((348 - 200) / 2)
          var circleX = this.mapRange(i, 0, 11, 97, 577);

          var circles = document.querySelectorAll('#news circle');
          var circle = circles[countCircles];
              circle.setAttributeNS(null, 'cx', circleX); // 780 tot 1269
              circle.setAttributeNS(null, 'cy', circleY);
              circle.setAttributeNS(null, 'r', circleSize);
              // circle.setAttributeNS(null, 'style', `fill: ${this.paperColors[pi]}; opacity: .5` );
              circle.setAttributeNS(null, 'class', paper );

              circle.setAttribute('data-paper', paper);
              circle.setAttribute('data-month', i);
              circle.setAttribute('data-content', month);
              circle.setAttribute('id', `${paper}-${month}-${i}`);
          countCircles++;
        });
      });
    },

    drawCbsTriangles() {
      var svgns = "http://www.w3.org/2000/svg";

      // ! todo filteren op keyword [activeStats]
      const temp = this.cbs.filter(article => article.keyword === this.activeStats);
      var container = document.getElementById('cbs');

      this.animateOldTriangles(container.childNodes);

      var count = 0;
      temp.forEach((article) => {
        var Xoffset = article.month * ((1269.5 - 779.5) / 12);
        var triangle = document.createElementNS(svgns, 'polygon');

          triangle.setAttribute('data-url', article.link);

          if (article.mood === 'positive') {
            // <polygon id="arrowup" class="st3" points="10.1,366.8 0,384.3 20.2,384.3 	"/>
            triangle.setAttributeNS(null, 'points', `
              ${ 779.5 + Xoffset },
              ${ 366.8 - count }
              ${ 769.4 + Xoffset },
              ${ 384.3 - count }
              ${ 789.6 + Xoffset },
              ${ 384.3 - count }
            `);
            triangle.setAttributeNS(null, 'class', 'cbs positive' );
            triangle.setAttributeNS(null, 'data-mood', 'positive' );
            triangle.setAttributeNS(null, 'style', `transform-origin: ${ 780 + Xoffset }px ${ 367 - count }px;` );
          } else if (article.mood === 'negative'){
            // <polygon id="arrowdown" class="st4" points="10.1,402.2 20.2,384.7 0,384.7 	"/>
            triangle.setAttributeNS(null, 'points', `
              ${ 779.5 + Xoffset },
              ${ 402.2 - count }
              ${ 789.6 + Xoffset },
              ${ 384.7 - count }
              ${ 769.4 + Xoffset },
              ${ 384.7 - count }
            `);
            triangle.setAttributeNS(null, 'class', 'cbs negative' );
            triangle.setAttributeNS(null, 'data-mood', 'negative' );
            triangle.setAttributeNS(null, 'style', `transform-origin: ${ 780 + Xoffset }px ${ 367 - count }px;` );
          } else {
            // <polygon id="ruit" class="st4" points="10,367 0,385 10,402 20,385 	"/>
            triangle.setAttributeNS(null, 'points', `
              ${ 780 + Xoffset },
              ${ 367 - count }
              ${ 770 + Xoffset },
              ${ 385 - count }
              ${ 780 + Xoffset },
              ${ 402 - count }
              ${ 790 + Xoffset },
              ${ 385 - count }
            `);
            triangle.setAttributeNS(null, 'class', 'cbs neutral' );
            triangle.setAttributeNS(null, 'data-mood', 'neutral' );
            triangle.setAttributeNS(null, 'style', `transform-origin: ${ 780 + Xoffset }px ${ 367 - count }px;` );

            count += 20;
          }

          // triangle.setAttributeNS(null, 'class', 'cbs' );
          container.appendChild(triangle);

          triangle.classList.add('animate-in');
          triangle.addEventListener("animationend", () => {
            triangle.classList.remove('animate-in');
          });

          // triangle.addEventListener('transitionend', function() {
          // 	triangle.classList.remove('animate-in');
          // });
      });
    },

    animateOldTriangles(oldTriangles) {
      Array.prototype.forEach.call (oldTriangles, function (triangle) {
        if (triangle.tagName !== 'polygon') return;
        triangle.classList.add('animate-out');

        triangle.addEventListener('transitionend', function() {
          triangle.remove();
        });
      });
    },

    drawGraphline() {
      var testValues = [];
      for (let i = 0; i < 12; i++) {
        testValues.push(this.mapRange(this.trends[i][this.activeStats], 0, 83, 0, 20));
      }

      var line = document.getElementById('trendline');

      var yZero = 383.5;
      var yMax = 170;
      var xMin = 137.5;
      var xMax = 586.5;
      var xStep = (xMax - xMin) / 12;

      var points = '96.5,';

      for (let i = 0; i < 12; i++) {
        points = points + `${this.mapRange(testValues[i], 0, this.maxValueArticles, yZero, yMax)} ${xMin + xStep * (i + 1)},`
      }

      points = points + this.mapRange(testValues[testValues.length - 1], 0, 20, yZero, yMax);

      line.setAttributeNS(null, 'points', points);
    },

    mapRange(value, low1, high1, low2, high2) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    },

    handleSlides(e) {
      if (this.selectedItem.circle) {
        this.removeActiveCircles();
      }

      this.selectedCbs = null;
      this.removeActiveCbs();
      this.lastClicked = null;

      this.switchType(this.items[e]);

      this.selectedItem = {
        paper: null,
        month: 0,
        articles: null,
        circle: null,
      };
    },

    getActiveCbs(url) {
      const item = this.cbs.filter((article) => article.link === url);
      this.selectedCbs = item[0];
      // console.log(this.selectedCbs);
    },

    stupidMonthFunction(month) {
      var monthNumber = 0;

      switch(month) {
        case 'december':
          monthNumber = 12;
          break;
        case 'november':
          monthNumber = 11;
          break;
        case 'oktober':
          monthNumber = 10;
          break;
        case 'september':
          monthNumber = 9;
          break;
        case 'augustus':
          monthNumber = 8;
          break;
        case 'juli':
          monthNumber = 7;
          break;
        case 'juni':
          monthNumber = 6;
          break;
        case 'mei':
          monthNumber = 5;
          break;
        case 'april':
          monthNumber = 4;
          break;
        case 'maart':
          monthNumber = 3;
          break;
        case 'februari':
          monthNumber = 2;
          break;
        case 'januari':
          monthNumber = 1;
          break;
        default:
          monthNumber = 1;
        }

      return monthNumber - 1;
    },

    getMonthName(monthNumber) {
      return new Date(2018, parseInt(monthNumber)).toLocaleString('nl', { month: 'long' });
    },

    clickedCircle() {
      const ctx = this;
      document.addEventListener('click', function(e) {
        e = e || window.event;

        if (e.target.classList.contains('info-item')) return;

        if (e.target.tagName === 'polygon') {
          ctx.getActiveCbs(e.target.getAttribute('data-url'));
          ctx.setActiveCbs(e.target);
          ctx.lastClicked = 'polygon';
          ctx.cbsTriangle = e.target;
        } else {
          ctx.selectedCbs = null;
          ctx.removeActiveCbs();
          ctx.lastClicked = null;
        }

        if (e.target.tagName !== 'circle' || e.target.id === 'dot') {
          ctx.selectedItem.circle = null;
          return;
        };

        ctx.removeActiveCircles();
        ctx.lastClicked = 'circle';

        const circle = e.target;
        ctx.setActiveCircle(circle);



      }, false);
    },

    setActiveCbs(item) {
      console.log(this.cbsTriangle);
      if (this.cbsTriangle) this.cbsTriangle.classList.remove('is-active');
      item.classList.add('is-active');
    },

    removeActiveCbs() {
      if (!this.cbsTriangle) return;
      this.cbsTriangle.classList.remove('is-active');
      this.cbsTriangle = null;
    },

    setActiveCircle(circle) {
      circle.setAttribute('class', `${circle.getAttribute('class')} is-active`);

      const paper = circle.getAttribute('data-paper');
      const articles = this.news[this.activeStats][paper].data.articles;

      this.selectedItem.month = circle.getAttribute('data-month');

      this.selectedItem.articles = articles.filter((article) => {
        return this.stupidMonthFunction(article.dateParts[1]) === parseInt(this.selectedItem.month) && parseInt(article.dateParts[2]) === 2018;
      });

      this.selectedItem.paper = paper;
      this.selectedItem.circle = circle.id;
    },

    removeActiveCircles() {
      const activeItems = document.querySelectorAll('#news .is-active');
      activeItems.forEach((element) => element.classList.remove('is-active'));
      this.selectedItem.articles = null;
    },
  },
}
</script>

<style lang="scss">
	circle {
			transition: all .2s;
		}

		#cbs {
			transform: translate(-724px, 0px);
		}

		/* triangles */
		@keyframes animateIn {
			from {
				transform: scale(.5);
				opacity: 0;
			}
			to {
				transform: scale(1);
				opacity: 1;
			}
		}

		g#cbs polygon {
			transition: transform .3s, opacity .3s;
		}

		g#cbs .animate-out {
				transform: scale(.5);
				opacity: 0;
		}

		g#cbs .animate-in {
				transform: scale(1);
				opacity: 1;
				animation: animateIn .3s forwards;
		}
		g#news circle:hover {
			opacity: 1!important;
    }

    g#ticks, #guideline {
    opacity: 0;
}

.nav-container {
  min-width: 395px;
  position: relative;
}

.row-container {
  display: flex;
  max-width: 1110px;
  margin: auto;
}

.graph-container-outer {
    width: 100%;
}

.multi-color {
    font-size: 42px;
    text-transform: uppercase;
     -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #fff;
    line-height: 1.1;
    text-align: right;
    margin-bottom: 70px;

    span:nth-child(3) {color: transparent;}
}

.body-container {
  padding-top: 60px;
}

.graph-container {
  transform: translate(0px, -70px);
  max-height: 450px;
}

.info {
  bottom: 0;
  border: 1px solid gray;
  padding: 20px;
  width: 100%;
  height: 186px;
  // margin-bottom: -50px;
  transform: translate(0px, -20px);

  p {
    max-width: 700px;
  }

  &__inner {
    max-height: 110px;
    overflow: auto;
  }

  strong {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    margin-bottom: 10px;
    display: inline-block;
  }
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;

  li {
    padding-right: 18px;

    &::before {
      display: none;
    }
  }

  a {
    font-size: 13px;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
  }
}

h6 {
    text-transform: uppercase;
}

.help {
  width: 100%;
  margin-left: 126px;
  font-size: 12px;
  display: inline-block;
}
</style>
