<template>
    <div>
        <my-nav></my-nav>
        <div class="jumbotron">
            <h1 class="display-1">{{title}}</h1>
        </div>

        <div class="alert alert-success alert-dismissible fade show" role="alert"  v-if="showSuccess">
            <strong>{{ successMessage }}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="showSuccess=false">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row justify-content-center">
            <div class="col-6">
                <div class="form-group">
                    <div class="form-group">
                        <label for="formInput">File Upload</label>
                        <input type="file" class="form-control" id="formInput" @change="imageChange">
                    </div>
                    <div class="form-group">
                        <button type="primary" class="btn btn-primary" v-on:click.preventk="upload()">Upload</button>
                    </div>
                </div>
            </div>
        </div>

        <pic-list :fotos="fotosVar" @add-click="addPic" @delete-click="deletePic" ref="usersListRef"></pic-list>


    </div>
</template>

<script>
    import Nav from './Navigation.vue';
    import PicList from './PictureList.vue';

    export default {
        data: function(){
            return {
                title: 'Administração de Imagens',
                showSuccess: false,
                successMessage: '',
                currentPic: null,
                fotosVar: [],
                imageVar: '',
            }
        },
        methods:{
            imageChange (e) {
                //console.log(event.target.files[0]);
                var fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);

                fileReader.onload = (e) =>{
                    this.imageVar = e.target.result;
                }
                console.log(this.imageVar)

            },
            upload (){
                var data ={
                    client_id : 2,
                    client_secret :'G6HIy4EVEQX8S8zG7ASLb5MM5WEAtCnBIAC4ACBg',
                    grant_type: 'password',
                    imageVar: this.imageVar,
                };

                axios.post('api/pics', data)
                    .then(function(response){
                        console.log(response);
                    });
            },
            getPics: function(){
                axios.get('api/pics')
                    .then(response=>{this.fotosVar = response.data.data;});
            },
            deletePic: function(){
            },
            addPic: function(){
            },
        },
        components : {
            'my-nav': Nav,
            'pic-list': PicList,
        },
        mounted(){
            this.getPics();
        }
    }
</script>

<style scoped>

</style>