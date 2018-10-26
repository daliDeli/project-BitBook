import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ''
        };
    }

    searchRequest = e => {
        const searchString = e.target.value;

        this.setState({
            searchString
        });

        this.props.onSearchRequested(searchString);
    }

    render() {
        return (
            <div className="row search-display">
                <div className='input-field col s12'>
                    <input id="search" type="text" onChange={this.searchRequest} value={this.state.searchString} />
                    <label htmlFor="search">Search</label>
                    <span className="helper-text"></span>
                </div>
            </div>
        );
    }

}

Search.propTypes = {
    onSearchRequested: PropTypes.func
};