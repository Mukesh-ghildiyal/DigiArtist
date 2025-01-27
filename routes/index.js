const express = require('express');
const router = express.Router();
const v1Routes = require('./v1');
// const v2Routes = require('./version2');

console.log('inside APi routes')
router.use('/v1', v1Routes);
// router.use('/v2', v2Routes)
module.exports = router;