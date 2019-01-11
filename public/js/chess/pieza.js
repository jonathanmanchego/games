class Pieza{
    constructor(nombre,color,i,j){
        this.nombre = nombre;
        this.color = color;
        this.movs = 0;
        this.x = j;
        this.y = i;
    }
    get mostrar(){
        let html = '<div id="' + this.y + '-' + this.x + '" class="pieza" draggable="true" ondragstart="drag(event)" style="background-image: url(../img/' + this.color + '/' + this.nombre + '.png)" ></div>';
        return html;
    }
    mover(n_x,n_y){
        this.x = n_x;
        this.y = n_y;
    }
}