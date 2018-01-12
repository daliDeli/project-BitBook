import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IMG_PLACEHOLDER_ICON } from '../../constants';

class PeoplePattern extends Component {

    render() {

        const { name, aboutShort, avatarUrl, lastPostDate } = this.props.user;

        const image = avatarUrl ? avatarUrl : IMG_PLACEHOLDER_ICON ;

        return (
            <article className="section">
                <div className="row people-item valign-wrapper center">
                    <img src={image} alt='' className="col s2" />
                    <div className="col s8 row people-item-text">
                        <h5 className="col s12">{name}</h5>
                        <p className="col s12">{aboutShort}</p>
                    </div>
                    <div className='col s2'>
                        <div className='row people-item-text'>
                            <div className='col s12'><small>last login:</small></div>
                            <div className='col s12'>{new Date(lastPostDate).toDateString()}</div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

PeoplePattern.propTypes = {
    user: PropTypes.object
};

export default PeoplePattern;