import React from 'react';
import PropTypes from 'prop-types';

export const VideoPost = props => {

    const url = props.post.videoUrl;
    const id = url.slice(-11);
    return (
        <div className="row" >
            <div className="video-container">
                <div className="col s12 ">
                    <iframe title='youtube-video' src={`https://www.youtube.com/embed/${id}`} allowFullScreen></iframe>
                </div>
            </div>
            <div className="col s6">
                <p className="left">{props.post.type} post </p>
            </div>
            <div className="col s6">
                <p className="right">
                    Comments: {props.post.commentsNum}
                </p>
            </div>
            <div className="col s12">
                {props.enableDelete ?
                <button className="btn small center" onClick={() => { props.onPostDelete(props.post.id) }}>DELETE</button> 
                : ''
                }
            </div>
        </div>
    );
}

VideoPost.propTypes = {
    post: PropTypes.object,
    enableDelete: PropTypes.bool,
    onPostDelete: PropTypes.func
};
