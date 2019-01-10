//CONFIGURACIONES
const TAM = 8;
var tablaChess = document.getElementById('tab');

//INICIALIZANDO //
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
    let posiX = e.dataTransfer.getData('text').substring(2, 3);
    let posiY = e.dataTransfer.getData('text').substring(0, 1);
    //VARIABLES DE POSICION FINAL
    let posX = e.target.id.substring(2, 3);
    let posY = e.target.id.substring(0, 1);
    if(e.target.appendChild(piezaLevantada)){
        piezaLevantada.id = posY + "-" + posX;
        piezaLevantada.style.cursor = 'grab';
        tabPos[posY][posX] = tabPos[posiY][posiX];
        tabPos[posiY][posiX] = undefined;
    }
    console.log(tabPos);
}
function init(){
    var tab = new Tablero(TAM);
    tablaChess.innerHTML = tab.paint();    
    console.log(tabPos);
}
