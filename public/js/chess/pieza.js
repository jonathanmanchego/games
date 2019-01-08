class pieza{
    __construct(nombre,color){
        this.nombre = nombre;
        this.color = color;
        this.movs = 0;
    }
    mostrar(){
        html = '<img src="'+this.color+'/'+this.nombre+'.png"/>';
    }
}