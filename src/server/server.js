const helpers = require('../actions/WeatherToMovieFeature');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const {MOVIE_KEY} = require('../actions/ApiKeys');

const FeatureWeather = helpers.FeatureWeather;

const app = express();
const port = 5000;
const vote_avg = Math.floor(Math.random() * (10 - 5 + 1)) + 5


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Pass in weather and token 
const getRecommendations = (weather) => {
  let excludedGenres = FeatureWeather(weather.cityTemp, weather.cityCond, weather.cityCondDescription, weather.cityWind)
  
    return axios({
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_KEY}&%25language=en`,
      method: 'GET',
      params: {
        page : Math.floor(Math.random() * 25) + 1, 
        without_genres : excludedGenres,
        with_original_language : 'en',
      }

    },
    )
      .then((resp) => {
        return resp.data.results
      })
      .catch((err) => {
        console.log(err)
      })};


app.post('/api/movies', (req, res) => {
          return getRecommendations(req.body.weather)
      
        .then(resp => {
          res.send(resp);
        })
        .catch(err => {
          console.log(err);
        });
    });  


app.listen(port, () => console.log(`Listening on port ${port}`));
