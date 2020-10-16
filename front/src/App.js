import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';

import * as actions from './store/index';

import Layout from './containers/layout/layout';
import Navigation from './components/Navigation/Navigation';

import Home from './containers/Home/Home';
import Explore from './containers/Explore/Explore';
import PostFeed from './containers/PostFeed/PostFeed';
import Activity from './containers/Activity/Activity';
import Profile from './containers/Profile/Profile';
import Account from './containers/Account/Account';
import Auth from './containers/Auth/Auth';
import FeedDetail from './containers/FeedDetail/FeedDetail';
import PostPlace from './containers/PostPlace/PostPlace';
import PlaceDetail from './containers/PlaceDetail/PlaceDetail';

import './App.css';

class App extends Component {
  componentDidMount() {
      this.props.authAutoLogin();
  }

  render() {
    let redirectToAuth = <Redirect  to="/auth/" exact component={Auth} />
    return (
      <div className="App">
        {!this.props.isAuthenticated ? redirectToAuth : null}
        <Layout>
          { this.props.isAuthenticated ? <Navigation /> : null }
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/explore/" exact component={Explore} />
            <Route path="/place/post/" exact component={PostPlace} />
            <Route path="/place/:id" exact component={PlaceDetail} />
            <Route path="/post/" exact component={PostFeed} />
            <Route path="/feed/:id/" exact component={FeedDetail} />
            <Route path="/activity/" exact component={Activity} />
            <Route path="/profile/" exact component={Profile} />
            <Route path="/profile/info/" exact component={Account} />
            <Route path="/auth/" exact component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    authAutoLogin: () => dispatch(actions.authAutoLogin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
