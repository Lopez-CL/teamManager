const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CoachSchema = mongoose.Schema({
    username:{
        type: String,
        minlength: [2,'*Coaches username must be 2 characters or more.'],
        required: true
    },
    email:{
        type: String,
        required: true
    },
    title: {
        type:String,
        enum:[
            'Head Coach',
            'Assistant Coach',
            'Trainer'
        ],
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: [8,'*Coaches username must be 8 characters or more.']
    },
},
{timestamps: true})



CoachSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed Password:', hashedPassword)
        this.password = hashedPassword
        next()
    }catch{
        console.log('Error in save', error);
    }
})
//virtual fields

CoachSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set(value=> this._confirmPassword = value)

//mongoose Middleware
CoachSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword','Password must match confirmPassword')
    }
    next()
})
module.exports = mongoose.model('Coach', CoachSchema);