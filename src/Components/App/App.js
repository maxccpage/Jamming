import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { PropTypes } from 'react';
import './App.css';
import { error } from 'util';

const redirectURI = 'http://maxccpage-jammming.herokuapp.com';
const clientID = '28b5e49f49fa48ef996c1f8673eea5ed';
const clientSecret = '80b09a350e164ea7924d4d5b71bad96d';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      userAccessToken: ''
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.searchNow = this.searchNow.bind(this);
    this.savePlaylistNow = this.savePlaylistNow.bind(this);
  }

  getAccessToken() {
    if (this.state.userAccessToken) {
      let userAccessToken = this.state.userAccessToken;
      return userAccessToken;
    } else {
      let scopes = 'playlist-modify-public';
      console.log(clientID, scopes, redirectURI);
      window.location.replace(
        `https://accounts.spotify.com/authorize?client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}&response_type=token`
      );
      this.setState({
        signedIn: true
      });
    }
  }

  savePlaylist() {
    console.log('im eorking');
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      let uri = this.state.playlistTracks[i].uri;
      trackURIs.push(uri);
    }
    this.savePlaylistNow(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.includes(track)) {
      alert('That track is already in your playlist :)');
    } else {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      });
    }
  }

  removeTrack(track) {
    let id = track.id;
    const updatedPlaylist = this.state.playlistTracks.filter(
      track => track.id !== id
    );
    this.setState({
      playlistTracks: updatedPlaylist
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  componentDidMount() {
      let url = window.location.href;
      let accessRegex = /access_token=([^&]*)/;
      let timerRegex = /expires_in=([^&]*)/;
      let userAccessToken = url.match(accessRegex);
      let tokenTime = url.match(timerRegex);
      this.setState({ userAccessToken: userAccessToken[1] });
      tokenTime = tokenTime[1];
      console.log(
        'Expires: ',
        tokenTime,
        'Access Token : ',
        this.state.userAccessToken
      );
      window.setTimeout(
        () => (this.state.userAccessToken = ''),
        tokenTime * 1000
      );
      window.history.pushState('Access Token', null, '/');
    }
  }
  search(term) {
    if (this.state.userAccessToken === '') {
      alert('You must sign in to your spotify before making any searches!');
    } else {
      let userAccessToken = this.state.userAccessToken;
      return fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}
        `,
        {
          headers: { Authorization: `Bearer ${userAccessToken}` }
        }
      )
        .then(tracks => {
          let jsonResponse = tracks.json();
          return jsonResponse;
        })
        .then(jsonResponse => {
          let trackArray = jsonResponse.tracks.items;
          return trackArray;
        })
        .then(trackArray => {
          if (trackArray) {
            return trackArray.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  searchNow(term) {
    this.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  savePlaylistNow(playlistName, trackURIs) {
    if (!playlistName || trackURIs === '') {
      return;
    } else {
      let currentUserAccessToken = this.state.userAccessToken;
      let headers = { Authorization: 'Bearer ' + currentUserAccessToken };
      let userId;
      fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(user => {
          let jsonResponse = user.json();
          return jsonResponse;
        })
        .then(jsonResponse => {
          userId = jsonResponse.id;
          return userId;
        })
        .then(userId => {
          fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
              Authorization: 'Bearer ' + currentUserAccessToken
            },
            contentType: 'application/json',
            method: 'POST',
            body: JSON.stringify({
              name: `${playlistName}`,
              description: `You made this playlist with Jammming, a ReactJS web application built by Max Page`
            })
          })
            .then(playlist => {
              return playlist.json();
            })
            .then(playlist => {
              let playlistId = playlist.id;
              console.log('playlistId : ', playlistId);
              return playlistId;
            })
            .then(playlistId => {
              fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                  headers: {
                    Authorization: 'Bearer ' + currentUserAccessToken
                  },
                  contentType: 'application/json',
                  method: 'POST',
                  body: JSON.stringify({
                    uris: trackURIs
                  })
                }
              )
                .then(success => {
                  return success;
                })
                .catch(err => {
                  console.log('lol your trash', err);
                });
            })
            .catch(err => {
              console.log('Down here', err);
            });
        });
    }
  }

  render() {
    let conditionalClass = {
      one: 'App',
      two: 'App-Sign-In'
    };

    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div
          className={
            this.state.signedIn === false
              ? conditionalClass.two
              : conditionalClass.one
          }
        >
          {this.state.signedIn === false ? (
            <p> Sign in to your Spotify Account to start using JAMMMING </p>
          ) : (
            ''
          )}
          {this.state.signedIn === false ? (
            <button className="Sign-In" onClick={this.getAccessToken}>
              {' '}
              Sign In{' '}
            </button>
          ) : (
            ''
          )}
          {this.state.signedIn === true ? (
            <SearchBar onSearch={this.searchNow} />
          ) : (
            ''
          )}
          <div className="App-playlist">
            {this.state.signedIn === true ? (
              <SearchResults
                on
                onAdd={this.addTrack}
                searchResults={this.state.searchResults}
              />
            ) : (
              ''
            )}
            {this.state.signedIn === true ? (
              <Playlist
                onSave={this.savePlaylist}
                onNameChange={this.updatePlaylistName}
                onRemove={this.removeTrack}
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
