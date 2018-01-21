<template>
    <div>
        <my-nav></my-nav>
        <div class="jumbotron">
            <h1 class="display-1">Jogo da Memória</h1>
        </div>

    </div>
</template>

<script>
    import Nav from './Navigation.vue';

    export default {
        data: function(){
            return {
                title: 'Jogo da Memória',
                imgURL: undefined,
            }
        },
        methods:{

        },
        components : {
            'my-nav': Nav
        },
    }
</script>

<style scoped>

</style>