//service is used to interact repository with database

const { StatusCodes } = require('http-status-codes');
const { ArtistRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const artistRepository = new ArtistRepository();

async function createArtist(data) {
    try {
        const artist = await artistRepository.create(data);
        return artist;
    } catch (error) {
        console.log("error", error)
        if (error.name === 'ValidationError') {
            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            console.log("explanation", explanation)
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new artist object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getArtists() {
    try {
        const artists = await artistRepository.getAll();
        return artists;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the artist', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getArtist(id) {
    try {
        const artist = await artistRepository.get(id);
        return artist;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The artist you requested is not present", error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the artist by given id', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyArtist(id) {
    try {
        const response = await artistRepository.destroy(id)
        return response;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError("The artist you requested to delete is not present", error.statusCode)
        }
        throw new AppError('Cannot delete data of all the artist by given id', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateArtist(id, data) {
    try {
        const artist = await artistRepository.update(id, data);
        if (!artist) {
            throw new AppError('The artist you requested to update is not present', StatusCodes.NOT_FOUND);
        }
        return artist;
    } catch (error) {
        console.log("error", error)
        if (error.name === 'ValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot update artist data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createArtist, getArtists,
    getArtist, destroyArtist,
    updateArtist
}