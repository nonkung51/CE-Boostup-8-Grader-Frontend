<template>
  <div>
      <complex></complex>
  </div>
</template>

<script>
import complex from '../components/coding.vue'

export default {
  components:{
     complex
  } 
}
</script>

<style scoped>
   *{
     animation: fadein 1s; 
   }
   @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>
