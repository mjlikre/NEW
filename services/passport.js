const passport    = require('passport');
const User        = require('./../models/User');
const config      = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done)=>{
    try{
        const user = await User.findOne({email});
        if(!user){
            return done(null, false); // done is equivalent to next, first parameter is the error, second is the user
        }
        user.comparePassword(password, (err, isMatch) =>{
            if (err) return done(err)
            if(!isMatch){
                return done(null, false);
            }
            return done(null, user);
        });
    }catch(e){
        done(e);
    }
});

// setup options for jwt strategy
//we need to tell out strategy where to look for the token
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    //tells jwt strategy that whenever a request come in and we want passport to handle it, look for the property autorization in header
    secretOrKey: config.secret
};

passport.use(localLogin);