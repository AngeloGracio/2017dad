<template>
    <div class="header clearfix">
        <h3 class="text-muted">Jogo da Memória</h3>
        <nav v-on:click="refresh()" v-if="showLogin()">
            <ul class="nav nav-pills pull-right">
                <li class="nav-item active" >
                    <a class="nav-link" href="#/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#/register">Registar</a>
                </li>
            </ul>
        </nav>
        <nav v-if="!showLogin()">
            <router-link to="/pic"><button v-if="showAdminVar" type="button" class="nav-item btn btn btn-outline-warning btn-lg">Administração Imagens</button></router-link>
            <router-link to="/admin"><button v-if="showAdminVar" type="button" class="nav-item btn btn btn-outline-warning btn-lg">Administração Utilizadores</button></router-link>
            <router-link to="/jogo"><button type="button" class="nav-item btn btn-outline-primary btn-lg">Jogo</button></router-link>
            <router-link to="/lobby"><button type="button" class="nav-item btn btn-outline-primary btn-lg">Lobby</button></router-link>
            <router-link to="/profile"><button type="button" class="nav-item btn btn-outline-primary btn-lg">Profile</button></router-link>
            <router-link to="/logout"><button type="button" class="nav-item btn btn btn-outline-secondary btn-lg">Logout</button></router-link>
        </nav>


    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                showAdminVar : undefined,
            }
        },
        methods : {
            showLogin(){
                if (Vue.auth.isAutenticated()){
                    this.isAdmin();
                    return false;
                }
                return true;
            },
            isAdmin(){
                var self = this
                console.log(self.$root.userLog.nickname);
                if (self.$root.userLog.nickname == 'admin'){
                    this.showAdminVar = true;
                }else{
                    this.showAdminVar= false;
                }
                console.log(this.showAdminVar);
            },
            logout(){
                //var self = this;
                //self.$router.push("/logout");
            },
        }
    }
</script>

<style scoped>

</style>