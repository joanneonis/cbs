<template>
	<div>
    <graph :news="newsData" />
  </div>
</template>

<script>
import nrcIncome from '~/assets/data/kranten/NRC - laag inkomen 2018';
import trouwIncome from '~/assets/data/kranten/trouw met content/trouw - laag inkomen - content';
import nrcBijstand from '~/assets/data/kranten/NRC - bijstand 2018';
import trouwBijstand from '~/assets/data/kranten/trouw met content/trouw - bijstand - content';
import nrcArmoede from '~/assets/data/kranten/NRC - armoede nederland 2018';
import trouwArmoede from '~/assets/data/kranten/trouw met content/trouw - armoede nederland - content';
import nrcKoopkracht from '~/assets/data/kranten/NRC - koopkracht 2018';
import trouwKoopkracht from '~/assets/data/kranten/trouw met content/trouw - koopkracht - content';

import graph from '~/components/Graph';

export default {
  components: {
    graph,
  },

	data() {
		return {
			newsData: {
        inkomen: {
          nrc: {
            data: nrcIncome,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
          trouw: {
            data: trouwIncome,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
        },
        bijstand: {
          nrc: {
            data: nrcBijstand,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
          trouw: {
            data: trouwBijstand,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
        },
        armoede: {
          nrc: {
            data: nrcArmoede,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
          trouw: {
            data: trouwArmoede,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
        },
        koopkracht: {
          nrc: {
            data: nrcKoopkracht,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
          trouw: {
            data: trouwKoopkracht,
            monthlyCount: new Array(12).fill(0),
            daylyCount: this.prepareDays(),
          },
        }
      }
		}
  },

  mounted() {
    const categories = Object.keys(this.newsData);
    categories.forEach((cat) => this.newsData = this.addDates(cat, this.newsData));
  },

  methods: {
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

    prepareDays() {
      var perMonth = [];
      // every month
      for (let i = 0; i < 12; i++) {
        const monthDays = new Array(this.daysInMonth(i + 1, 2018)).fill(0);
        perMonth.push(monthDays);
      }

      return perMonth;
    },

    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },

    addDates(cat, data) {
      const perPaper = Object.keys(data[cat]);

      perPaper.forEach((paper) => {
        var articles = data[cat][paper].data;

        articles.articles.forEach((article) => {
          if (article.date) article.dateParts = article.date.split(' ');
          else article.dateParts = [];

          if (paper === 'nrc') {
            if (article.dateParts.length > 3) {
              article.type = article.dateParts[article.dateParts.length - 1];
              article.dateParts.pop();
            } else {
              article.type = null;
            }
          }

          var year = parseInt(article.dateParts[2]);
          var month = this.stupidMonthFunction(article.dateParts[1]);
          var day = parseInt(article.dateParts[0]);

          article.dateObj = new Date(year, month, day);

          //? only count those of year 2018
          if (year === 2018) data[cat][paper].monthlyCount[month] += 1;
          if (year === 2018) {
            const dayArray = data[cat][paper].daylyCount[month];
            dayArray[day - 1] += 1;
            // console.log(months[month], day, dayArray[day - 1]);
          };
        });
      });

      return data;
    },

    mapRange(value, low1, high1, low2, high2) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    },
  },
}
</script>
