import React, { Component } from 'react'
import axios from "axios/index";

class CityViewResultMovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInLibrary: this.props.inLibrary,
    }
  }


  // movie api access token  axios http calls here 

  render() {
    return (
      <a className={'movie-listing--item'}>
          <div className={'movie-listing--moviename'}>{this.props.trackData.name}</div>
          <div className={'movie-listing--moviename'}>Movie Test</div>
      </a>
    )
  }
}

export default CityViewResultMovieItem