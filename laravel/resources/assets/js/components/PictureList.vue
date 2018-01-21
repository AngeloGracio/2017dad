<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pic in fotos"  :key="pic.id">
            <td>{{ pic.id }}</td>
            <td>
                <div class="row justify-content-center">
                    <img :src="'../img/' + pic.path" alt="" class="img-thumbnail">
                </div>
            </td>
            <td>
                <button type="button" class="btn btn-danger" v-on:click.prevent="deletePic(pic)">Apagar</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">
    // Component code (not registered)
    module.exports={
        props: ['fotos'],
        data: function(){
            return {
                selectUser : null,
            }
        },
        methods: {
            deletePic: function(pic){
                this.selectUser = null;
                this.$emit('delete-click', user);
            },
            /*
            definePlayer: function(user,player){
                this.$root.$data['player'+player] = user;
                this.$emit('message', user.name+' selected as Player'+player);
            }
            */
        },
    }
</script>

<style scoped>

</style>