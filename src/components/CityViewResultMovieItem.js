import React, { Component } from 'react'

class CityViewResultMovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInLibrary: this.props.inLibrary,
    }
  }


  goToJustWatch(name) {
    // TODO: edge cases to add Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn) and Ant-Man
    var str = name.replace(/\s+/g, '-').toLowerCase();
    str = str.replace(/[^a-zA-Z0-9-" "]/g,'');
    console.log(str)

    var url = "https://www.justwatch.com/us/movie/" + str
    window.open(url, "_blank")
  
  }

  getYear() {
    const str = JSON.stringify(this.props.trackData["release_date"]).substring(1,5)
    return str;
  }

  render() {
    return (
      <a className={'movie-listing--item'}
        onClick={() => this.goToJustWatch(this.props.trackData["original_title"])}>
          <div className={'movie-listing--moviename'}>{this.props.trackData["original_title"]} ({this.getYear()})</div>
          <div className={'movie-listing--rating'}>voter average: {this.props.trackData["vote_average"]}</div>
          <div className={'movie-listing-img'}>
          <img src={"https://image.tmdb.org/t/p/w200/" + this.props.trackData["poster_path"]} alt={this.props.trackData["original_title"]}/>
        </div>

      </a>
    )
  }
}

export default CityViewResultMovieItem
