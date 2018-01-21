<template>
    <div>
        <my-nav></my-nav>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>

        <div class="alert alert-success alert-dismissible fade show" role="alert"  v-if="showSuccess">
            <strong>{{ successMessage }}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="showSuccess=false">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <user-list :users="users" @block-click="blockUser" @delete-click="deleteUser" @active-click="activeUser" ref="usersListRef"></user-list>

    </div>
</template>

<script>
    import UserList from './AdminUserList.vue';
    import Nav from './Navigation.vue';

    export default {
        data: function(){
            return {
                title: 'Lista Utilizadores',
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: [],
            }
        },
        methods:{
            blockUser: function (user) {
                //user.blocked =1;
                this.currentUser = user;
                this.currentUser.reason_blocked = 'reason_reactivated';
                console.log(this.currentUser);
                axios.put('api/users/block/'+user.id, this.currentUser)
                    .then(response => {
                        console.log(response);
                        this.showSuccess = true;
                        this.successMessage = 'Utilizador Bloqueado';
                        this.getUsers();
                    });
            },
            activeUser: function (user) {
                //user.blocked =1;
                this.currentUser = user;
                this.currentUser.reason_reactivated = 'reason_reactivated';
                console.log(this.currentUser);
                axios.put('api/users/active/'+user.id, this.currentUser)
                    .then(response => {
                        console.log(response);
                        this.showSuccess = true;
                        this.successMessage = 'Utilizador Activado';
                        this.getUsers();
                    });
            },
            getUsers: function(){
                axios.get('api/users')
                    .then(response=>{this.users = response.data.data;});
            },
            deleteUser: function(user){
                axios.delete('api/users/'+user.id)
                .then(response => {
                    this.showSuccess = true;
                    this.successMessage = 'Utilizador Apagado';
                    this.getUsers();
                });
             },
        },
        components: {
            'user-list': UserList,
            'my-nav': Nav,
        },
        mounted(){
            this.getUsers();
        }

    }
</script>

<style scoped>

</style>