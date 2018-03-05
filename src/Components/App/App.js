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
      playlistTracks: [{
        id: '1234567',
        name: 'Monster',
        artist: 'Reaction',
        album: 'XC'
      }, {
        id: '12345678',
        name: '4:06Am',
        artist: 'Reaction',
        album: 'XC'
      }, {
        id: '123456789',
        name: 'Just for the Weekend',
        artist: 'Reaction',
        album: 'XC'
      }]
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
      console.log('track already in playlist')
    } else {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      })
    }
  }

  removeTrack(track) {
    let id = track.id;
    const updatedPlaylist = this.state.playlistTracks.filter(track => track.id != id);
    this.setState({
      playlistTracks: updatedPlaylist
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
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