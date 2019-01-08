const express = require('express'),
body = require('body-parser'),
socketio = require('socket.io'),
path = require('path');


//INICIANDO APP
const app = express();

//CONFIGURANDO APP
app.set('port',process.env.PORT || 1001);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(body.json());
app.use(body.urlencoded({
    extended: true
}));
/////ROUTER
app.use(require('./router/index.js'));
app.use(require('./router/cuenta.js'));

//INICIANDO APP CON LISTEN
const server = app.listen(app.get('port'), () =>{
    console.log("SERVIDOR INICIADO EN " + app.get('port'));
});
