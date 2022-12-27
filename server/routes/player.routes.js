const PlayerController = require('../controllers/player.controller')

module.exports = app =>{
    app.post('/api/createPlayer', PlayerController.createPlayer);
    app.get('/api/getPlayers', PlayerController.getPlayers);
    app.get('/api/getPlayer/:_id', PlayerController.getPlayerById);
    app.put('/api/updatePlayer/:_id', PlayerController.updatePlayer);
    app.delete('/api/deletePlayer/:_id', PlayerController.deletePlayer);
}