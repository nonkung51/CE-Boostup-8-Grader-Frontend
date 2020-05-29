<script>
export default {
    methods: {
        logout() {
            this.$cookies.remove('user');
            this.$router.push('/auth')
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
    },
}
</script>
