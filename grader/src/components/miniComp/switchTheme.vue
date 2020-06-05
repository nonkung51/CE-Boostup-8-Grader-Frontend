<template>
<v-switch v-model="$vuetify.theme.dark" color="white" hide-details></v-switch>
</template>

<script>
import mixin from '../mixins'

export default {
    mixins: [mixin],
}
</script>
