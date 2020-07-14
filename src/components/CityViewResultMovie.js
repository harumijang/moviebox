import React, { Component } from 'react'
import axios from 'axios'

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

  getOMDBMovies = async () => {
    return fetch('/api/movies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ weather: this.props.weather })
    })
      .then(raw => {
        return raw.json();
        console.log(raw.json)
      })
      .catch(err => {
        console.log(err)
      });
  };

  componentDidMount() {
    this.trackUris = [];
    this.getTracks()
  }

  getTracks = () => {
    this.getOMDBMovies()
      .then((tracks) => {
        this.checkSongs(tracks);
      })
      .catch((err) => {
        console.log(err);
      })
  };

 
  checkSongs = (tracks) => {
    let tempLibraryCheck = [];
    tracks.forEach((track) => {
      tempLibraryCheck.push(track.id)
    });
    axios({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // url: 'http://www.omdbapi.com/?apikey=' + omdbKey + '&',
      url: 'https://api.themoviedb.org/3/search/movie?api_key=c9543fcfc8dc493ef4a4849f6b9bb62c&query=Jack+Reacher',
      method: 'GET',
      params: {
        ids: tempLibraryCheck.join(',')
      },
    })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({
            tracks: tracks,
            trackInLibraryMap: resp.data
          }, () => {
            this.setState({
              songsSet: true,
              libraryChecked: true,
            })
          })
        } else {
          throw Error(resp.status)
        }
      })
      .catch(err => {
        this.setState({
          tracks: tracks,
        }, () => {
          this.setState({
            songsSet: true,
          })
        });
        console.log(err);
      })
  };




  renderMovies = () => {
    if (this.state.songsSet) {
      return (
        <React.Fragment>
          <div className={'recommended-songs--wrapper'}>
            {this.state.tracks.map((result, index) => {
              this.trackUris.push(result.uri);
              return (<CityViewResultMovieItem
                key={index}
                trackData={result}
                inLibrary={this.state.trackInLibraryMap[index]}
                libraryChecked={this.state.libraryChecked}
                handleSongClick={this.handleSongClick}/>);
            })}
          </div>
          <div className={'song-listing--refresh-music'}>
            <button onClick={() => {this.refreshMusic()}}>Reload</button>
          </div>
        </React.Fragment>
      );
    } else {
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