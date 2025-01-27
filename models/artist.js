const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePhoto: { type: String },
    genre: {
        type: String,
        enum: ["folk-dance", "folk-music", "puppeteer"],
        required: true
    },
    aboutArt: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    media: [String],
    email: { type: String, required: true },
});

module.exports = mongoose.model("Artist", artistSchema);
