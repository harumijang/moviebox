import React, {Component} from 'react'
import CityViewMovie from './CityViewResultMovie'
import {Link} from 'react-router-dom'

import weatherIconResolver from './../actions/WeatherIconResolver';

class CityViewResult extends Component {
  renderWeatherIcon = () => {
    const wid = this.props.weather.cityCondID;
    const { result: iconClass } = weatherIconResolver.find(c => c.condition(wid));
    return(
      <i className={`wi ${iconClass} city-view--weather-icon`}/>
    )
  };

  renderMovie = () => {
    if (this.props.weather.dataIsSet) {
      return (
        <CityViewMovie weather={this.props.weather}/>
      )
    }
  };

  render () {
    return(
      <div className={'city-view-page--wrapper'}>
        <hr className='line'></hr>
              <h4>here are some movies based on the weather, refresh for a new list</h4>
        <div className={'city-view--city'}>
          <Link className={'city-view--home-link'} to='/'>{'< return to search'}</Link>
          <hr></hr>
          <h2 className={'city-view--cityname'}>{this.props.weather.cityName} is currently {this.props.weather.cityTemp}°C
          with {this.renderWeatherIcon()} {this.props.weather.cityCondDescription}
          </h2>
        </div>
        <hr className='line'></hr>
        {this.renderMovie()}
      </div>
    )
  }
}

export default CityViewResult