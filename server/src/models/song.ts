import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Unknown Track"
    },
    artist: {
        type: String,
        default: "D.A.R."
    },
    releaseYear: {
        type: Number,
        required: false
    },
    albumInfo: {
        type: String,
        default: "../public/default.jpg"  
    },
    lastAppeared: {
        type: Date,
        required: false
    },
    timesAppeared: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Song', SongSchema);