const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

//middleware that adds post data to body of request
app.use(express.json(), express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://lcoalhost:3000'
}))

require('./config/mongoose.config')
require('./routes/player.routes')(app)

app.listen(port, () => console.log(`Listening on port ${port}!`))