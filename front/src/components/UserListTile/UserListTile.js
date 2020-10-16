import React,{Component} from 'react';
import followaxios from '../../axios-follow';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import Button from 'react-bootstrap/Button';

import classes from './UserListTile.module.css';

class UserListTile extends Component {
    state = {
        isFollowing: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        followaxios.get(`${userId}/isfollower/${this.props.user.user}`)
        .then(response => {
            this.setState({
                isFollowing: response.data.isFollower,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handleFollowClick = () => {
        if(this.state.isFollowing){
            this.UnfollowUser();
        } else {
            this.followUser();
        }
    }

    followUser = () => {
        const userId = localStorage.getItem('userId');
        const followData = {
            follower: {
                id: this.props.currentUser.id,
                userName: this.props.currentUser.userName,
                email: this.props.currentUser.email,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName,
                profileImageUrl: this.props.currentUser.profileImageUrl,
                phoneNo: this.props.currentUser.phoneNo,
                user: userId,
            },
            followed: {
                id: this.props.user.id,
                userName: this.props.user.userName,
                email: this.props.user.email,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                profileImageUrl: this.props.user.profileImageUrl,
                phoneNo: this.props.user.phoneNo,
                user: this.props.user.user,
            },
        }
        followaxios.post('follow/',followData)
        .then(response => {
            this.setState({
                isFollowing: true,
            });
            this.props.reFetchFollows();
        }).catch(error => {
            console.log(error);
        });
    }

    UnfollowUser = () => {
        const userId = localStorage.getItem('userId');
        followaxios.delete(`${userId}/unfollow/${this.props.user.user}/`)
        .then(response => {
            this.setState({
                isFollowing: false,
            });
            this.props.reFetchFollows();
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className={classes.UserListTile} key={this.props.user.id}>
                <div className={classes.UserListTileProfileImage}>
                    <CircularProfileItem src={this.props.user.profileImageUrl} size="xsm" />
                </div>
                <div className={classes.UserListTileUserName}>
                    <div style={{fontSize:"15px",fontWeight:500}}>{this.props.user.userName}</div>
                    <div style={{fontSize:"11px"}}>{this.props.user.firstName} {this.props.user.lastName}</div>
                </div>
                <div className={classes.UserListTileAction}>
                    <Button variant="primary" size="sm" onClick={this.handleFollowClick}>
                        {this.state.isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            </div>
        );
    }
}

export default UserListTile;