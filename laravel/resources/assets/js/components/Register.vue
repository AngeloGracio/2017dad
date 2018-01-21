<template>
    <div>
        <my-nav></my-nav>

        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>
        <div class="alert alert-success" v-if="showSuccess">

            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>
        <!--
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <div  class="grid-content">
                            <el-form label-width="100px">
                                <el-form-item label="Email">
                                    <el-input placeholder="Please input your Email" v-model="email"></el-input>
                                </el-form-item>
                                <el-form-item label="Password" >
                                    <el-input type="password" v-model="password" ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" v-on:click.preventk="login()">Login</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
        -->

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-6">
                    <div class="form-group">
                        <div class="form-group">
                            <label for="formName">Nome</label>
                            <input type="text" class="form-control" id="formName" placeholder="Nome" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="formEmail">Email</label>
                            <input type="text" class="form-control" id="formEmail" placeholder="Email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="formNick">Nickname</label>
                            <input type="text" class="form-control" id="formNick" placeholder="Nickname" v-model="nickname">
                        </div>
                        <div class="form-group">
                            <label for="formPassword">Password</label>
                            <input type="password" class="form-control" id="formPassword" placeholder="Passoword" v-model="password">
                        </div>
                        <div class="form-group">
                            <label for="formConfPassword">Confirmar Password</label>
                            <input type="password" class="form-control" id="formConfPassword" placeholder="Passoword" v-model="confirmPassword">
                        </div>
                        <div class="form-group">
                            <button type="primary" class="btn btn-primary" v-on:click.preventk="registar()">Registar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from './Navigation.vue';

    export default {
        data: function(){
            return {
                title: 'Registar',
                showSuccess: false,
                successMessage: '',
                confirmPassword:'',
                name:'',
                email:'',
                password:'',
                nickname:'',

            }
        },
        methods:{
            registar(){
                var self = this;
                var data ={
                    client_id : 2,
                    //client_secret :'ZtaGgiEGtQQq6FAOtIn1ykVUEYhSF0Wz0JDYTFBI',
                    client_secret :'eqMUtBbLxDmvZhBSFRv1UZVvvi1yeqbW4qx5lyYQ',
                    grant_type: 'password',
                    name: this.name,
                    email: this.email,
                    nickname: this.nickname,
                    password: this.password
                }
                if ((this.confirmPassword == this.password) && this.password != ''){
                    axios.post('api/users', data)
                    .then(function(response){
                        console.log(response);
                        if (response.status == 201){
                            self.$router.push("/login");
                        }
                    });
                }


            }
        },components : {
            'my-nav': Nav,
        },
    }
</script>

<style scoped>

</style>