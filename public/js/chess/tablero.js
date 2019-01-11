var piezas = ['torre', 'caballo', 'alfil', 'rey', 'reina', 'alfil', 'caballo', 'torre', 'peon'];
var colorPiezas = ['negro', 'blanco'];
var tabPos = [];
class Tablero{
    constructor(x){
        this.tam = x;
    }
    paint(){
        let html = '';        
        for(let i = 0; i < this.tam;i++){
            let col = i%2 === 0?1:-1;
            let fila = [];
            let colP = i < (TAM / 2) ? 0 : 1;
            for(let j = 0; j < this.tam;j++){
                let c = col === -1 ?'b':'d';
                let celda = '<div id="'+i+'_'+j+'" class="celda '+c+'" ondrop="drop(event)" ondragover="allowDrop(event)">';
                col*=-1;
                if (i < 2 || i > 5) {
                    fila[j] = new Pieza(piezas[i == 0 || i == 7 ? j : 8], colorPiezas[colP],i,j);
                }
                if(fila[j] != undefined){
                    celda+= fila[j].mostrar();

                }
                celda+='</div>';
                html+=celda;
            }
            tabPos.push(fila);
        }
        return html;
    }
}