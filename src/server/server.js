const helpers = require('../actions/WeatherToMovieFeature');
const express = require('express');
const axios = require('axios');
const spotifyKeys = require('../actions/ApiKeys');
const bodyParser = require('body-parser');

const spotifyGenres = helpers.spotifyGenres;
const FeatureWeather = helpers.FeatureWeather;
const spotifyClientSecret = spotifyKeys.spotifyClientSecret;
const spotifyClientID = spotifyKeys.spotifyClientID;

const app = express();
const port = 5000;

var spotifyAccessTokenSet = false;
var spotifyAccessToken = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const getRecommendations = (weather, token) => {
    let features = FeatureWeather(weather.cityTemp, weather.cityCond, weather.cityCondDescription, weather.cityWind);
    const shuffled = spotifyGenres.sort(() => .5 - Math.random());
    let genres = shuffled.slice(0,2).join(',') ;
  
    return axios({
      url: 'https://api.spotify.com/v1/recommendations',
      method: 'GET',
      // Merge features object with query options
      params: Object.assign(features, {seed_genres : genres, limit: 12, min_popularity: 15}),
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((resp) => {
        return resp.data.tracks;
      })
      .catch((err) => {
        console.log(err)
      })};