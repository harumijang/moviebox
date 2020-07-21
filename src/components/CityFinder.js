import React, { Component } from 'react'
import CityFinderResultList from './CityFinderResultList'

function parseCityListing(listing) {
  let nameArray = listing.matching_full_name.split(',');
  let cityName = nameArray[0];
  let regionName = nameArray[1];
  let countryAndAlt = nameArray[2].split('(');
  let countryName = countryAndAlt[0];
  let altCityName = '';
  if (typeof countryAndAlt[1] !== 'undefined') {
    altCityName = countryAndAlt[1].replace(')', '');
  }
  let gid = listing._links['city:item'].href.replace(/\D/g,'');

  return {cityName, regionName, countryName, altCityName, gid}
}

class CityFinder extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            searchResult: [],
            lastQuery: null,
            gid: null,
            redirect: false,
            searchShownClass: '',
            searchLockScroll: '',
            emptySearch: false,
            searchActive: false
          };
      
    }


unlockPageHeight = () => {
  this.setState({
    searchLockScroll: 'city-results--shown-lock',
    searchActive: true
  });
  setTimeout(() => {
    this.setState({ searchLockScroll: '' }, () => {
      if (this.state.searchResult.length === 0) {
        this.setState({
          emptySearch: true,
        })
      }
    });
  }, 425);
};
fetchCitiesFromAPI = (url) => {
    fetch(url)
    .then((raw) => {
        return raw.json();
    })
    .then((respJson) => {
        let citiesReturned = [];
        let cityList = respJson._embedded['city:search-results'];
        cityList.map((result) => {
            return citiesReturned.push(parseCityListing((result)));
        });
        return citiesReturned;  
      })
      .then((stateOfResults) => {
        this.setState({
          searchResult: stateOfResults,
          emptySearch: false,
          searchActive: true,
          searchShownClass: 'city-results--shown'
        }, this.unlockPageHeight());
      });
  };

handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.value) return;

    const resultLimit = 5;
    const query = encodeURIComponent(this.state.value);
    const reqUrl = `https://api.teleport.org/api/cities/?search=${query}&limit=${resultLimit}`;
    if (query !== this.state.lastQuery) {
      this.setState({ lastQuery: query });
      this.fetchCitiesFromAPI(reqUrl);
      return true;
    }
    return false;
  };

handleChange = (e) => {
    this.setState({
    value: e.target.value
}, () => {
    if (this.state.value === '') {
    this.setState({
      searchResult: [],
        lastQuery: null,
        gid: null,
        searchShownClass: '',
        searchLockScroll: '',
        emptySearch: false,
        searchActive: false,
        })
      }
    })
  };

citySelectHandler = (gid) => {
    this.setState({
      gid: gid,
      redirect: true,
    }, () => {
      this.renderRedirect();
    });
  };

  // Redirect to movie suggestions page for the selected city
  renderRedirect =  () => {
    if (this.state.redirect) {
      this.props.history.push(`/city/${this.state.gid}`);
    }
};

renderAboutWeatherBox = () => {
  if (!this.state.searchActive) {
    return (
      <div className={'about-weatherbox--wrapper'}>
        <div className={'about-weatherbox--center'}>
          <h3 className={'about-weatherbox--primary'}>search for your city and find movie recommendations based on the weather</h3>
        </div>
      </div>
    );
  }
};

render() {
    return (
      <div className={`city-finder-page--spacing-force-wrapper ${this.state.searchLockScroll}`}>
        <div className={`city-finder-page--wrapper ${this.state.searchShownClass}`}>
      <div className={'city-finder-form--wrapper'}>
      <br></br>
      <form onSubmit={this.handleSubmit} className={'searched-city--form'}>
        <input type='text'
               className={'form-control'}
               id='input'
               value={this.state.value}
               placeholder={'type your city'}
               onChange={this.handleChange}/>
        <input className={'submit'} type='submit' value={'submit'}/>
      </form>
    </div>
    {this.state.emptySearch ? <div className={'city-finder--no-results'}>There's nothing here!</div> : ''}
    <CityFinderResultList searchResult={this.state.searchResult}
                          citySelectHandler={this.citySelectHandler}/>
    {this.renderAboutWeatherBox()}
    <div>
    <span id='cred'>© Harumi Jang</span>
    </div>
    </div>
    </div>

    )

}
}


export default CityFinder