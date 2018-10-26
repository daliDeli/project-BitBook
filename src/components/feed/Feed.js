import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-modal';
import M from 'materialize-css';
import { SESSION_STORAGE_USER_KEY } from '../../constants';
import { dataService } from '../../services/dataService';
import { redirectService } from '../../services/redirectService';
import { CreatePost } from './CreatePost';
import TextPost from './TextPost';
import { VideoPost } from './VideoPost';
import { ImagePost } from './ImagePost';

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            modalIsOpen: false,
            postContent: '',
            videoContent: '',
            imageContent: '',
            modalType: '',
            filterType: 'all',
            hasMore: true,
            postCount: 20
        };
         this.style = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
                position: 'absolute',
                top: 'none',
                left: 'none',
                bottom: '100px',
                right: '90px',
                width: '440px',
                height: '290px',
                border: '1px solid #ccc',
                background: '#DAE2DF',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'

            }
        };
        this.bindEventHandlers();
    }

    initDropdown() {
        const elem = document.querySelector('.dropdown-trigger');
        new M.Dropdown(elem, { coverTrigger: false });
    }

    initPostButton() {
        const elem = document.querySelector('.fixed-action-btn');
        new M.FloatingActionButton(elem, {
            direction: 'top',
            hoverEnabled: true,
            toolbarEnabled: false
        });
    }

    initModal() {
        Modal.setAppElement('body');                
    }

    bindEventHandlers() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    fetchAllPosts = page => {
        dataService.fetchAllPosts(
            posts => {
                this.setState({
                    posts
                })
            },
            error => console.warn(error),
            page * 10
        );

        if (this.state.postCount <= page * 10) {
            this.setState({ hasMore: false });
        }
    }

    valueHandler = e => {
        const value = e.target.value;
        if (e.target.id === 'text') {
            this.setState({
                postContent: value
            });
        };
        if (e.target.id === 'image') {
            this.setState({
                imageContent: value
            });
        };
        if (e.target.id === 'video') {
            this.setState({
                videoContent: value
            });
        };
    }

    submitForm = e => {
        e.preventDefault();

        const data = {
            userId: parseInt(sessionStorage.getItem(SESSION_STORAGE_USER_KEY), 10),
            userDisplayName: 'Guest',
        };

        if (this.state.modalType === 'text') {
            data.text = this.state.postContent;
            data.type = 'Text';
        };
        if (this.state.modalType === 'video') {
            data.videoUrl = this.state.videoContent;
            data.type = 'Video';
        };
        if (this.state.modalType === 'image') {
            data.imageUrl = this.state.imageContent;
            data.type = 'Image';
        };

        dataService.sendPost(data, () => redirectService.goTo('/'), error => console.warn(error));
        this.closeModal();
    }

    isItMyPost = post => {
        const profileId = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
        return parseInt(post.userId, 10) === parseInt(profileId, 10);
    }

    deletePost = postId => {
        dataService.deletePost(postId,
            () => redirectService.goTo('/feed'),
            error => console.warn(error));
    }

    updateFilterType = ({ target }) => {
        this.setState({
            filterType: target.id
        });
    }

    displayPosts() {
        return this.state.posts.map(post => {

            if (this.state.filterType !== 'all') {
                if (post.type === 'text' && this.state.filterType === 'text') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <TextPost onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} post={post}/>
                        </Link>
                    </div>);
                }
                if (post.type === 'video' && this.state.filterType === 'video') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <VideoPost post={post} onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} />
                        </Link>
                    </div>);
                }
                if (post.type === 'image' && this.state.filterType === 'image') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <ImagePost post={post} onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} />
                        </Link>
                    </div>);
                }
            } else {
                if (post.type === 'text') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <TextPost onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} post={post} />
                        </Link>
                    </div>);
                }
                if (post.type === 'video') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <VideoPost post={post} onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} />
                        </Link>
                    </div>);
                }
                if (post.type === 'image') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <ImagePost post={post} onPostDelete={this.deletePost} enableDelete={this.isItMyPost(post)} />
                        </Link>
                    </div>);
                }
            }
            return null;
        });
    }

    displayFilter() {
        return (
            <div className="section right filter-wrapper">
                <button className="dropdown-trigger btn" data-target="dropdown1">Filter Posts</button>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a id="all" onClick={this.updateFilterType}>All posts</a></li>
                    <li className="divider"></li>
                    <li><a id="text" onClick={this.updateFilterType}>Text posts</a></li>
                    <li><a id="video" onClick={this.updateFilterType}>Video posts</a></li>
                    <li><a id="image" onClick={this.updateFilterType}>Image posts</a></li>
                </ul>
            </div>
        );
    }

    displayAddPostButton() {
        return (
            <div className="section center">
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul className="">
                        <li onClick={() => this.openModal('text')}><a className="btn-floating red"><i className="material-icons">textsms</i></a></li>
                        <li onClick={() => this.openModal('video')}><a className="btn-floating blue darken-1"><i className="material-icons">videocam</i></a></li>
                        <li onClick={() => this.openModal('image')}><a className="btn-floating green"><i className="material-icons">add_a_photo</i></a></li>
                    </ul>
                </div>
            </div>
        );
    }

    openModal(type) {
        this.setState({ modalIsOpen: true, modalType: type });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        this.initDropdown();
        this.initPostButton();
        this.initModal();       
    }

    render() {

        return (
            <main>
                <div className="row container">
                    <div className="col s9 center">

                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.fetchAllPosts}
                            hasMore={this.state.hasMore}
                            useWindow={true}
                            loader={
                                <div className="preloader-wrapper big active loader">
                                    <div className="spinner-layer">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            {this.displayPosts()}
                        </InfiniteScroll>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={this.style}
                        >
                            <CreatePost 
                                modalType={this.state.modalType}
                                postContent={this.state.postContent}
                                videoContent={this.state.videoContent}
                                imageContent={this.state.imageContent}
                                closeModal={this.closeModal}
                                valueHandler={this.valueHandler}
                                submitForm={this.submitForm}
                            />
                        </Modal>
                        
                    </div>
                    <div className="col s3">
                        {this.displayFilter()}
                        {this.displayAddPostButton()}
                    </div>
                </div>
            </main>
        );
    }
};

export default Feed;
