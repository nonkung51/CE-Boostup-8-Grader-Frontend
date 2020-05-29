<template>
  <div class="home">
    <profile></profile>
  </div>
</template>

<script>
// @ is an alias to /src
import profile from '../components/profile.vue'

export default {
  name: 'Home',
  components: {
    profile
  }
}
</script>
