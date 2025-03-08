import mongoose from 'mongoose';

var DaySchema = new mongoose.Schema({
    Day: {
        type: Date,
        required: true
    },
    isNoon: {
        type: Boolean,
        default: true
    },
    Songs: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
    
});

module.exports = mongoose.model('Day', DaySchema);