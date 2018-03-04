import React, { Component } from 'react';
import { PropTypes } from 'react'
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value)
    }
    render() {
        return (
            <div className="Playlist">
                <input value="New Playlist" />
                <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
                <a onChange={this.handleNameChange} className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;