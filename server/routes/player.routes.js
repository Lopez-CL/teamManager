const PlayerController = require('../controllers/player.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app =>{
    app.post('/api/createPlayer', authenticate, PlayerController.createPlayer);
    app.get('/api/getPlayers', authenticate, PlayerController.getPlayers);
    app.get('/api/getPlayer/:_id', authenticate, PlayerController.getPlayerById);
    app.put('/api/updatePlayer/:_id', authenticate, PlayerController.updatePlayer);
    app.delete('/api/deletePlayer/:_id', authenticate, PlayerController.deletePlayer);
}