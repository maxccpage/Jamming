import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import { error } from 'util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: 'Leave',
        artist: 'Post Malone',
        album: 'Stoney'
      }, {
        name: 'No Option',
        artist: 'Post Malone',
        album: 'Stoney'
      }, {
        name: 'White Iverson',
        artist: 'Post Malone',
        album: 'Stoney'
      }],
      playlistName: 'JukeBox',
      playlistTracks: [{
        name: 'Monster',
        artist: 'Reaction',
        album: 'XC'
      }, {
        name: '4:06Am',
        artist: 'Reaction',
        album: 'XC'
      }, {
        name: 'Just for the Weekend',
        artist: 'Reaction',
        album: 'XC'
      }]
    }
    this.addTrack = this.addTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App; 