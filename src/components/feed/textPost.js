import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextPost extends Component {
    constructor(props) {
        super(props);
        
        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            posts: {
                text: 'Loading post ...',
                id: ''
            }
        };
    }

    bindEventHandlers() {
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick() {
        this.props.onPostDelete(this.props.post.id);
    }

    render() {
        return (
            <div className="row">
                <h4 className="col s12">
                    {this.props.post.text}
                </h4>
                <div className="col s6">
                    <p className="left">
                        {this.props.post.type} post
                    </p>
                </div>
                <div className="col s6">
                    <p className="right">
                        {this.props.post.commentsNum} Comments
                    </p>
                </div>
                <div className="col s12">
                    {this.props.enableDelete ? <button className="btn small center" onClick={this.onDeleteButtonClick}>DELETE</button> : ''}
                </div>
            </div>
        );
    }
}

TextPost.propTypes = {
    post: PropTypes.object,
    enableDelete: PropTypes.bool,
    onPostDelete: PropTypes.func
};