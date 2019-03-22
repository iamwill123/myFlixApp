const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

var newLocalStrategy = new LocalStrategy(
  {
    usernameField: 'Username',
    passwordField: 'Password'
  },
  (username, password, callback) => {
    console.log(username + '  ' + password);
    Users.findOne({ Username: username }, (error, user) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      if (!user) {
        console.log('incorrect username');
        return callback(null, false, {
          message: 'Incorrect username or password.'
        });
      }
      if (!user.validatePassword(password)) {
        console.log('incorrect password');
        return callback(null, false, { message: 'Incorrect password.' });
      }
      console.log('finished');
      return callback(null, user);
    });
  }
);

var newJWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
      .then(user => {
        return callback(null, user);
      })
      .catch(error => {
        return callback(error);
      });
  }
);

passport.use(newLocalStrategy);
passport.use(newJWTStrategy);
