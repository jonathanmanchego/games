class tablero{
    constructor(x){
        this.tam = x;
    }
    paint(){
        let html = '';        
        for(let i = 0; i < this.tam;i++){
            let col = i%2 === 0?-1:1;
            for(let j = 0; j < this.tam;j++){
                let c = col === -1 ?'b':'d';
                let celda = '<div class="celda '+c+'"></div>';
                col*=-1;
                html+=celda;
            }
        }
        return html;
    }
}