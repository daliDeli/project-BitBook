import React, {Component} from 'react';
import { validationService } from '../../services/validationService';
import { dataService } from '../../services/dataService';
import { redirectService } from '../../services/redirectService';
import Profile from '../../entities/Profile';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            about: '',
            email: '',
            aboutShort: '',
            avatarUrl: ''
        };
    }

    updateSuccess(answer) {
        redirectService.reload();
    }

    updateValue = ({ target }) => {
        this.setState({
            [target.id]: target.value
        });
    }

    submitForm = event => {
        event.preventDefault();

        const { name, email, about, aboutShort, avatarUrl } = this.state;

        let modalData = { name, email, about, aboutShort, avatarUrl };

        let profile = new Profile(modalData); 
        
        let validated = validationService.validateEditProfile();

        if (validated === true) {
            dataService.updateProfile(profile, this.updateSuccess);        
        }
    }

    render() {
        return (
            <div className="login/register-form  col s6 container row">
                <div className='col s12 section edit-dialog'>
                    <h4 className=''>UPDATE PROFILE</h4>
                    <div className='divider'></div>
                </div>

                <form className="col s10 right" id="register-form" onSubmit={this.submitForm}>
                    <div className="input-field col s12">
                        <input id="name" type="text" required="" className="validate" onChange={this.updateValue} value={this.state.name} />
                        <label htmlFor="name">Name</label>
                        <span className="helper-text" data-error="Name is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" onChange={this.updateValue} value={this.state.email} />
                        <label htmlFor="email">Email</label>
                        <span className="helper-text" data-error="Invalid email format" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="about" type="text" className="validate" required="" onChange={this.updateValue} value={this.state.about} />
                        <label htmlFor="about">About</label>
                        <span className="helper-text" data-error="username is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="aboutShort" type="text" className="validate" required="" onChange={this.updateValue} value={this.state.aboutShort} />
                        <label htmlFor="aboutShort">Short About</label>
                        <span className="helper-text" data-error="username is required" data-success="success"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id="avatarUrl" type="text" className="validate" required="" onChange={this.updateValue} value={this.state.avatarUrl} />
                        <label htmlFor="avatarUrl">AvatarUrl</label>
                        <span className="helper-text" data-error="avatar should be an url to image" data-success="success"></span>
                    </div>
                    <button type="submit" className="btn waves-effect waves-light right">Update</button>
                </form>
            </div>
        );
    }
}