<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 683 768" style="enable-background:new 0 0 683 768;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:none;stroke:#000000;stroke-miterlimit:10;}
    .st1{fill:none;stroke:#FF2424;stroke-miterlimit:10;}
    .st2{fill:#7FC4FF;}
    .st3{fill:#7C7C7C;}
    .st4{fill:#FFBE00;}
  </style>
  <filter id="grayscale">
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <g id="guideline">
      <g id="xAs">
        <line class="st0" x1="0" y1="384" x2="683" y2="384"/>
      </g>
    </g>
    <g id="ticks">
      <g>
        <line class="st1" x1="96.6" y1="370" x2="96.6" y2="398"/>
        <line class="st1" x1="137.4" y1="370" x2="137.4" y2="398"/>
        <line class="st1" x1="178.2" y1="370" x2="178.2" y2="398"/>
        <line class="st1" x1="219" y1="370" x2="219" y2="398"/>
        <line class="st1" x1="259.8" y1="370" x2="259.8" y2="398"/>
        <line class="st1" x1="300.6" y1="370" x2="300.6" y2="398"/>
        <line class="st1" x1="341.4" y1="370" x2="341.4" y2="398"/>
        <line class="st1" x1="382.2" y1="370" x2="382.2" y2="398"/>
        <line class="st1" x1="423" y1="370" x2="423" y2="398"/>
        <line class="st1" x1="463.8" y1="370" x2="463.8" y2="398"/>
        <line class="st1" x1="504.5" y1="370" x2="504.5" y2="398"/>
        <line class="st1" x1="545.3" y1="370" x2="545.3" y2="398"/>
        <line class="st1" x1="586.1" y1="370" x2="586.1" y2="398"/>
      </g>
    </g>
      <g :class="{ 'has-active' : hasActive }" id="news">
        <circle cx="97" cy="348" r="10"  class="nrc"></circle>
        <circle cx="140.63636363636363" cy="348" r="10"  class="nrc"></circle>
        <circle cx="184.27272727272725" cy="288.8" r="44"  class="nrc"></circle>
        <circle cx="227.9090909090909" cy="283.8666666666667" r="46.833333333333336"  class="nrc"></circle>
        <circle cx="271.5454545454545" cy="288.8" r="44"  class="nrc"></circle>
        <circle cx="315.1818181818182" cy="293.73333333333335" r="41.16666666666667"  class="nrc"></circle>
        <circle cx="358.8181818181818" cy="313.4666666666667" r="29.833333333333332"  class="nrc"></circle>
        <circle cx="402.45454545454544" cy="313.4666666666667" r="29.833333333333332"  class="nrc"></circle>
        <circle cx="446.09090909090907" cy="249.33333333333331" r="66.66666666666666"  class="nrc"></circle>
        <circle cx="489.72727272727275" cy="244.4" r="69.5"  class="nrc"></circle>
        <circle cx="533.3636363636364" cy="278.93333333333334" r="49.666666666666664"  class="nrc"></circle>
        <circle cx="577" cy="283.8666666666667" r="46.833333333333336"  class="nrc"></circle>
        <circle cx="97" cy="318.4" r="27"  class="trouw"></circle>
        <circle cx="140.63636363636363" cy="313.4666666666667" r="29.833333333333332"  class="trouw"></circle>
        <circle cx="184.27272727272725" cy="313.4666666666667" r="29.833333333333332"  class="trouw"></circle>
        <circle cx="227.9090909090909" cy="313.4666666666667" r="29.833333333333332"  class="trouw"></circle>
        <circle cx="271.5454545454545" cy="333.2" r="18.5"  class="trouw"></circle>
        <circle cx="315.1818181818182" cy="318.4" r="27"  class="trouw"></circle>
        <circle cx="358.8181818181818" cy="328.26666666666665" r="21.333333333333336"  class="trouw"></circle>
        <circle cx="402.45454545454544" cy="313.4666666666667" r="29.833333333333332"  class="trouw"></circle>
        <circle cx="446.09090909090907" cy="298.6666666666667" r="38.33333333333333"  class="trouw"></circle>
        <circle cx="489.72727272727275" cy="308.5333333333333" r="32.66666666666667"  class="trouw"></circle>
        <circle cx="533.3636363636364" cy="288.8" r="44"  class="trouw"></circle>
        <circle cx="577" cy="293.73333333333335" r="41.16666666666667"  class="trouw"></circle>
      </g>
      <g id="cbs">
      </g>
      <g id="twitter">
        <!-- <circle class="st3" cx="878.5" cy="338.5" r="5.5"/> -->
      </g>
      <g id="trendlines">
          <polyline
            class="st8"
            id="trendline"
            style="fill:none;stroke-miterlimit:10;"
            points="
              96.5,
              383.5 137.5,
              383.5 178.5,
              383.5 218.5,
              383.5 259.5,
              383.5 300.5,
              383.5 341.5,
              383.5 382.5,
              383.5 422.5,
              383.5 463.5,
              383.5 504.5,
              383.5 545.5,
              383.5 586.5,
              383.5
            "/>
      </g>
    </svg>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      hasActive: false,
    };
  },

  watch: {
    active: function checkActive(id) {
      if (id) {
        this.hasActive = true;
      } else {
        this.hasActive = false;
      }
    },
  },
}
</script>

<style lang="scss">
circle {
  opacity: .8;

  &.nrc { fill: color(blue); }
  &.trouw { fill: color(yellow); }
}

.cbs {
  &.neutral { fill: white; }
  &.negative { fill: color(red); }
  &.positive { fill: color(green); }
}

#trendline {
  stroke-width: 2.2px;
  stroke: #fff;
}

.has-active circle {
  // opacity: 1;
  // filter: grayscale(2);
  filter: url(#grayscale);

  &.is-active {
    opacity: 1;
    stroke: white;
    stroke-width: 3px;
    filter: none;
  }
}

polygon.cbs.is-active {
  stroke: #f00;
}
</style>
