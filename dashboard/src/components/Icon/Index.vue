<template>
  <component :is="name" v-bind="$props"/>
</template>

<script>
export default {
  props: {
    name: {
      type: String, required: true
    }
  }
}
</script>