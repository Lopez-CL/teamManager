const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '*Player name is required!'],
        min: [2, "*Player's name must be two characters long or more"]
    },
    position: {
        type: String,
    },
    statusG1:{
        type: String,
        enum: ['Playing', 'Not Playing', 'Undecided'],
        default: 'Undecided'
    },
    statusG2:{
        type: String,
        enum: ['Playing', 'Not Playing', 'Undecided'],
        default: 'Undecided'
    },
    statusG3:{
        type: String,
        enum: ['Playing', 'Not Playing', 'Undecided'],
        default: 'Undecided'
    },
},
{timesstamps:true});

module.exports = mongoose.model('Player', PlayerSchema);