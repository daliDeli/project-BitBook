import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { dataService } from '../../services/dataService';
import { IMG_PLACEHOLDER, SESSION_STORAGE_USER_KEY } from '../../constants';
import EditProfile from './EditProfile';


export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    // Initialization methods

    initState() {
        return {
            profile: {
                name: 'loading...',
                about: 'loading...',
                aboutShort: 'loading...',
                commentsCount: '0',
                postsCount: '0',
                avatarUrl: IMG_PLACEHOLDER,
                modalIsOpen: false,
                email: 'loading...',
                error: '',
                userId: 0
            }
        };
    }

    initModal() {
        Modal.setAppElement('body');        
    }

    bindEventHandlers() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    collectProfileInfo() {
        const userId = this.props.match.params.id;

        if (!userId) {
            dataService.fetchProfile(this.successProfile);
            return;
        }
        dataService.fetchUsersById(userId, this.successProfile);
    }

    successProfile = profile => {
        this.setState({ profile });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // lifecycle methods

    componentDidMount() {
        this.collectProfileInfo();
        this.initModal();
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.match.params.id !== nextProps.match.params.id) {
            dataService.fetchProfile(this.successProfile);
        }
    }

    // Render methods 

    renderModal() {

        const userId = this.props.match.params.id;
        const activeUser = sessionStorage.getItem(SESSION_STORAGE_USER_KEY);
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
                top: '100px',
                left: '100px',
                bottom: '100px',
                right: '100px',
                border: '1px solid #ccc',
                background: '#DAE2DF',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'

            }
        };

        if (!userId || userId === activeUser) {
            return (
                <article>
                    <button className="btn" onClick={this.openModal}>Edit Profile</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={style}
                    >
                        <EditProfile profile={this.newProfileData} />
                    </Modal>
                </article>
            );
        }
    }

    render() {

        const { avatarUrl, name, about, email, postsCount, commentsCount } = this.state.profile;
        const source = avatarUrl ? avatarUrl : IMG_PLACEHOLDER;
        const desc = about ? about : 'no info';

        return (
            <main className="center profilePage">
                <div>
                    <img src={source} style={{ 'width': '300px', 'marginTop': '20px' }} alt="" className="circle responsive-img" />
                    <div className=""><h2 className='center'>{name}</h2></div>
                </div>
                <div className='row'>
                    <div className='col s4 offset-s4'>
                        <div className='row profile-display z-depth-4'>
                            <div className='col s6'><span className='right'>About: </span></div>
                            <div className='col s6'><span className='left'>{desc}</span></div>
                            <div className='col s6'><span className='right'>Email: </span></div>
                            <div className='col s6'><span className='left'>{email}</span></div>
                            <div className='col s6'><span className='right'>Posts: </span></div>
                            <div className='col s6'><span className='left'>{postsCount}</span></div>
                            <div className='col s6'><span className='right'>Comments: </span></div>
                            <div className='col s6'><span className='left'>{commentsCount}</span></div>
                        </div>
                    </div>
                </div>
                <div className="col s12 section">
                    {this.renderModal()}
                </div>
            </main>
        );
    }
}

ProfilePage.propTypes = {
    match: PropTypes.object
};