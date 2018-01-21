<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users"  :key="user.id" :class="{activerow: selectUser === user}">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td v-if="!user.admin == 1">
                <div class="row justify-content-center">
                <button type="button" class="btn btn-outline-warning" v-if="user.blocked == 0" v-on:click.prevent="blockUser(user)">Bloquear</button>
                <button type="button" class="btn btn-outline-success" v-if="user.blocked == 1" v-on:click.prevent="activeUser(user)">Activar</button>
                <button type="button" class="btn btn-danger" v-on:click.prevent="deleteUser(user)">Apagar</button>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">
    // Component code (not registered)
    module.exports={
        props: ['users'],
        data: function(){
            return {
                selectUser : null,
                acttivaMotivo: '',
                bloqueaMotivo: '',
            }
        },
        methods: {
            activeUser: function(user){
                this.selectUser = user;
                this.$emit('active-click', user);
            },
            blockUser: function(user){
                this.selectUser = user;
                this.$emit('block-click', user);
            },
            deleteUser: function(user){
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
    tr.activerow {
        background: #123456  !important;
        color: #fff          !important;
    }
</style>