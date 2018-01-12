import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../common/header';
import Feed from '../feed/feed';
import People from './people';
import ProfilePage from './profile';
import SinglePostPage from '../feed/SinglePostPage';
import Footer from '../common/footer';

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