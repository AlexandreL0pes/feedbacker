<template>
  <modal-factory />
  <router-view/>
</template>

<script>
import ModalFactory from './components/ModalFactory'
export default {
  components: { ModalFactory }
}
</script>