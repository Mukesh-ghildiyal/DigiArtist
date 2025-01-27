const express = require('express');

const artistRoutes = require('./artist-routes');

const router = express.Router();

router.use('/artists', artistRoutes)

module.exports = router;