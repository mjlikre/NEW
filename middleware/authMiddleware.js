const passport = require('passport');
//By default passport wants to use cookie based authentification for the user

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = {
    requireAuth,
    requireSignIn
};

