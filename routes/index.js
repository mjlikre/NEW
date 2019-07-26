const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

//set up api routes, and this prepends / api to all of the routes declated in apiRoutes

router.use('/api', apiRoutes);

module.exports = router;