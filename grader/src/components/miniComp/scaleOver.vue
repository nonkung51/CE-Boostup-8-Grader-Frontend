<template>
<div class="scaleOver" :class="scaleover"></div>
</template>

<script>
export default {
    props: {
        scaleover : String
    }
}
</script>

<style>
.scaleOver {
    background: #42b983;
    border-radius: 50%;
    position: fixed;
    top: -200px;
    right: -200px;
    z-index: 10;
    width: 200px;
    height: 200px;
}
</style>
