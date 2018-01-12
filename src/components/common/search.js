import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            searchString: ''
        };
    }

    bindEventHandlers() {
        this.searchRequest = this.searchRequest.bind(this);
    }

    searchRequest(event) {
        const searchString = event.target.value;

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