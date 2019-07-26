const router = require('express').Router();
const authRoutes = require('./authRoutes');
const passportService = require('./../../services/passport')
const authMiddleware = require('./../../middleware/authMiddleware')

//and this prepends / api to all of the routes declated in apiRoutes
router.route('/test')
    //for the get request, because of the middleware that we passed in ,ti will hit the middleware before it hits the routes
    .get(authMiddleware.requireAuth, (req, res)=>{
        res.send(req.user)

    })

router.use('/auth', authRoutes)




module.exports = router;