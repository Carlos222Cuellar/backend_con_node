const express = require('express'); //importamos express de express
const app = express(); //creamos la instancia

const { config } = require('./config/index'); //importamos la configuracion
const moviesApi = require('./Routes/movies'); //importamos el archivo donde estan las rutas

//body parser esto es para decirle a nuestro metodo que es un json el que queremos es decir le decimos que los entienda
app.use(express.json());

moviesApi(app); //invocamos la funcion y le pasamos la app de express

//vamos a crear nuestra ruta para imprimir hello word cuando recibamos una peticion
//para eso indicamos el metodo a usar en este caso el metodo sera get porque es una peticion

// app.get('/', function(req, res) { //recibe dos parametros los cuales son la ruta donde se hara el get y el otro la funcion que tambien recibe dos parametros en este caso son la peticion y la respuesta que vamos a dar a la peticion
//     //para responder a la peticion solo hacemos o mas bien dicho usamos el metodo send
//     res.send('hello word');

// });

//tenenos que hacer que escuche en el puerto para eso hacemos lo siguiente donde va el puerto mandamos a llamar
//el puerto que usamos en config para hacer esto mas dinamico

app.listen(config.port, function() { //recibe una funcion callback en la cual podemos indicar lo del puerto perfectamente
    console.log(`Listening http://localhost:${config.port}`);
});