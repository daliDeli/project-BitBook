import React from 'react';
import PropTypes from 'prop-types';

export default class ImagePost extends React.Component {
    constructor(props) {
        super(props);

        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick() {
        this.props.onPostDelete(this.props.post.id);
    }

    render() {
        return (
            <main className="row image-container">
                <div className="col s12 imgDiv">
                    <img className="responsive-img" src={this.props.post.imageUrl } alt='' />

                </div>
                <div className="col s6">
                    <p className = "left">{this.props.post.type} post </p>
                </div>
                <div className="col s6">
                    <p className="right">
                        Comments: {this.props.post.commentsNum}
                    </p>
                </div>
                <div className="col s12">
                    {this.props.enableDelete ? <button className="btn small center" onClick={this.onDeleteButtonClick}>DELETE</button> : ''}
                </div>
            </main>
        );
    }
}

ImagePost.propTypes = {
    post: PropTypes.object,
    enableDelete: PropTypes.bool,
    onPostDelete: PropTypes.func
};
