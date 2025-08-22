import mongoose from 'mongoose';

var DaySchema = new mongoose.Schema({
    DayId: {
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

const Day = mongoose.model('Day', DaySchema);
export { Day };