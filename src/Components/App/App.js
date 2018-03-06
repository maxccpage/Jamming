import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { PropTypes } from 'react'
import './App.css';
import { error } from 'util';
import Spotify from '../../util/Spotify';

const redirectURI = 'http://localhost:3000/callback';
const clientID = '28b5e49f49fa48ef996c1f8673eea5ed';
const clientSecret = '923f57b6c2884a82a2cfef0b84b6c428';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      userAccessToken: ''
    }
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
    if (this.state.userAccessToken !== '') {
      let userAccessToken = this.state.userAccessToken;
      return userAccessToken;
    } else {
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`);
    }
  }

  savePlaylist() {
    const trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      let trackURI = `https://www.spotify.com/track/${Math.floor(Math.random() * 100000000000000000)}`
      trackURIs.push(trackURI);
    }
    console.log(trackURIs)
  }

  addTrack(track) {
    if (this.state.playlistTracks.includes(track)) {
      alert('That track is already in your playlist :)')
    } else {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      })
    }
  }

  removeTrack(track) {
    let id = track.id;
    const updatedPlaylist = this.state.playlistTracks.filter(track => track.id !== id);
    this.setState({
      playlistTracks: updatedPlaylist
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  componentDidMount() {
    if (window.location.href.indexOf('callback') >= 0) {
      let url = window.location.href;
      let accessRegex = /access_token=([^&]*)/;
      let timerRegex = /expires_in=([^&]*)/;
      let userAccessToken = url.match(accessRegex);
      let tokenTime = url.match(timerRegex);
      userAccessToken = userAccessToken[1];
      tokenTime = tokenTime[1];
      console.log('Expires: ', tokenTime, 'Access Token : ', userAccessToken, );
      window.setTimeout(() => userAccessToken = '', tokenTime * 1000);
      window.history.pushState('Access Token', null, '/');
      this.setState({
        userAccessToken: userAccessToken
      })
    }

  }
  search(term) {
    let userAccessToken = this.state.userAccessToken;
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}
        `, {
        headers: { Authorization: `Bearer ${userAccessToken}` }
      }).then(tracks => {
        let jsonResponse = tracks.json();
        return jsonResponse;
      }).then(jsonResponse => {
        let trackArray = jsonResponse.tracks.items;
        return trackArray;
      }).then(trackArray => {
        if (trackArray) {
          return trackArray.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        }
      }).catch(err => {
        console.log(err);
      })
  }

  searchNow(term) {
    this.search(term).then(tracks => {
      this.setState({ searchResults: tracks })
    })
  }

  savePlaylistNow(playlistName, trackURIs) {
    // if (!playlistName || trackURIs === '') {
    //   return
    // } else {
    //   let currentUserAccessToken = this.state.userAccessToken;
    //   let userId;
    //   fetch('https://api.spotify.com/v1/me', {
    //     'Authorization': 'Bearer ' + currentUserAccessToken
    //   }).then(user => {
    //     let jsonResponse = user.json();
    //     console.log(jsonResponse);
    //     return jsonResponse;
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }
  }

  render() {
    return (
      <div>
        <h1 onClick={this.getAccessToken}>Ja<span className="highlight">mmm</span>ing</h1>
        <p onClick={this.savePlaylistNow}> test </p>
        <div className="App">
          <SearchBar onSearch={this.searchNow} />
          <div className="App-playlist">
            <SearchResults on onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App; 