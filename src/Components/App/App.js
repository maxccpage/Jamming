import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

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
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App; 