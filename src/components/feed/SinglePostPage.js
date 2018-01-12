import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { dataService } from '../../services/dataService';
import CreateComments from '../comments/CreateComments';
import SingleComments from '../comments/SingleComments';

class SinglePostPage extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            post: {
                videoUrl: 'dasdasdasdasdasdasdadas'
            },
            type: '',
            comments: '',
            singleComments: []
        };
    }

    bindEventHandlers() {
        this.whichType = this.whichType.bind(this);
        this.whichRenderType = this.whichRenderType.bind(this);
        this.giveComment = this.giveComment.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleComments = this.handleComments.bind(this);
    }

    whichType() {

        let param = this.props.match.params.type;
        let type = '';

        if (param === 'text') {
            type = 'TextPosts';
        } else if (param === 'video') {
            type = 'VideoPosts';
        } else if (param === 'image') {
            type = 'ImagePosts';
        }

        this.findPost(type);
    }

    findPost(type) {
        dataService.fetchAnyPosts(type, this.props.match.params.singleId, this.handlePost, error => console.warn(error));
    }

    getAllComments() {
        dataService.fetchCommentsPosts(this.props.match.params.singleId, this.handleComments, error => console.warn(error));
    }

    handlePost(post) {
        this.setState({
            post
        });
    }

    handleComments(singleComments) {
        this.setState({
            singleComments
        });
    }

    // radi post i get metode
    giveComment(comment) {

        const data = {
            postId: this.state.post.id,
            body: comment
        };

        dataService.postComments(data,
            response => window.location.reload(),
            error => console.warn(error));

        this.getAllComments();
    }

    whichRenderType(type) {

        const { text, videoUrl, imageUrl } = this.state.post;

        if (type === 'text') {
            return <p className='flow-text'>{text} </p>;

        } else if (type === 'video') {
            const id = videoUrl.slice(-11);
            return <iframe title='youtube-video' width="800px" height="450px" src={`https://www.youtube.com/embed/${id}`} allowFullScreen></iframe>;

        } else if (type === 'image') {
            return <img className='single-image' alt='' src={imageUrl} />;
        }
    }

    componentDidMount() {
        this.getAllComments();
        this.whichType();
    }

    render() {
        return (
            <main className="needMargin">
                <div className="container row">
                    <div className="col s12 center">
                        {this.whichRenderType(this.props.match.params.type)}
                    </div>
                </div>

                <CreateComments giveComment={this.giveComment} />
                <div className="row container">
                    {this.state.singleComments.map(comment =>
                        <SingleComments key={comment.id} date={comment.dateCreated} authorName={comment.authorName} body={comment.body} />
                    )}

                </div>
            </main>
        );
    }
}

export default SinglePostPage;

SinglePostPage.propTypes = {
    match: PropTypes.object
};

