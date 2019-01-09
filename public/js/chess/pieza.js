class Pieza{
    constructor(nombre,color,i,j){
        this.nombre = nombre;
        this.color = color;
        this.movs = 0;
        this.x = j;
        this.y = i;
    }
    get mostrar(){
        let html = '<img id="'+this.y+'-'+this.x+'" src="../img/'+this.color+'/'+this.nombre+'.png" draggable="true" ondragstart="drag(event)" />';
        return html;
    }
}