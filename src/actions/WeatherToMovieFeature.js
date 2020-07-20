const FeatureWeather = (temp, cond, condDescription, wind) => {
  // Casting conditions to avoid potential bugs
  wind = Number(wind);
  temp = Number(temp);

  // Object to be returned to make API call with features set
  let featureObject = {};
  let dontLike = ',99,36,27,10752,37'


// Determines what genres to leave out based on weather condition
switch (cond) {
  case ('Clear') :
    featureObject = '80,14,53'
    break;
  case ('Clouds') :
    switch (condDescription) {
      case ('few clouds') :
        featureObject = '16,14'
        console.log('set few clouds');
        break;
      case ('scattered clouds') :
        featureObject = '16,14'
        console.log('set scattered clouds');
        break;
      case ('broken clouds') :
        featureObject = '16,14'
        console.log('set broken clouds');
        break;
      case ('overcast clouds') :
        featureObject = '16,14'
        console.log('set overcast clouds');
        break;
    }
    break;
  case ('Atmosphere') :
    featureObject = '14,10751,10749,16'
    console.log('set ATM');
    break;
  case ('Snow') :
    featureObject = '28,53,80,35'
    console.log('set SNOW');
    break;
  case ('Rain') :
    featureObject = '35'
    console.log('set RAIN');
    break;
  case ('Drizzle') :
    featureObject = '16,80,18'
    console.log('set DRZL');
    break;
  case ('Thunderstorm') :
    featureObject = '35, 80'
    console.log('set TSTORM');
    break;
  default :
    featureObject = '10770'
    console.log('set DEFAULT CONDITION');
}

// windspeed stuff
featureObject = featureObject + dontLike

return featureObject ;
};

const movieGenres = [
'28', // action
'12', // adventure
'16', // animation
'35', // comedy
'80', // crime
'18', // drama
'14', // fantasy
'10751', // family
'9648', // mystery
'10749', // romance
'53', // thriller
]

module.exports = { FeatureWeather, movieGenres };

