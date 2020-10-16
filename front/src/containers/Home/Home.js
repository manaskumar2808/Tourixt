import React,{Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/index';

import Posts from '../posts/posts';
import UserDisplay from '../../components/UserDisplay/UserDisplay';
import CircularProfileItem from '../../components/CircularProfileItem/CircularProfileItem';

import classes from './Home.module.css';


class Home extends Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
        this.props.fetchAllUsers();
    }

    goToPost = (id) => {
        this.props.history.push(`feed/${id}/`);
    }

    submitComment = (commentText,feedId) => {
        const userId = localStorage.getItem('userId');
        const comment = {
            text: commentText,
            status: 'direct',
            commentor: {
                userName: this.props.currentUser.userName,
                email: this.props.currentUser.email,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName,
                phoneNo: this.props.currentUser.phoneNo,
                profileImageUrl: this.props.currentUser.profileImageUrl,
                user: userId,
            },
            feed: feedId,
        }
        this.props.addComment(comment);
    }


    render() {
        let posts = null;
        if(this.props.isAuthenticated){
            posts = <Posts goToPost={this.goToPost} submitComment={this.submitComment} currentUser={this.props.currentUser} />
        }
        return (
            <div className={classes.Home}>
                <div className={classes.LeftSection}>

                </div>
                <div className={classes.ContentSection}>
                    <div className={classes.StoryBar}>
                        {this.props.users.map(user => {
                            return (
                                <div key={user.id} className={classes.StoryBarItem}>
                                    <CircularProfileItem src={user.profileImageUrl} haveBorder type={1} size="story" />
                                    <div className={classes.StoryBarItemUserName}>{user.userName}</div>
                                </div>
                            );
                        })}
                    </div>
                    {posts}
                </div>
                <div className={classes.RightSection}>
                    <UserDisplay 
                        profileImageUrl={this.props.currentUser.profileImageUrl} 
                        userName={this.props.currentUser.userName}
                        email={this.props.currentUser.email}
                        firstName={this.props.currentUser.firstName}
                        lastName={this.props.currentUser.lastName}
                        phoneNo={this.props.currentUser.phoneNo}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        currentUser: state.prf.currentUser,
        users: state.prf.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        addComment: (id) => dispatch(actions.addComment(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);