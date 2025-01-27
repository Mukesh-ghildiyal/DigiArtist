const { StatusCodes } = require('http-status-codes');
const { ArtistService } = require('../services');
const { ErrorResponse, SuccessResponse, Cloudinary } = require('../utils/common');
const e = require('express');

/**
 * POST :/artist
 * req-body:{ modelNumber :"airbus420" , capaciyt :200}
 */

//to upload a  single image in cloudinary
const uploadToCloudinary = async (filePath) => {
    const result = await Cloudinary.uploader.upload(filePath, {
        folder: "artists"
    })
    return result.secure_url;
}


//to upload multiple image in cloudinary
const uploadMultipleCloudinary = async (files) => {
    const urls = await Promise.all(
        files.map((file) => {
            Cloudinary.uploader.upload(file.path, {
                folder: "artists/media"
            })
        })
    )
    return urls.map((result) => result.secure_url)
}

async function createArtist(req, res) {
    try {

        const { name, genre, aboutArt, experience, location, pricePerHour, phoneNumber, email } = req.body;
        //upload profile photo 
        const profilePhoto = req.files?.profilePhoto
            ? await uploadToCloudinary(req.files.profilePhoto[0].path)
            : null;
        console.log("profilePhoto", profilePhoto)

        //upload media files
        const media = req.files?.media
            ? await uploadMultipleCloudinary(req.files.media)
            : []
        console.log("media", media)

        const artist = await ArtistService.createArtist({
            name,
            genre,
            aboutArt,
            experience,
            location,
            pricePerHour,
            phoneNumber,
            email,
            profilePhoto,
            media,
        });
        console.log(artist)
        SuccessResponse.data = artist;
        SuccessResponse.message = "artist created successfully";
        return res.status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong in artist controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * GET :/airplane
 * req-body:{ modelNumber :"airbus420" , capacity :200}
 */

async function getArtists(req, res) {
    try {
        const artists = await ArtistService.getArtists()
        SuccessResponse.data = artists;
        SuccessResponse.message = "artist data fetched successfully";
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong in artist controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * POST :/airplane/:id  
 */

async function getArtist(req, res) {
    try {
        const artist = await ArtistService.getArtist(req.params.id);
        SuccessResponse.data = artist;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in artist controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

/**
 * DELETE :/airplane/:id  
 */

async function destroyArtist(req, res) {
    try {
        const artist = await ArtistService.destroyArtist(req.params.id);
        SuccessResponse.data = artist;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in artist controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

//update
async function updateArtist(req, res) {
    try {

        const { name, genre, aboutArt, experience, location, pricePerHour, phoneNumber, email } = req.body;

        // Upload profile photo if provided
        let profilePhoto;
        if (req.files?.profilePhoto) {
            profilePhoto = await uploadToCloudinary(req.files.profilePhoto[0].path);
        }

        // Upload media files if provided
        let media;
        if (req.files?.media) {
            media = await uploadMultipleToCloudinary(req.files.media);
        }

        const updatedData = {
            name,
            genre,
            aboutArt,
            experience,
            location,
            pricePerHour,
            phoneNumber,
            email,
            ...(profilePhoto && { profilePhoto }),
            ...(media && { media }),
        };
        const artist = await ArtistService.updateArtist(req.params.id, updatedData);
        SuccessResponse.data = artist;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong in artist controller";
        ErrorResponse.error = error;
        return res.status(error.statusCode)
            .json(ErrorResponse);
    }
}

module.exports = {
    createArtist,
    getArtists,
    getArtist,
    destroyArtist,
    updateArtist
}