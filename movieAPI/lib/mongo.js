const { MongoClient, ObjectId } = require('mongodb'); //importamos el modulo de mongo 
const { config } = require('../config/index'); //traemos el archivo de configuracion

const USER = encodeURIComponent(config.dbUser); //usamos encode por si hay caracteres espciales en la URI que los pueda leer con facilidad y le pasamos como parametro las variables del archivo de configuracion que teniamos hechp perviamente
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//conexion a la base de datos de mongo
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;


//usando la libreria de mongo
class MongoLib {
    constructor() {
            this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
            this.db_name = DB_NAME;
        }
        //vamos a usar el patron singleton para que la clase solo cree una instacia y no este saturando a mongo con nuevas instancias
    connect() {
        if (!MongoLib.connection) { //pregunta si no hay una conexion para crearle si ya hay una conexion lo unico que hace es devolver la conexion que ya existia
            MongoLib.connection = new Promise((resolve, reject) => { //Creamos la conexion que devueve una promesa que como ya sabemos tiene dos parametros los cuales son resolve y reject
                this.client.connect(err => { //primero capturamos el error si es que lo hay
                    if (err) {
                        reject(err);
                    }
                    //si no hay error significa que todo salio bien y creamos la conexion
                    console.log('conectado'); //notificamos que la conexion fue creada
                    resolve(this.client.db(this.db_name)); //se resuelve la prosema 
                });
            });
        }
        return MongoLib.connection; //si ya habia una conexion solo la devolvemos sin crear otra
    }
    getAll(collection, query) {
        return this.connect().then(db => {
            return db //retorna la base de datos
                .collection(collection)
                .find(query) //opcional
                .toArray(); //para trabajar como json
        });
    }

    get(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) }); //usamos finOne para buscar el id que queremos
        });
    }

    create(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data); //solo insertamos los datos que queremos
            })
            .then(result => result.insertedId);
    }

    update(collection, id, data) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }); //primero se busca si existe lo edita si no no luego con $set nos actualiza segun lo que enviamos y upsert nos dice si actualizamos o agregamos
            })
            .then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({ _id: ObjectId(id) }); //busca el id y lo borra
            })
            .then(() => id);
    }

}

module.exports = MongoLib;