<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
export default {
  components: { Loading, Copy },
  props: {
    name: {
      type: String, required: true
    }
  }
}
</script>