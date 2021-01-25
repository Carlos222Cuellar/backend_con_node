const express = require('express'); //importamos express del modulo de express
//const { moviesMock } = require('../utils/mocks/movies'); //importamos el lugar donde estan nuestras peliculas
const MoviesServices = require('../services/movies');

function moviesApi(app) { //creamos la funcion que recibe a express para funcionar para sr dinamicos y tener control de lo que hacemos
    const router = express.Router(); //usamos router
    app.use("/api/movies", router); // le decimos cual es la raiz donde acepta peticiones

    const moviesService = new MoviesServices();

    router.get('/', async function(req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:movieId', async function(req, res, next) {
        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/', async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createdMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put('/:movieId', async function(req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updatedMovieId = await moviesService.updateMovie({
                movieId,
                movie
            });

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete('/:movieId', async function(req, res, next) {
        const { movieId } = req.params;

        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });

}

module.exports = moviesApi; //exportamos