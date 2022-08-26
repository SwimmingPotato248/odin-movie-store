#! /usr/bin/env node

console.log(
  "This script populates some test data to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Actor = require("./models/actor");
var Director = require("./models/director");
var Genre = require("./models/genre");
var Movie = require("./models/movie");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var actors = [];
var genres = [];
var directors = [];
var movies = [];

function actorCreate(first_name, last_name, d_birth, d_death, cb) {
  actordetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) actordetail.date_of_birth = d_birth;
  if (d_death != false) actordetail.date_of_death = d_death;

  var actor = new Actor(actordetail);

  actor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Actor: " + actor);
    actors.push(actor);
    cb(null, actor);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function directorCreate(first_name, last_name, d_birth, d_death, cb) {
  directordetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) directordetail.date_of_birth = d_birth;
  if (d_death != false) directordetail.date_of_death = d_death;

  var director = new Director(directordetail);

  director.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Director: " + director);
    directors.push(director);
    cb(null, director);
  });
}

function movieCreate(
  name,
  description,
  release_date,
  genres,
  actors,
  director,
  cb
) {
  moviedetail = {
    name,
    release_date,
    genres,
  };

  if (description != false) moviedetail.description = description;
  if (actors != false) moviedetail.actors = actors;
  if (director != false) moviedetail.director = director;

  var movie = new Movie(moviedetail);
  movie.save(function (err) {
    if (err) {
      console.log("ERROR CREATING Movie: " + movie);
      cb(err, null);
      return;
    }
    console.log("New Movie: " + movie);
    movies.push(movie);
    cb(null, movie);
  });
}

function createActors(cb) {
  async.parallel(
    [
      function (callback) {
        actorCreate("Tim", "Robbins", "1958-10-16", false, callback);
      },
      function (callback) {
        actorCreate("Morgan", "Freeman", "1937-06-01", false, callback);
      },
      function (callback) {
        actorCreate("Bob", "Gunton", "1945-11-15", false, callback);
      },
      function (callback) {
        actorCreate("Marlon", "Brando", "1924-04-03", "2004-07-01", callback);
      },
      function (callback) {
        actorCreate("Al", "Pacino", "1940-04-25", false, callback);
      },
      function (callback) {
        actorCreate("James", "Cann", "1940-03-26", "2022-07-06", callback);
      },
      function (callback) {
        actorCreate("Christian", "Bale", "1974-01-30", false, callback);
      },
      function (callback) {
        actorCreate("Heath", "Ledger", "1979-4-4", "2008-01-22", callback);
      },
      function (callback) {
        actorCreate("Aaron", "Eckhart", "1968-03-12", false, callback);
      },
      function (callback) {
        actorCreate("Robert", "De Niro", "1943-8-17", false, callback);
      },
      function (callback) {
        actorCreate("Robert", "Duvall", "1931-1-5", false, callback);
      },
    ],
    cb
  );
}

function createDirectors(cb) {
  async.parallel(
    [
      function (callback) {
        directorCreate("Frank", "Darabont", "1959-1-28", false, callback);
      },
      function (callback) {
        directorCreate("Francis", "Coppola", "1939-4-7", false, callback);
      },
      function (callback) {
        directorCreate("Christopher", "Nolan", "1970-7-30", false, callback);
      },
    ],
    cb
  );
}

function createGenres(cb) {
  async.parallel(
    [
      function (callback) {
        genreCreate("Drama", callback);
      },
      function (callback) {
        genreCreate("Crime", callback);
      },
      function (callback) {
        genreCreate("Action", callback);
      },
    ],
    cb
  );
}

function createMovies(cb) {
  async.parallel(
    [
      function (callback) {
        movieCreate(
          "The Shawshank Redemption",
          "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          "1994-09-22",
          [genres[0]],
          [actors[0], actors[1], actors[2]],
          directors[0],
          callback
        );
      },
      function (callback) {
        movieCreate(
          "The Godfather",
          "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
          "1972-03-14",
          [genres[0], genres[1]],
          [actors[3], actors[4], actors[5]],
          directors[1],
          callback
        );
      },
      function (callback) {
        movieCreate(
          "The Dark Knight",
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          "2008-07-14",
          [genres[0], genres[1], genres[2]],
          [actors[7], actors[8], actors[9]],
          directors[2],
          callback
        );
      },
      function (callback) {
        movieCreate(
          "The Godfather: Part II",
          "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
          "1974-12-12",
          [genres[0], genres[1]],
          [actors[5], actors[10], actors[11]],
          directors[1],
          callback
        );
      },
    ],
    cb
  );
}
async.series(
  [createActors, createDirectors, createGenres, createMovies],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else console.log("Success");
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
