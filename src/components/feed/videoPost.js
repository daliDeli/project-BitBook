import React from 'react';
import PropTypes from 'prop-types';

export default class VideoPost extends React.Component {
    constructor(props) {
        super(props);   

        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick() {
        this.props.onPostDelete(this.props.post.id);
    }

    render() {

        const url = this.props.post.videoUrl;
        const id = url.slice(-11);
        return (
            <div className="row" >
                <div className="video-container">
                    <div className="col s12 ">
                        <iframe title='youtube-video' src={`https://www.youtube.com/embed/${id}`} allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col s6">
                    <p className="left">{this.props.post.type} post </p>
                </div>
                <div className="col s6">
                    <p className="right">
                        Comments: {this.props.post.commentsNum}
                    </p>
                </div>
                <div className="col s12">
                    {this.props.enableDelete ? <button className="btn small center" onClick={this.onDeleteButtonClick}>DELETE</button> : ''}
                </div>
            </div>
        );
    }
}

VideoPost.propTypes = {
    post: PropTypes.object,
    enableDelete: PropTypes.bool,
    onPostDelete: PropTypes.func
};
