import React from 'react';
import { BITBOOK_INFO_1, BITBOOK_INFO_2 } from '../../constants';

const Welcome = () => {

    return (
        <div className='row'>
            <div className='col s12'>
                <h1 className='greeting-wave'>Welcome to BitBook</h1>
            </div>
            <div className='col s12'>
                <p className='flow-text'>{BITBOOK_INFO_1}</p>
                <p className='flow-text'>{BITBOOK_INFO_2}</p>
            </div>
        </div>
    );
};

export default Welcome;
