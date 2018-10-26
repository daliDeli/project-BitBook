import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        };
    }

    sendComments = e => {
        e.preventDefault();
        this.props.giveComment(this.state.comment);
    }

    updateValue = e => {
        this.setState({
            comment: e.target.value
        });
    }

    render() {
        return (

            <div className="row container center">
                <div className="input-field col s9">
                    <input id="comment" type="text" onChange={this.updateValue} value={this.state.comment} />
                    <label htmlFor="comment">Add your comment</label>
                    <span className="helper-text" ></span>
                </div>
                <div className="col s3">
                    <button onClick={this.sendComments} type="submit"  className="btn waves-effect waves-light" >
                    Send
                    </button>
                </div>
            </div>

        );
    }
}

CreateComments.propTypes = {
    giveComment: PropTypes.func
};