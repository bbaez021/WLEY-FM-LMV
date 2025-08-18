import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Unknown Track"
    },
    artist: {
        type: String,
        default: "Unknown Artist"
    },
    releaseYear: {
        type: Number,
        required: false
    },
    albumArt: {
        type: String,
        default: "../public/default.jpg"  
    },
    lastAppeared: {
        type: Date,
        required: false,
    },
    timesAppeared: {
        type: Number,
        default: 0
    },
    rating : {
        type:Number,
        required: false,
        default: NaN
    }
    
});

module.exports = mongoose.model('Song', SongSchema);