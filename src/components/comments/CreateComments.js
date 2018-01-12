import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateComments extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            comment: ''
        };
    }

    bindEventHandlers() {
        this.sendComments = this.sendComments.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }



    sendComments(e) {
        e.preventDefault();

        const comment = this.state.comment;

        this.props.giveComment(comment);

    }

    updateValue(event) {
        const comment = event.target.value;

        this.setState({
            comment
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