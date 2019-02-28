require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require ("./key.js");
var moment = require('moment');
var params = process.argv.slice(2);

//use switch statement to select a function to execute 

switch(params[0]) {
  case "concert-this":
    concertThis();
    break;
  case "spotify-this":
      spotifyThis();
    break;
  case "movie-this":
      movieThis();
      break;
  case "do-what-it-says":   
      doWhatItSays();
      break;
      
}

//to execute concertThis function to generate search resuts from bandsintown API
function concertThis(){
    var input= params.slice(1);
    var artist = input.join("+");
var bandInTown = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios
  .get(bandInTown)
  .then(function(response) {

    for (var i=0; i<5;i++){

    console.log( "Venue: ",  response.data[i].venue.name);
    console.log("City:" +response.data[i].venue.city + " | State: "+ response.data[i].venue.region + " | Country: "+ response.data[i].venue.country );
    console.log(response.data[i].datetime);

    var time = response.data[i].datetime.split("T");
    console.log(time[0]);
    console.log("Date: " + moment(time).format('L'));
 
  }
  
})
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function spotifyThis(){
if (params[1]){
  song= params.slice(1);
}else {
  song = "The Sign by Ace of Base";
}
 var spotify = new Spotify(
  // actual id and secret but uses the require method to load id from key.js

  // id: '117dc6f4061d462f84c035008cedf27f', 
  // secret:'bc3710d4affc4130a5a7710f015709da'
  keys.spotify
);
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }  
  //display the first 5 results from the spotify library
  for (var y = 0 ; y <5;y ++){
  var songInfo = data.tracks.items[y];
  var songResult = console.log("Artist: "+songInfo.artists.name)
                   console.log("Song: "+songInfo.name)
                   console.log("Album: "+songInfo.album.name)
                   console.log("Link to song clip: "+ songInfo.preview_url)
  console.log(songResult);
  }
});
};

function movieThis(){
  if  (params[1]){
  var input= params.slice(1);
  var movie = input.join("+");}
  else{
    var movie ='Mr+Nobody'; }

  axios.get("http://www.omdbapi.com/?t="+ movie +"&y=&plot=&apikey=trilogy").then(
  function(response) {
    //console logging results generate from omdbAPI
    console.log("The movie is: " + response.data.Title);
    console.log("The movie is made in: " + response.data.Year);
    console.log("The movie's imdb rating is: " + response.data.imdbRating);
    console.log("The movie's rating on Rotten Tomatoes: " + response.data.Ratings[1].Value);
    console.log("The movie was produced in: " + response.data.Country );
    console.log("The language of the movie: " + response.data.Language );
    console.log("The Plot of the movie: " + response.data.Plot );
    console.log("The movie is starring " + response.data.Actors);
 });
}


 function doWhatItSays(){ 
  var fs = require('fs');
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    console.log(dataArr[1]);
    switch(dataArr[0]) {
      case "concert-this":
        concertThis();
         let artist = dataArr[1];
        break;
      case "spotify-this":
          spotifyThis();
           let song = dataArr[1];
        break;
      case "movie-this":
          movieThis();
          let movie = dataArr[1];
          break;
          
    }
    });
  };
 