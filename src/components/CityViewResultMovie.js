import React, { Component } from "react";

import CityViewResultMovieItem from "./CityViewResultMovieItem";

class CityViewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesSet: false,
      movies: null,
      libraryChecked: false,
      movieInLibraryMap: [],
    };
  }

  getTMDBMovies = async () => {
    return fetch("/api/movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ weather: this.props.weather }),
    })
      .then((raw) => {
        return raw.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("component did mount");
    this.trackUris = [];
    this.getTracks();
  }

  getTracks = () => {
    console.log("getTracks");
    this.getTMDBMovies()
      .then((tracks) => {
        this.checkSongs(tracks);
        console.log(tracks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkSongs = (tracks) => {
    console.log("printing tracks: " + tracks);
    this.setState({
      moviesSet: true,
      movies: tracks,
    });
  };

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  refreshMovies = () => {
    this.setState({
      moviesSet: false,
      movies: null,
      moviesInLibraryMap: [],
      libraryChecked: false,
    });
    this.getTracks();
  };

  renderMovies = () => {
    if (this.state.moviesSet) {
      //  map of movies happens here
      return (
        <React.Fragment>
          <div className={"recommended-movies--wrapper"} col-sm>
            {this.shuffleArray(this.state.movies)}
            <div className="container">
              <div className="row">
                {this.state.movies.slice(0, 3).map((result, index) => {
                  return (
                    <CityViewResultMovieItem
                      key={index}
                      trackData={result}>
                    </CityViewResultMovieItem>
                  );
                })}
              </div>
              <div className="row">
                {this.state.movies.slice(3, 5).map((result, index) => {
                  return (
                    <CityViewResultMovieItem
                      className="col-sm"
                      key={index}
                      trackData={result}
                    >
                    </CityViewResultMovieItem>
                  );
                })}
              </div>
            </div>
          </div>
          <br></br>
          <div className={"movie-listing--refresh-movies"}>
            <button className='refresh-button'
              onClick={() => {
                this.refreshMovies();
              }}
            >
              Reload
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className={"loading-wrapper"}>
          <div className={"hollow-loader"}>
            <div className={"large-box"}></div>
            <div className={"small-box"}></div>
          </div>
        </div>
      );
    }
  };

  render() {
    return this.renderMovies();
  }
}

export default CityViewMovie;
