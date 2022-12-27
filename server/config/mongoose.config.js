const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/player_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Established connection to the player manager database!'))
    .catch((err) => console.log(err, 'Had issues connecting to the player manager database! Start console.logging!'))