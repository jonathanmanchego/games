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

//eleMover.src = '../img/elementos/desplazamiento.svg';
//INICIALIZANDO //
function init(){
    var tab = new Tablero(TAM);
    tablaChess.innerHTML = tab.paint();    
    //console.log(tabPos);


}
//FUNCIONES DE OPERACIONES
function drag(e){
    e.dataTransfer.setData('text',e.target.id);
    //console.log(e.target.id);
    //e.dataTransfer.setData("text",e.target)
}
function allowDrop(e){
    e.preventDefault();
    //console.log(e);
}
function drop(e){
    e.preventDefault();        
    console.log(e);
    var nombrePieza = e.dataTransfer.getData('text');
    var piezaLevantada = document.getElementById(nombrePieza);
    ///VARIABLES DE POSICION ORIGINAL
    let posiX = parseInt(e.dataTransfer.getData('text').substring(2, 3));
    let posiY = parseInt(e.dataTransfer.getData('text').substring(0, 1));
    //VARIABLES DE POSICION FINAL
    let posX = parseInt(e.target.id.substring(2, 3));
    let posY = parseInt(e.target.id.substring(0, 1));
    ///CALCULAMOS LA DISTANCIA 
    let opX = Math.abs(posX - posiX);
    let opY = Math.abs(posY - posiY);
    let dis = Math.floor(Math.sqrt(Math.pow(opX,2)+Math.pow(opY,2)));
    //console.log("distancia desplazada",dis);
    ////VERIFICAMOS QUE TIPO DE PIEZA ES LA QUE SE ESTA MOVIENDO
    let piezaEnMovimiento = verificarPieza(tabPos[posiY][posiX].nombre);
    //////VERIFICAMOS QUE MOVIMIENTO A REALIZADO LA PIEZA
    let tipoMovimiento = verificarMovimiento(posiX,posiY,posX,posY);
    
    let m_c = listMovimientos[piezaEnMovimiento][tipoMovimiento];
    ///VALIDACION DE MOVIMIENTO
    let valMov = false;
    if(m_c){
        valMov = validarMovimiento(tabPos[posiY][posiX],tipoMovimiento,dis,e.target.getAttribute('class').substring(0,5));
    }else{
        console.log("Movimiento Invalido");
    }
    //console.log('El movimiento es ', m_c?'valido':'invalido');
    ///VERIFICAMOS LA POSICION FINAL
    
    //e.target.getAttribute('class').substring(0,5);
    ///MOVIENDO LA PIEZA
    if(valMov){
        ////SI EN CASO HUBIESE UNA PIEZA DENTRO REMOVERLA
        if (e.target.getAttribute('class').substring(0, 5) == 'celda'){
            e.target.appendChild(piezaLevantada);
        }else if (e.target.getAttribute('class').substring(0, 5) == 'pieza'){
            document.getElementById(posY + "_" + posX).removeChild(e.target);
            document.getElementById(posY + "_" + posX).appendChild(piezaLevantada);
        }
        piezaLevantada.id = posY + "-" + posX;
        piezaLevantada.style.cursor = 'grab';
        tabPos[posY][posX] = tabPos[posiY][posiX];
        tabPos[posiY][posiX] = undefined;
        tabPos[posY][posX].mover(posX, posY);
    }
    //console.log(tabPos[posY][posX]);
}

//FUNCIONES DE TRATAMIENTO
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
function validarMovimiento(pieza,move,dis,target) {
    let x_l_m = verificarPieza(pieza.nombre);
    let ans = true;
    if(x_l_m == 3){
        if (dis == 1){
            ans = true;
        }else {
            ans = false;
        }
    }
    if(x_l_m == 5){
        if(target == 'celda'){
            if(dis == 1){
                if(pieza.color == 'blanco'){
                    if(move == 0){
                        ans = true;
                    }else{
                        ans = false;
                    }
                }else{
                    if (move == 2) {
                        ans = true;
                    }else{
                        ans = false;
                    }
                }
            }else if(dis == 2){
                if (pieza.color == 'blanco') {
                    if (move == 0 && pieza.movs == 0) {
                        ans = true;
                    }else{
                        ans = false;
                    }
                } else {
                    if (move == 2 && pieza.movs == 0) {
                        ans = true;
                    }else{
                        ans = false;
                    }
                }
            }else{
                ans = false;
            }
        }else{
            if(dis == 1){
                if(pieza.color == 'blanco'){
                    if(move == 4 || move == 5){
                        ans = true;
                    }else{
                        ans = false;
                    }
                }else{
                    if(move == 6 || move == 7){
                        ans = true;
                    }else{
                        ans = false;
                    }
                }
            }else{
                ans = false;
            }
        }
    }
    return ans;
}