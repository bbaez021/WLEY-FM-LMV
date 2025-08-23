import mongoose from 'mongoose';

var RatingSchema = new mongoose.Schema({
    user: {
        type:String,
        required:true
    },
    rating: {
        type: Number
    }
})

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
    ratings : {
        type: Map,
        required: false
    },
    spotifyId: {
        type:String,
        required: true,
        unique: true
    }
    
});

const Song = mongoose.model('Song', SongSchema);
const Rating = mongoose.model('Rating', RatingSchema);
export { Song, Rating };