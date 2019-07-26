const router = require('express').Router();

const authController = require('./../../controllers/autoController')

const passportService = require('./../../services/passport');

const authMiddleware = require('./../../middleware/authMiddleware')
router.route('/signup')
  .post(authController.signUp);

router.route('/signin')
  .post(authMiddleware.requireSignIn, authController.signIn);

module.exports= router;