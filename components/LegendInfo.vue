<template>
  <div class="container dummy">
    <div>
      <strong class="legend-title">
        Hoe reageren kranten op data van CBS
      </strong>
      <p>
        Media geven vaak een verkeerd beeld van armoede.
        Er wordt vooral geschreven over de armoede, rampen en ellende, maar wanneer het een keer goed gaat wordt dat nauwelijks aan het licht gebracht. Hierdoor denkt men over het algemeen dat het veel slechter gaat met de wereld dan het werkelijk gaat. Hoe zit dat in Nederland?
      </p>
    </div>
    <div>
      <dummy />
    </div>
  </div>
</template>

<script>
import dummy from '~/assets/img/dummy.svg';
export default {
  components: {
    dummy,
  },
}
</script>

<style lang="scss">
.container.dummy {
    display: flex;
    flex-flow: row;
    padding-top: 40px;
}

svg#dummy_svg__Layer_1 {height: 125px;margin-left: 40px;}

p {
    max-width: 430px;
    line-height: 1.7;
    font-size: 13px;
}

.legend-title {
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
}
</style>
