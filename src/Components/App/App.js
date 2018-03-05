import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { PropTypes } from 'react'
import './App.css';
import { error } from 'util';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        id: '1234',
        name: 'Leave',
        artist: 'Post Malone',
        album: 'Stoney'
      }, {
        id: '12345',
        name: 'No Option',
        artist: 'Post Malone',
        album: 'Stoney'
      }, {
        id: '123456',
        name: 'White Iverson',
        artist: 'Post Malone',
        album: 'Stoney'
      }],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    console.log(term);
    Spotify.getAccessToken();
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
    }
  }

  render() {
    return (
      <div>
        <h1 onClick={this.search}>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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