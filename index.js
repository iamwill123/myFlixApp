const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const app = express(),
  Movies = Models.Movie,
  Users = Models.User;

app.use(bodyParser.json());

// Logs every request info to terminal
app.use(morgan('common'));

// allows Mongoose to connect to the database thus integrating it with the REST API
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});

//Returns a JSON object containing data about all movies
app.get('/movies', function(req, res) {
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
app.get('/movies/:Title', function(req, res) {
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
});

// Returns data about a genre by title
app.get('/movies/:Title/Genre', function(req, res) {
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
          .send('Movie with the title ' + req.params.Title + ' was not found.');
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Returns data about a director (bio, birth year, death year) by name
app.get('/directors/:Name', function(req, res) {
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
});

//Allows new users to register
app.post('/users', function(req, res) {
  Users.findOne({
    Username: req.body.Username
  })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
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
app.get('/users', function(req, res) {
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
app.put('/users/:Username', function(req, res) {
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
});

//Allows users to add a movie to their list of favorites
app.post('/users/:Username/FavoriteMovies/:MovieID', function(req, res) {
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
});

// Allows users to remove a movie from their list of favorites
// https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
app.delete('/users/:Username/FavoriteMovies/:MovieID', function(req, res) {
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
});

//Allows existing users to deregister by username
app.delete('/users/:Username', function(req, res) {
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
});

// default response when request hits the root folder
app.get('/', function(req, res) {
  res.send('Welcome to the world of CineStock!');
});

//access requested file from "public" folder
app.use(express.static('public'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops! Something went wrong... please retry!');
});

app.listen(8080);