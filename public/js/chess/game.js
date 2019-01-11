//CONFIGURACIONES
const TAM = 8;
var tablaChess = document.getElementById('tab');
var listMovimientos = [
    /**ARRIBA,DERECHA,ABAJO,IZQUIERDA,IZQ-ARRIBA,DER-ARRIBA,DER-ABAJO,IZQ-ABAJO,L-MOV */
    /*torre*/[1,1,1,1,0,0,0,0,0],
    /*caballo*/[0,0,0,0,0,0,0,0,1],
    /*alfil*/[0,0,0,0,1,1,1,1,0],
    /*rey */[1,1,1,1,1,1,1,1,0],
    /*reina */[1,1,1,1,1,1,1,1,0],
    /*peon */[1,0,1,0,1,1,1,1,0]
];
//INICIALIZANDO //
function init(){
    var tab = new Tablero(TAM);
    tablaChess.innerHTML = tab.paint();    
    //console.log(tabPos);
}
//FUNCIONES DE OPERACIONES
function drag(e){
    e.dataTransfer.setData('text',e.target.id);
    console.log(e.target.id);
    //e.dataTransfer.setData("text",e.target)
}
function allowDrop(e){
    e.preventDefault();
    //console.log(e);
}
function drop(e){
    e.preventDefault();    
    var nombrePieza = e.dataTransfer.getData('text');
    var piezaLevantada = document.getElementById(nombrePieza);
    ///VARIABLES DE POSICION ORIGINAL
    let posiX = parseInt(e.dataTransfer.getData('text').substring(2, 3));
    let posiY = parseInt(e.dataTransfer.getData('text').substring(0, 1));
    //VARIABLES DE POSICION FINAL
    let posX = parseInt(e.target.id.substring(2, 3));
    let posY = parseInt(e.target.id.substring(0, 1));
    //////VERIFICAMOS QUE MOVIMIENTO A REALIZADO LA PIEZA
    let tipoMovimiento = verificarMovimiento(posiX,posiY,posX,posY);
    alert(tipoMovimiento);
    if(e.target.appendChild(piezaLevantada)){
        piezaLevantada.id = posY + "-" + posX;
        piezaLevantada.style.cursor = 'grab';
        tabPos[posY][posX] = tabPos[posiY][posiX];
        tabPos[posiY][posiX] = undefined;
        tabPos[posY][posX].mover(posX,posY);
    }
    console.log(tabPos[posY][posX]);
}
function verificarMovimiento(ix,iy,x,y){
    let opX = Math.abs(x - ix);
    let opY = Math.abs(y - iy);
    let ans = '';
    if(opX != 0 && opY == 0){//HORIZONTAL
        if(ix < x){//to derecha
            ans = 'DERECHA';
        }else{
            ans = 'IZQUIERDA';
        }
    }else if(opX == 0 && opY != 0){//VERTICAL
        if(iy < y){
            ans = 'ABAJO';
        }else{
            ans = 'ARRIBA';
        }
    }else{//DIAGONALES
        if(ix < x){//MITAD DERECHA
            if(iy < y){//ABAJO
                ans = 'DERECHA-ABAJO';
            }else{//ARRIBA
                ans = 'DERECHA-ARRIBA';
            }
        }else{//MITAD IZQUIERDA
            if(iy < y){//ABAJO
                ans = 'IZQUIERDA-ABAJO';
            }else{//ARRIBA
                ans = 'IZQUIERDA-ARRIBA';
            }
        }
    }    
    return ans;
}