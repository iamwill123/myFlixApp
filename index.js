require('dotenv').config();
const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  passport = require('passport'),
  cors = require('cors'),
  validator = require('express-validator'),
  Movies = Models.Movie,
  User = Models.User;

// CORS setup
let allowedOrigins = [
  'http://localhost:1234',
  'http://localhost:3000',
  'https://iamwill123.github.io'
];
const configs = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    // If a specific origin isn’t found on the list of allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      var message = `The CORS policy for this application doesn’t allow access from origin ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
};
app.use(cors(configs));

// app.use(middleware) -> adds middleware to our express app
app.use(bodyParser.json());
// https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: true }));
// our login route, must come after bodyParser
const auth = require('./auth')(app);
// our passport setup
require('./passport.js');
// Logs every request info to terminal
app.use(morgan('common'));
// Server-Side Validation
app.use(validator());

// allows Mongoose to connect to the database thus integrating it with the REST API
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true
// });
// MongoDB connection string
var CRED = process.env.MONGODB_CLUSTER_CRED;
mongoose.connect(`mongodb+srv://${CRED}@cluster0-3rjjl.gcp.mongodb.net/myFlixDB?retryWrites=true`, {
  useNewUrlParser: true
});

// Returns a JSON object containing data about all movies
// No auth required
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find()
      .then(movies => {
        console.log(movies.length);
        res.status(201).json(movies);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Returns data about a single movie by movie id
app.get(
  '/movies/:MovieId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({
      _id: req.params.MovieId
    })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Returns data about a single movie by title
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({
      Title: req.params.Title
    })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Returns data about a genre by title
app.get(
  '/movies/:Title/Genre',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({
      Title: req.params.Title
    })
      .then(movie => {
        if (movie) {
          res
            .status(201)
            .send('The genre of ' + movie.Title + ' is ' + movie.Genre);
        } else {
          res
            .status(404)
            .send(
              'Movie with the title ' + req.params.Title + ' was not found.'
            );
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Returns data about a director (bio, birth year, death year) by name
app.get(
  '/directors/:Name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({
      'Director.Name': req.params.Name
    })
      .then(director => {
        res.json(director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Allows new user to register
app.post('/user', (req, res) => {
  // Validation logic here for request
  req.checkBody('Username', 'Username is required').notEmpty();
  req
    .checkBody(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    )
    .isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  var hashedPassword = User.hashPassword(req.body.Password);
  User.findOne({
    Username: req.body.Username
  })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        // Alternative way to save user
        // https://twm.me/correct-way-to-use-mongoose/
        // const user = new User({
        //   Username: req.body.Username,
        //   Password: hashedPassword,
        //   Email: req.body.Email,
        //   Birthday: req.body.Birthday
        // });

        // user.save((saveErr, savedUser) => {
        //   if (saveErr) {
        //     console.error(saveErr);
        //     res.status(500).send('Error: ' + saveErr);
        //   }
        //   res.status(201).json(savedUser);
        // });

        User.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// get a single user by Username
app.get(
  '/user/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({
      Username: req.params.Username
    })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// get a single user by id
app.get(
  '/user/:Id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({
      _id: req.params.Id
    })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// get a list of all users
app.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find()
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Allows to update user by :id is case sensitive
app.put(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation logic here for request
    req.checkBody('Username', 'Username is required').notEmpty();
    req
      .checkBody(
        'Username',
        'Username contains non alphanumeric characters - not allowed.'
      )
      .isAlphanumeric();
    req.checkBody('Password', 'Password is required').notEmpty();
    req.checkBody('Email', 'Email is required').notEmpty();
    req.checkBody('Email', 'Email does not appear to be valid').isEmail();

    // check the validation object for errors
    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      return res.status(422).json({ errors: errors });
    }
    var hashedPassword = User.hashPassword(req.body.Password);
    User.update(
      {
        _id: req.params.id
      },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      {
        new: true
      }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Allows users to add a movie to their list of favorites
app.post(
  '/user/:Username/FavoriteMovies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Username, MovieID } = req.params;
    User.findOneAndUpdate(
      {
        Username: Username
      },
      {
        $push: {
          FavoriteMovies: MovieID
        }
      },
      {
        new: true
      }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Allows users to remove a movie from their list of favorites
// https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
app.delete(
  '/user/:Username/FavoriteMovies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Username, MovieID } = req.params;
    console.log(Username, MovieID);
    User.findOneAndUpdate(
      // Update instead of findOneAndRemove
      {
        Username: Username
      },
      {
        $pull: {
          FavoriteMovies: MovieID
        }
      },
      {
        new: true
      }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Allows existing users to deregister by username
app.delete(
  '/user/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOneAndRemove({
      Username: req.params.Username
    })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// default response when request hits the root folder
app.get('/', (req, res) => {
  res.send('Welcome to myFlixDB!');
});

//access requested file from "public" folder
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong... please retry!');
});

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(
    `Server listening on ${port === 3000 ? 'http://localhost:3000' : port}`
  );
});
