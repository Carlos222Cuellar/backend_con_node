const MongoLib = require('../lib/mongo'); //importamos la libreria de mongo que creamos

//creamos la clase que se encarga de todo con las peliculas
class MoviesServices {

    //creamos nuestro constructor
    constructor() {
        this.collection = 'movies'; //llamamos a nuestra coleccion
        this.mongoDB = new MongoLib(); //creamos el objeto de la clase MongoLib
    }

    //vamos a crear nuestras funciones para ir  a traer nuestras peliculas o borrar o eliminar

    //metodo para traer toda la coleccion de movies
    async getMovies({ tags }) { //vamos a traer todas las peliculas que concuerden con los tags que le pasemos
        const query = tags && { tags: { $in: tags } } //construimos el query donde si hay tags los buscamos con $in: y los taga que recibimos esto es codigo de mongo
        const movies = await this.mongoDB.getAll(this.collection, query); //esta clase esta definida eb lib de mongo que creamos
        return movies || [] //retorna la coleccion si las encuentra si no un objecto vacio
    }

    //metodo para traer movies por id
    async getMovie({ movieId }) { //vamos a traer todas las peliculas que concuerden con el id que le pasemos
        const movies = await this.mongoDB.get(this.collection, movieId); //esta clase esta definida en lib de mongo que creamos
        return movies || {} //retorna la coleccion si las encuentra si no un json vacio
    }

    //crear una movie

    async createMovie({ movie }) { //vamos a recibir los datos de la movie que queremos crear
        const createdMovieId = await this.mongoDB.create(this.collection, movie); //esta clase esta definida eb lib de mongo que creamos
        return createdMovieId //retorna la pelicula que creamos.
    }

    //actualizar una movie
    async updateMovie({ movieId, movie } = {}) { //vamos a recibir el id que queremos actualizar y ademas la data de la movie ya actualizada ahora por defecto la data esta vacia para no tener problemas
        const updateMovieId = await this.mongoDB.update(this.collection, movieId, movie); //esta clase esta definida eb lib de mongo que creamos
        return updateMovieId //retorna la pelicula que actualizamos.
    }

    //eliminar una pelicula

    async deleteMovie({ movieId }) { //vamos a recibir el id de la movie a borrar
        const deleteMovieId = await this.mongoDB.delete(this.collection, movieId); //esta clase esta definida eb lib de mongo que creamos
        return deleteMovieId //retorna la pelicula que borramos.
    }
}

module.exports = MoviesServices;