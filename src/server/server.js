const helpers = require('../actions/WeatherToMovieFeature');
const express = require('express');
const axios = require('axios');
const spotifyKeys = require('../actions/ApiKeys');
const bodyParser = require('body-parser');

const FeatureWeather = helpers.FeatureWeather;

const app = express();
const port = 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Pass in weather and token 
const getRecommendations = () => {
  console.log("get recs")
  
    return axios({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      params: {
        api_key : 'c9543fcfc8dc493ef4a4849f6b9bb62c', 
        query : "Jack+Reacher"}

    })
      .then((resp) => {
        return resp.data.results
      })
      .catch((err) => {
        console.log(err)
      })};


app.post('/api/movies', (req, res) => {
  console.log("pooooost request")
          return getRecommendations()
      
        .then(resp => {
          res.send(resp);
        })
        .catch(err => {
          console.log(err);
        });
    });  


app.listen(port, () => console.log(`Listening on port ${port}`));