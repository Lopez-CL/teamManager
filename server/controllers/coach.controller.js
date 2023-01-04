const Coach = require('../models/coach.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.registerCoach = async (req, res) =>{
    try{
        const newCoach = await Coach.create(req.body);
        const userToken = jwt.sign({_id: newCoach._id, email: newCoach.email},SECRET)
        res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage: 'Coach logged in', user: newCoach})
    }catch(error){
        res.status(400).json(error)
    }
}
module.exports.loginCoach = async (req, res) =>{
    const coach = await Coach.findOne({email: req.body.email})
    if(!coach){
        res.status(400).json({error: 'Invalid email/password'})
    }
    try{
        const isPasswordValid = await bcrypt.compare( req.body.password,coach.password)
        if(!isPasswordValid){
            res.status(400).json({error: 'Invalid email/password'})
        }else{
            const userToken = jwt.sign({_id: coach._id, email: coach.email}, SECRET)
            res.status(201).cookie('userToken',userToken,{httpOnly: true}).json({successMessage: 'Coach logged in', user: coach})
        }
    }catch(error){
        res.status(400).json({error: 'Invalid email/password'})
    }
}

module.exports.logOutCoach = (req, res) =>{
    res.clearCookie('userToken')
    res.json({success:'Coach logged out'})
    console.log({success:'Coach logged out'})
}
// expires: new Date(Date.now() + 10000000000000000000000000000000000000000000000000000)