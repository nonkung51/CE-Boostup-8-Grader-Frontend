<script>
export default {
    computed: {

    },
    data: vm => ({
        initialDark: vm.$vuetify ?
            vm.$vuetify.theme.dark : false,
    }),
    methods: {
        logout() {
            //this.$cookies.remove('user');
            this.$store.commit('user/clear')
            this.$router.push('/auth')
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
    },
    beforeDestroy() {
        if (!this.$vuetify) return

        this.$vuetify.theme.dark = this.initialDark
    },
}
</script>
