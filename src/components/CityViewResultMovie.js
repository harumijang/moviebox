import React, { Component } from 'react'

import CityViewResultMovieItem from './CityViewResultMovieItem'

class CityViewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songsSet: false,
      tracks: null,
      libraryChecked: false,
      trackInLibraryMap: []
    };
  }

  getTMDBMovies = async () => {

    return fetch('/api/movies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ weather: this.props.weather })
    })
      .then(raw => {
        console.log("peepeepoopoo")
        return raw.json();
      })
      .catch(err => {
        console.log(err)
      });
  };

  componentDidMount() {
    console.log("component did mount")
    this.trackUris = [];
    this.getTracks()
  }
  
  getTracks = () => {
    console.log("getTracks")
    this.getTMDBMovies()
    .then((tracks) => {
      this.checkSongs(tracks);
      console.log(tracks)

    })
    .catch((err) => {
      console.log(err);
    })
    
  };

  checkSongs = (tracks) => {
    console.log("printing tracks: " + tracks)
    this.setState({
      songsSet: true,
      tracks: tracks

    })}

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

        

  renderMovies = () => {
    if (this.state.songsSet) {
      console.log("this.state.songSet is true")
   //  map of movies happens here 
      return (
        <React.Fragment>
          <div className={'recommended-songs--wrapper'}>
          {this.shuffleArray(this.state.tracks)}
          {this.state.tracks.slice(0, 9).map((result, index) => {

          return (<CityViewResultMovieItem 
            key={index} 
            trackData={result}/>);
          })}
          </div>
          
          
          <div className={'song-listing--refresh-music'}>
            <button onClick={() => {this.refreshMusic()}}>Reload</button>
          </div>
        </React.Fragment>
      );
    } else {
      console.log("this.state.songSet is false")

      return (
        <div className={'loading-wrapper'}>
          <div className={'hollow-loader'}>
            <div className={'large-box'}></div>
            <div className={'small-box'}></div>
          </div>
        </div>
      )
    }
  };

  render() {
    return (this.renderMovies());
  }
}

export default CityViewMovie
