require('dotenv').config(); //importamos el modulo de dotenv

const config = {
    dev: process.env.NODE_ENV !== 'production', //que use las variables de entorno de desarrollo si es que no estamos en produccion
    port: process.env.PORT || 3000, //tomamos el puerto de las variables de entorno pero si no hay definido usamos el puerto 3000
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,

};

module.exports = { config }; //exportamos el modulo