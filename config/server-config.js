const dotenv = require('dotenv');

//return you an object those who can call config
dotenv.config();

module.exports = {
    PORT: process.env.PORT
}