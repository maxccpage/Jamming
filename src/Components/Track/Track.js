import React, { Component } from 'react';
import './Track.css';
import { PropTypes } from 'react'

class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a onClick={this.addTrack} class="Track-action">+</a>
                <a onClick={this.removeTrack} class="Track-action">-</a>
            </div>
        )
    }
}

export default Track;