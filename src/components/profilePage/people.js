import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { dataService } from '../../services/dataService';
import { PeoplePattern } from './PeoplePattern';
import Search from '../common/Search';


class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            filteredUsers: [],
            error: '',
            hasMore: true,
            pageNumber: 4
        };
    }

    searchHandler = searchString =>{
        const currentUsers = this.state.users;
        
        if (searchString === '') {
            this.setState({
                filteredUsers: currentUsers
            });
            return;
        }

        const filteredUsers = currentUsers.filter(
            item => {
                return item.name.includes(searchString);
            }
        );

        this.setState({ filteredUsers });
    }

    loadMoreUsers = page => {
        dataService.fetchUsers(
            users => {
                this.setState({
                    users,
                    filteredUsers: users
                });
            },
            error => {
                console.warn(error);
            },
            page * 5
        );

        if (page > this.state.pageNumber) {
            this.setState({ hasMore: false });
        }
    }

    render() {

        let items = this.state.filteredUsers.map(user => {
            return (
            <Link to={`/people/${user.id}`} key={user.id}>
                <PeoplePattern user={user} key={user.id} />
            </Link>);
        });

        return (
            <main className="container">
                <div className="row">
                    <div className="col s2"></div>
                    <div className="col s8">
                        <Search onSearchRequested={this.searchHandler} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s2"></div>
                    <div className="col s8">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMoreUsers}
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
                            {items}
                        </InfiniteScroll>
                    </div>
                    <div className="col s2"></div>

                </div>
            </main>
        );
    }
}

export default People;