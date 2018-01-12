import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-modal';
import M from 'materialize-css';

import { SESSION_STORAGE_USER_KEY } from '../../constants';
import { dataService } from '../../services/dataService';
import { redirectService } from '../../services/redirectService';
import TextPost from './textPost';
import VideoPost from './videoPost';
import ImagePost from './imagePost';


class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    // Initialization methods
    initState() {
        return {
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
        this.successHandler = this.successHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.valueHandler = this.valueHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.isMyPost = this.isMyPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.fetchAllPosts = this.fetchAllPosts.bind(this);
        this.updateFilterType = this.updateFilterType.bind(this);
    }

    fetchAllPosts(page) {
        dataService.fetchAllPosts(this.successHandler, error => console.warn(error), page * 10);

        if (this.state.postCount <= page * 10) {
            this.setState({ hasMore: false });
        }
    }

    successHandler(posts) {
        this.setState({
            posts
        });
    }

    valueHandler(event) {
        if (event.target.id === 'text') {
            this.setState({
                postContent: event.target.value
            });
        };
        if (event.target.id === 'image') {
            this.setState({
                imageContent: event.target.value
            });
        };
        if (event.target.id === 'video') {
            this.setState({
                videoContent: event.target.value
            });
        };
    }

    submitForm(event) {
        event.preventDefault();

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

        dataService.sendPost(data, response => redirectService.goTo('/'), error => console.warn(error));
        this.closeModal();
    }

    isMyPost(post) {
        const profileId = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
        return parseInt(post.userId, 10) === parseInt(profileId, 10);
    }

    deletePost(postId) {
        dataService.deletePost(postId,
            postdelete => redirectService.goTo('/feed'),
            error => console.warn(error));
    }

    updateFilterType({ target }) {
        this.setState({
            filterType: target.id
        });
    }

    // Render methods

    displayPosts() {
        return this.state.posts.map(post => {

            if (this.state.filterType !== 'all') {
                if (post.type === 'text' && this.state.filterType === 'text') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <TextPost onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} post={post} />
                        </Link>
                    </div>);
                }
                if (post.type === 'video' && this.state.filterType === 'video') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <VideoPost post={post} onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} />
                        </Link>
                    </div>);
                }
                if (post.type === 'image' && this.state.filterType === 'image') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <ImagePost post={post} onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} />
                        </Link>
                    </div>);
                }
            } else {
                if (post.type === 'text') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <TextPost onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} post={post} />
                        </Link>
                    </div>);
                }
                if (post.type === 'video') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <VideoPost post={post} onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} />
                        </Link>
                    </div>);
                }
                if (post.type === 'image') {
                    return (<div className="section center card-panel" key={post.id}>
                        <Link to={`/feed/${post.type}/${post.id}`} key={post.id}>
                            <ImagePost post={post} onPostDelete={this.deletePost} enableDelete={this.isMyPost(post)} />
                        </Link>
                    </div>);
                }
            }
            return null;
        });
    }

    displayFilter() {
        return (
            <div className="section right">
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

    displayModal() {

        const style = {
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

        if (this.state.modalType === 'text') {
            return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={style}
                >
                    <div className="row">
                        <div className="col s12 row section modal-format">
                            <h4 className="col s10">NEW TEXT POST</h4>
                            <p className="col s2">
                                <span className="right"><i style={{ cursor: 'pointer' }} onClick={this.closeModal} className="material-icons">close</i></span>
                            </p>
                        </div>
                        <form className="col s12">
                            <div className="row modal-format">
                                <div className="input-field col s12">
                                    <textarea id="text" className="materialize-textarea" onChange={this.valueHandler} value={this.state.postContent} ></textarea>
                                    <label htmlFor="text">Post Content</label>
                                </div>
                                <div className="input-field col s12 ">
                                    <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={this.submitForm}>POST
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            );
        }
        if (this.state.modalType === 'image') {
            return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={style}
                >
                    <div className="row">
                        <div className="col s12 row section modal-format">
                            <h4 className="col s10">NEW IMAGE POST</h4>
                            <p className="col s2">
                                <span className="right"><i style={{ cursor: 'pointer' }} onClick={this.closeModal} className="material-icons">close</i></span>
                            </p>
                        </div>
                        <form className="col s12">
                            <div className="row modal-format">
                                <div className="input-field col s12">
                                    <input type="text" id="image" onChange={this.valueHandler} value={this.state.imageContent} />
                                    <label htmlFor="image">Image link</label>
                                </div>
                                <div className="input-field col s12 ">
                                    <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={this.submitForm}>POST
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            );
        }
        if (this.state.modalType === 'video') {
            return (
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={style}
                >
                    <div className="row">
                        <div className="col s12 row section modal-format">
                            <h4 className="col s10">NEW VIDEO POST</h4>
                            <p className="col s2">
                                <span className="right"><i style={{ cursor: 'pointer' }} onClick={this.closeModal} className="material-icons">close</i></span>
                            </p>
                        </div>
                        <form className="col s12">
                            <div className="row modal-format">
                                <div className="input-field col s12">
                                    <input type="text" id="video" onChange={this.valueHandler} value={this.state.videoContent} />
                                    <label htmlFor="video">YouTube video link</label>
                                </div>
                                <div className="input-field col s12 ">
                                    <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={this.submitForm}>POST
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            );
        }
    }

    //Modal methods
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
                            loader={<div className="preloader-wrapper big active loader">
                                <div className="spinner-layer">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div><div className="gap-patch">
                                        <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>}
                            useWindow={true}
                        >
                            {this.displayPosts()}
                        </InfiniteScroll>
                        {this.displayModal()}
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