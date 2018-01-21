<template>
    
</template>

<script>
    export default {
        data: function(){
            return {
                title: 'Logout',
            }
        },
        mounted(){
            console.log("Logout")
            var self = this;
            self.$auth.destroyToken();
            this.$root.userLog = undefined;
            self.$router.push("/home");
        }
    }
</script>
<style scoped>

</style>