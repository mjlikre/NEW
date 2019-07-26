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

//we're going to ge the payload argument from an incoming request
//the payload argument is from the function that we will create in authroutes
//done is the function we call once we tried to authenticate this user

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done)=>{
    try{
        const user = await User.findById(payload.sub);
        if (user){
            done(null, user);

        }else{
            done(null, false);
        }
    }catch(e){
        done(e, false);
    }
})
//this tells passport that we declared these strategies
//the local login says we have a strategy called local
//the jtwLogin says we have a strategy called jwt

// when we say passport.authenticate('jwt')
//passport will look for a strategy called 'jwt'
passport.use(localLogin)
passport.use(jwtLogin)