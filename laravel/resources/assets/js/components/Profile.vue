    <template>
        <div>
            <my-nav></my-nav>
            <div class="jumbotron">
                <h1 class="display-1">{{title}}</h1>
            </div>

            <form>

                <div class="form-group row">
                    <label for="staticName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="name" v-model="user.name">
                        </div>
                </div>

                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" readonly class="form-control-plaintext" id="email" v-model="user.email">
                        </div>
                </div>

                <div class="form-group row">
                    <label for="staticNickname" class="col-sm-2 col-form-label">Nickname</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="nickname" v-model="user.nickname">
                        </div>
                </div>

                <div class="form-group row">
                    <label for="staticBlocked" class="col-sm-2 col-form-label">Blocked</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="blocked" v-model="user.blocked">
                        </div>
                </div>

                <div class="form-group row">
                    <label for="staticReasonBlocked" class="col-sm-2 col-form-label">Reason Blocked</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="reason_blocked" v-model="user.reason_blocked">
                        </div>
                </div>

                <div class="form-group row">
                    <label for="staticCreatedAt" class="col-sm-2 col-form-label">Created At</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="created_at" v-model="user.created_at">
                        </div>
                </div>              
            </form>
        </div>
</template>

<script>
import Nav from './Navigation.vue';

export default {
    data: function(){
        return {
            title: 'O meu prefil',
            userData: undefined,
        }
    },
    methods:{
        getID: function(){
                axios.get('api/users/'+this.user.id)
                    .then(response=>{
                        Object.assign(this.user, response.data.data);
                    });
            }
    },
    components : {
        'my-nav': Nav
    },
}
</script>

<style scoped>

</style>