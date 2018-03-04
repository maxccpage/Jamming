import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';
import { PropTypes } from 'react'

class TrackList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks === undefined ? console.log('not yet') : this.props.tracks.map(track => {
                        return <Track onRemove={this.props.onRemove} onAdd={this.props.onAdd} key={track.id} track={track} />
                    })
                }
            </div>
        )
    }
}

export default TrackList;