const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  auth = require('./auth')(app),
  passport = require('passport'),
  cors = require('cors'),
  validator = require('express-validator'),
  Movies = Models.Movie,
  Users = Models.User;

// app.use(middleware) -> adds middleware to our express app
app.use(bodyParser.json());
// Logs every request info to terminal
app.use(morgan('common'));
// Server-Side Validation
app.use(validator());
// our passport setup
require('./passport');
// CORS setup
let allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://testsite.com',
  'https://my-flix-db-11209.herokuapp.com'
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

// allows Mongoose to connect to the database thus integrating it with the REST API
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true
// });
// MongoDB connection string
var connection =
  'mongodb+srv://myFlixDBadmin:Posty321!@cluster0-3rjjl.gcp.mongodb.net/myFlixDB?retryWrites=true';
mongoose.connect(connection, {
  useNewUrlParser: true
});

//Returns a JSON object containing data about all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      console.log(movies.length);
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Returns data about a single movie by title
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({
      Title: req.params.Title
    })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Returns data about a genre by title
app.get(
  '/movies/:Title/Genre',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({
      Title: req.params.Title
    })
      .then(function(movie) {
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
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Returns data about a director (bio, birth year, death year) by name
app.get(
  '/directors/:Name',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Movies.findOne({
      'Director.Name': req.params.Name
    })
      .then(function(director) {
        res.json(director);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Allows new users to register
app.post('/users', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
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

  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({
    Username: req.body.Username
  })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch(function(error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//list of all users for test needs
app.get('/users', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Allows to update user info, :Username is case sensitive
app.put(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Users.update(
      {
        Username: req.params.Username
      },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      {
        new: true
      }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
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

//Allows users to add a movie to their list of favorites
app.post(
  '/users/:Username/FavoriteMovies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    const { Username, MovieID } = req.params;
    Users.findOneAndUpdate(
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
      function(err, updatedUser) {
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
  '/users/:Username/FavoriteMovies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    const { Username, MovieID } = req.params;
    console.log(Username, MovieID);
    Users.findOneAndUpdate(
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
      function(err, updatedUser) {
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
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    Users.findOneAndRemove({
      Username: req.params.Username
    })
      .then(function(user) {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// default response when request hits the root folder
app.get('/', function(req, res) {
  res.send('Welcome to myFlixDB!');
});

//access requested file from "public" folder
app.use(express.static('public'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong... please retry!');
});

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
  console.log(
    `Server listening on ${port === 3000 ? 'http://localhost:3000' : port}`
  );
});
