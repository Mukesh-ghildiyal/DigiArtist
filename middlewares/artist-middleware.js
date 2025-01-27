
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req, res, next) {
    if (!req.body.name) {

        ErrorResponse.message = "name  are required",
            ErrorResponse.error = new AppError(["name  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.profilePhoto) {

        ErrorResponse.message = "profilePhoto  are required",
            ErrorResponse.error = new AppError(["profilePhoto  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.aboutArt) {

        ErrorResponse.message = "aboutArt  are required",
            ErrorResponse.error = new AppError(["aboutArt  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.experience) {

        ErrorResponse.message = "experience  are required",
            ErrorResponse.error = new AppError(["experience  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.location) {

        ErrorResponse.message = "location  are required",
            ErrorResponse.error = new AppError(["location  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.pricePerHour) {

        ErrorResponse.message = "pricePerHour  are required",
            ErrorResponse.error = new AppError(["pricePerHour  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.phoneNumber) {

        ErrorResponse.message = "phoneNumber  are required",
            ErrorResponse.error = new AppError(["phoneNumber  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.email) {

        ErrorResponse.message = "email  are required",
            ErrorResponse.error = new AppError(["email  are required"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateCreateRequest
}