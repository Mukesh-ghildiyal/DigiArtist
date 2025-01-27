const CrudRepository = require('./crud-repository');
const { Artist } = require('../models');

class ArtistRepository extends CrudRepository {
    constructor() {
        super(Artist);//using super keyword you can call constructor of parent class
    }
}

module.exports = ArtistRepository;