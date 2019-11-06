<template>
  <div>
    <nuxt />
    <custom-cursor />
  </div>
</template>

<script>
import CustomCursor from '~/components/CustomCursor';

export default {
  components: {
    CustomCursor,
  },
}
</script>
