const Player = require('../models/player.model');

module.exports.createPlayer = (req, res) => {
    Player.create(req.body)
        .then((newPlayer) => res.json(newPlayer))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}
module.exports.getPlayers = (req, res) => {
    Player.find()
        .then((players) => res.json(players))
        .catch(err => {
            console.log(err,'you have an error on the back-end!')
            res.status(400).json(err)
        })
}
module.exports.getPlayerById = (req, res) => {
    Player.findOne({_id: req.params._id})
        .then((player) => res.json(player))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}
module.exports.updatePlayer = (req, res) => {
    Player.findOneAndUpdate({_id: req.params._id},req.body,{
        runValidators: true,
        new: true,
    })
        .then((updatedPlayer) => res.json(updatedPlayer))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}
module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({_id: req.params._id})
        .then((erasure) => res.json(erasure))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}