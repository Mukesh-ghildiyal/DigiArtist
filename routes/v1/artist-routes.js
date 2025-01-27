const express = require('express');

const { ArtistController } = require('../../controllers');
const { ArtistMiddlewares } = require('../../middlewares');
const router = express.Router();

//  /api/v1/artists  POST
router.post('/', ArtistMiddlewares.validateCreateRequest, ArtistController.createArtist);

//  /api/v1/artists  GET
router.get('/', ArtistController.getArtists);

//  /api/v1/artists/:id  GET
router.get('/:id', ArtistController.getArtist);
//
// /api/v1/artists/:id  DELETE
router.delete('/:id', ArtistController.destroyArtist);

// /api/v1/artists/:id
router.patch('/:id', ArtistController.updateArtist);

module.exports = router;