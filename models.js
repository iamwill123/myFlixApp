const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  ReleaseYear: String,
  Description: {
    type: String,
    required: true
  },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  ImagePath: String,
  Featured: Boolean
});

var userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Birthday: Date,
  FavoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
});

// bcrypt -> Hashing, on the other hand, is the process of turning data into a string of text or numbers that (with a good hashing algorithm) can’t be turned back into the original string. Once the data has been hashed, it’s no longer accessible to anyone.

userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = password => {
  return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
