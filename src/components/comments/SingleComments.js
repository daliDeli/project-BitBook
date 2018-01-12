import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SingleComments extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            comment: {
                id: 0,
                dateCreated: '',
                body: 'loading..',
                postId: 0,
                authorName: 'Bla',
                authorId: 0
            }
        };
    }

    render() {

        const { authorName, body, date } = this.props;

        return (
            <div className="row commentDiv">

                <div className="col s6">
                    <strong className='author-comment'> {authorName}</strong> 
                    <span> {body} </span>
                </div>

                <div className="col s6">
                    <div className='right'>
                        {new Date(date).toDateString()}
                    </div>
                </div>
            </div>
        );
    }
}

SingleComments.propTypes = {
    authorName: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};