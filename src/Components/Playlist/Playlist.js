import React, { Component } from 'react';
import { PropTypes } from 'react'
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value)
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} placeholder="Edit Playlist Name" />
                <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
                <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;