import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { dataService } from '../../services/dataService';
import CreateComments from '../comments/CreateComments';
import SingleComments from '../comments/SingleComments';

class SinglePostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                videoUrl: ''
            },
            type: '',
            comments: '',
            singleComments: []
        };
    }

    componentDidMount() {
        this.getAllComments();
        this.whichType();
    }

    whichType() {
        const param = this.props.match.params.type;
        let type;

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
        dataService.fetchAnyPosts(type,
            this.props.match.params.singleId,
            post => {
                this.setState({
                    post
                });
            }
        );
    }

    getAllComments() {
        dataService.fetchCommentsPosts(
            this.props.match.params.singleId,
            singleComments => {
                this.setState({
                    singleComments
                });
            }
        );
    }

    giveComment = comment => {

        const data = {
            postId: this.state.post.id,
            body: comment
        };

        dataService.postComments(data,
            () => window.location.reload(),
        );

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

