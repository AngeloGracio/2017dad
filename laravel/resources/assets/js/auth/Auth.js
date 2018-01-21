export default function (Vue) {
    Vue.auth = {
        //criate token
        createToken(token, expiration){
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration);
        },
        //get token
        getToken(){
            var token = localStorage.getItem('token');
            var expiration = localStorage.getItem('expiration');

            if ( !token || !expiration){
                return null;
            }

            if ( Date.now() > parseInt(expiration)){
                this.destroyToken();
                return null;
            }
            return token;
        },
        //destroy token
        destroyToken(){
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        },
        //isAutenticated
        isAutenticated(){
            if (this.getToken()){
                return true;
            }
            return false;
        },
        /*
        isAdmin(){
            var token = localStorage.getItem('token');
            var config = {
                headers: {'Authorization': "Bearer " + token}
            };
            axios.get('http://projectdad.lav/api/user',config)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.admin == 1){
                        return true;
                    }else{
                        return false;
                    }

                });

        }
        */
    }

    Object.defineProperties( Vue.prototype, {
       $auth:{
           get: ()=> {
               return Vue.auth;
           }
       }
    })
}