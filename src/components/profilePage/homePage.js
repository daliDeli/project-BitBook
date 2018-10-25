import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../common/Header';
import Feed from '../feed/Feed';
import People from './People';
import ProfilePage from './Profile';
import SinglePostPage from '../feed/SinglePostPage';
import Footer from '../common/Footer';

export default class HomePage extends Component {

    render() {
        return (
            <div className='page-flexbox-wrapper'>
                <Header />
                <Switch>
                    <Redirect exact from="/" to="/feed" />
                    <Route exact path="/feed" component={Feed} />
                    <Route path="/feed/:type/:singleId" component={SinglePostPage} />
                    <Route exact path="/people" component={People} />
                    <Route path="/people/:id" component={ProfilePage} />
                    <Route path="/profile" component={ProfilePage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}