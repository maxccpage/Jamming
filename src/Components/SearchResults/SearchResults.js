import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';
import { PropTypes } from 'react'

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} />
            </div>
        )
    }
}

export default SearchResults;