const FeatureWeather = (temp, cond, condDescription, wind) => {
    // Casting conditions to avoid potential bugs
    wind = Number(wind);
    temp = Number(temp);
  
    // Object to be returned to make API call with features set
    let featureObject = {};


 // Switch on condition affecting overall music features
 switch (cond) {
    case ('Clear') :
      featureObject.min_valence = 0.6;
      featureObject.mode = 1;
      featureObject.min_energy = 0.6;
      console.log('set CLEAR');
      break;
    case ('Clouds') :
      switch (condDescription) {
        case ('few clouds') :
          featureObject.min_valence = 0.6;
          featureObject.min_energy = 0.6;
          console.log('set few clouds');
          break;
        case ('scattered clouds') :
          featureObject.max_valence = 0.8;
          featureObject.max_energy = 0.6;
          console.log('set scattered clouds');
          break;
        case ('broken clouds') :
          featureObject.max_valence = 0.7;
          featureObject.max_energy = 0.6;
          console.log('set broken clouds');
          break;
        case ('overcast clouds') :
          featureObject.max_valence = 0.5;
          featureObject.max_energy = 0.6;
          console.log('set overcast cloudsS');
          break;
      }
      break;
    case ('Atmosphere') :
      featureObject.max_valence = 0.5;
      featureObject.mode = 0;
      featureObject.max_energy = 0.5;
      console.log('set ATM');
      break;
    case ('Snow') :
      featureObject.min_valence = 0.55;
      featureObject.mode = 1;
      featureObject.max_energy = 0.5;
      console.log('set SNOW');
      break;
    case ('Rain') :
      featureObject.max_valence = 0.55;
      featureObject.max_energy = 0.55;
      console.log('set RAIN');
      break;
    case ('Drizzle') :
      featureObject.max_valence = 0.55;
      featureObject.max_energy = 0.55;
      console.log('set DRZL');
      break;
    case ('Thunderstorm') :
      featureObject.max_valence = 0.5;
      featureObject.max_energy = 0.7;
      console.log('set TSTORM');
      break;
    default :
      featureObject.max_valence = 0.7;
      featureObject.max_energy = 0.7;
      console.log('set DEFAULT CONDITION');
  }

  // windspeed stuff

  return featureObject;
};

const movieGenres = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller"
]

module.exports = { FeatureWeather, movieGenres };
