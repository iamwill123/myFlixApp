const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

const User = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

let newLocalStrategy = new LocalStrategy(
  {
    usernameField: 'Username',
    passwordField: 'Password'
  },
  (username, password, callback) => {
    console.log(username + '  ' + password);
    User.findOne({ Username: username }, (error, user) => {
      if (error) {
        console.log('ERROR', error);
        return callback(error);
      }
      if (!user) {
        console.log('Incorrect Username');
        return callback(null, false, {
          message: 'Incorrect Username.'
        });
      }
      if (!user.validatePassword(password)) {
        console.log('Incorrect Password');
        return callback(null, false, { message: 'Incorrect Password.' });
      }
      console.log('finished');
      return callback(null, user);
    });
  }
);

let newJWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  (jwtPayload, callback) => {
    return User.findById(jwtPayload._id)
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
