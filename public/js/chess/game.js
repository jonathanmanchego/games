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
    ////VERIFICAMOS QUE TIPO DE PIEZA ES LA QUE SE ESTA MOVIENDO
    let piezaEnMovimiento = verificarPieza(tabPos[posiY][posiX].nombre);
    //////VERIFICAMOS QUE MOVIMIENTO A REALIZADO LA PIEZA
    let tipoMovimiento = verificarMovimiento(posiX,posiY,posX,posY);
    
    let m_c = listMovimientos[piezaEnMovimiento][tipoMovimiento];
    console.log('El movimiento es ', m_c?'valido':'invalido');
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
            ans = 1;//'DERECHA';
        }else{
            ans = 3;//'IZQUIERDA';
        }
    }else if(opX == 0 && opY != 0){//VERTICAL
        if(iy < y){
            ans = 2; // 'ABAJO';
        }else{
            ans = 0;//'ARRIBA';
        }
    }else{//DIAGONALES
        if(ix < x){//MITAD DERECHA
            if(iy < y){//ABAJO
                ans = 6;//'DERECHA-ABAJO';
            }else{//ARRIBA
                ans = 5;//'DERECHA-ARRIBA';
            }
        }else{//MITAD IZQUIERDA
            if(iy < y){//ABAJO
                ans = 7;//'IZQUIERDA-ABAJO';
            }else{//ARRIBA
                ans = 4;//'IZQUIERDA-ARRIBA';
            }
        }
    }    
    return ans;
}
function verificarPieza(name){
    let ans = -1;
    switch (name) {
        case 'torre':
             ans = 0;
            break;
        case 'caballo':
            ans = 1;
            break;
        case 'alfil':
            ans = 2;
            break;
        case 'rey':
            ans = 3;
            break;
        case 'reina':
            ans = 4;
            break;
        case 'peon':
            ans = 5;
            break;
        default:
            ans = 6;
            break;
    }
    return ans;
}