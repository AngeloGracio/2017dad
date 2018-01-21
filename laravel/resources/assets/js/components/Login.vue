<template>
    <div>
        <my-nav></my-nav>

        <div class="jumbotron">
            <h1>{{ title }}</h1>
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
                            <label for="formEmail">Email</label>
                            <input type="text" class="form-control" id="formEmail" placeholder="Email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="formPassword">Password</label>
                            <input type="password" class="form-control" id="formPassword" placeholder="Passoword" v-model="password">
                        </div>
                        <div class="form-group">
                        <button type="primary" class="btn btn-primary" v-on:click.preventk="login()">Login</button>
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
                title: 'Login',
                email:'',
                password:'',
            }
        },
        methods : {
            login(){
                var data ={
                    client_id : 2,
                    //client_secret :'G6HIy4EVEQX8S8zG7ASLb5MM5WEAtCnBIAC4ACBg',
                    client_secret :'eqMUtBbLxDmvZhBSFRv1UZVvvi1yeqbW4qx5lyYQ',
                    grant_type: 'password',
                    username: this.email,
                    password: this.password
                }
                this.$http.post('http://localhost:8080/oauth/token',data)
                    .then(response => {
                        console.log(response);
                        this.$auth.createToken(response.body.access_token, response.body.expires_in + Date.now());
                    })
                    .then(function () {
                        var token = this.$auth.getToken();
                        var config = {
                            headers: {'Authorization': "Bearer " + token}
                        };
                        if(token != null){
                            axios.get('api/user',config)
                                .then((response) => {
                                    console.log(response.data);
                                    this.$root.userLog = response.data;
                                });
                        }
                    })
                    .then(function () {
                        this.$router.push("/home");
                    });
            }
        },components : {
            'my-nav': Nav,
        },
    }
</script>

<style scoped>

</style>