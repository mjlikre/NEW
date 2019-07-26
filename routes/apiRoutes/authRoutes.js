const router = require('express').Router();

const authController = require('./../../controllers/autoController')

router.route('/signup')
  .post(authController.signUp);

router.route('/signin')
  .post(authController.signIn);

module.exports= router;