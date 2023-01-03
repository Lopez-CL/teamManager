const CoachController = require('../controllers/coach.controller')

module.exports = app =>{
    app.post('/api/register/coach', CoachController.registerCoach)
    app.post('/api/login/coach', CoachController.loginCoach)
    app.get('/api/coach/staff')
    app.get('/api/coach/staff/:id_')
    app.get('/api/logout', CoachController.logOutCoach)
}