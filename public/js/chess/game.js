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
}
function drop(e){
    e.preventDefault();
    var nombrePieza = e.dataTransfer.getData('text');
    var piezaLevantada = document.getElementById(nombrePieza);
    if(e.target.appendChild(piezaLevantada)){
        piezaLevantada.id = e.target.id.substring(0, 1) + "-" + e.target.id.substring(2, 3);
    }
    console.log(e);

}
function init(){
    var tab = new Tablero(TAM);
    tablaChess.innerHTML = tab.paint();    
    console.log(tabPos);
}
