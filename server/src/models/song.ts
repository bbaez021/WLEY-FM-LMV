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
        default: 1
    },
    rating : {
        type:Number,
        required: false,
        default: NaN
    },
    spotifyId: {
        type:String,
        required: true
    }
    
});

const Song = mongoose.model('Song', SongSchema);
export { Song };