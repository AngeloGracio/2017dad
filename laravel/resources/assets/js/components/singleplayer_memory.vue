<template>
    <div>
<!--    <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <h2>Current Player : {{ currentPlayer }}</h2>
            <br>
        </div> -->

        <my-nav></my-nav>
         <div class="jumbotron">
            <h1 class="display-1">{{title}}</h1>
            <br>
                <h2>Current Player : {{ currentPlayer }}</h2>
            <br>
        </div>

        <div class="game-zone-content">       
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a></strong>
            </div>

            <div class="board">
                <div v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
        </div>  
    </div>          
</template>

<script type="text/javascript">
    export default {
        data: function(){
            return {
                title: 'Memory',
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1,
                pieceCounter: 0,
                gameEnded:false,
                player1User: undefined,
                //board: [0,0,0,0,0,0,0,0,0],
                //board: [],
                //board_matches: [],
                //cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],

                board: ['hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden','hidden'],
            }
        },
        methods: {
            //gerar a imagem
            //TEM DE SER ALTERADO
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                return 'img/' + imgSrc + '.png';
            },
            //fazer o shuffle da board
            shuffleCards: function (images) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            
            //enquanto hover elementos...
              while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
            return array;  
            },
            //cria a board
            createBoard: function(piece){
                //2a2 - criar pares e no fim faz shuffle
                for(var i = 1; i <= 16; i+=2)
                {
                    var card1 = {                   
                        number: undefined,
                        value: 'hidden',
                    }                  
                   
                   //gera aleatorio e coloca na card
                    var random = Math.floor(Math.random()*40);
                    var number = 'img/' + random + '.png';
                    
                    /*do{
                        number = Math.floor(Math.random()*40);
                    }
                    while (!this.canBePushed(number));*/
                    
                    //fazer com que a carta 1, fique com o valor da carta 2 (8 de cada)
                    card1.number = number;
                    var card2 = Object.assign({}, card1);         
                   
                   //inserir as 2 peças na boards
                    this.board.push(card1);
                    this.board.push(card2);
                }
                this.shuffleCards();
                console.log('shuffle done');
            },
            //cria board, faz shuffle e informa o inico do jogo
            startGame: function () {
                    console.log('ENTROU startGame');
                    this.createBoard();
                    this.successMessage = "Board OK + Shuffle OK = Game ON";
                    this.showSuccess = true; 
            },
            //quando o player joga
            clickPiece: function(index) {
                console.log('ENTROU clickPiece');
                this.board[index] = this.currentValue;
                //clica na peca 1
                if (this.pieceCounter == 0){
                    this.currentValue = Math.floor(Math.random()*40);
                    this.piece2 = currentValue;
                    this.pieceCounter = 1;
                    console.log('pickou piece1');
                    this.pairCheck();
                }
                //clica na peca 2
                if(this.pieceCounter == 1){
                    this.currentValue = Math.floor(Math.random()*40);
                    this.piece1 = currentValue;
                    this.pieceCounter = 2;
                    this.pairCheck();
                }


            },
            //verficar pares
            pairCheck:function(index){
                    console.log('ENTROU pairCheck');
                    this.board[index]=this.currentValue;
                    //se for par -> alterar a imagem para empty
                    if (this.piece2 == this.piece1) {
                        this.board[index] = "empty";
                        console.log('imagem alterado para empty');
                    }                    
                    //verifica se o jogo terminou
                    this.checkGameEnded();
            },
            restartGame:function(){
                console.log('ENTROU restartGame');
                this.startGame();                
                this.showSuccess= false;
                this.showFailure= false;
                this.successMessage= '';
                this.failMessage= '';
                this.currentValue= 1;
                this.gameEnded= false;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------

            checkGameEnded: function(){
                if (this.hasRow(1)) {
                    this.successMessage = this.playerName(1) + ' won the Game';
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                if (this.isBoardComplete()) {
                    this.successMessage = 'The Game ended in a Tie';
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                return false;
            },
            isBoardComplete:function(){
                var returnValue = true;
                this.board.forEach(function(element) {
                    if (element === 0) {
                        returnValue = false;
                        return;
                    }
                });
                return returnValue;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------        
            playerName: function(playerNumber){
                console.log(playerNumber);
                console.log(this.player1User);
                if(this.player1User != undefined && playerNumber == 1){
                    return this.player1User.name;                
                }
                return 'Player '+playerNumber;
            }
        },
        computed:{
            currentPlayer: function(){ 
                console.log(this.currentValue);
                console.log(this.playerName(this.currentValue));
                return this.playerName(this.currentValue);
            }
        },
        mounted(){
            if(this.$root.$data.player1){
                this.player1User = this.$root.$data.player1;
            }
            
            /*
            axios.get('api/image')
                .then(response=>{
                console.log(response.data.data);
                this.images = response.data.data;
            })
            */
        }
    }
</script>

<style> 
    
</style>