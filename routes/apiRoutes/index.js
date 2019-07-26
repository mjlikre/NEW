const router = require('express').Router();
const authRoutes = require('./authRoutes');

//and this prepends / api to all of the routes declated in apiRoutes

router.use('/auth', authRoutes);

module.exports = router;