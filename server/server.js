const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const socket = require('socket.io');
const Player = require('./models/player.model')
require('dotenv').config()
const cookieParser = require('cookie-parser')

//middleware that adds post data to body of request
app.use(express.json(), express.urlencoded({ extended: true }))
//middleware that adds post data to body of request
app.use(cookieParser());
app.use(cors())

require('./config/mongoose.config')
require('./routes/player.routes')(app)
require('./routes/coach.routes')(app)

// app.use(cors({
//     origin: 'http://localhost:3000'
// }))

const server = app.listen(port, () => console.log(`Listening on port ${port}!`))
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})
io.on('connection', (socket) => {
    console.log('new user:', socket.id)
    //delete player
    socket.on('cutPlayer', (payload) => {
        console.log('payload:', payload)
        Player.deleteOne({ _id: payload })
            .then((res) => {
                io.emit('playerRemoved', payload)
            }).catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    })
    //add player
    socket.on('addPlayer', payload => {
        console.log('payload:', payload)
        Player.create(payload)
            .then((newPlayer) => {
                io.emit('playerAdded',payload)
            }).catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    })
    socket.on('disconnect', () => {
        console.log('disconnected socket with id:', socket.id)
    })

})