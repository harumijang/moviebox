import React, { Component } from 'react'
import axios from "axios/index";

class CityViewResultMovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInLibrary: this.props.inLibrary,
    }
  }

  getImage() {
    
  }



  render() {
    return (
      <a className={'movie-listing--item'}>
          <div className={'movie-listing--moviename'}>{this.props.trackData["original_title"]}</div>
          <div className={'movie-listing--release'}>Release Date: {this.props.trackData["release_date"]}</div>
          <div className={'song-listing--item-album-img'}>
          <img src={"https://image.tmdb.org/t/p/w200/" + this.props.trackData["poster_path"]} alt={this.props.trackData["original_title"]}/>
        </div>

      </a>
    )
  }
}

export default CityViewResultMovieItem