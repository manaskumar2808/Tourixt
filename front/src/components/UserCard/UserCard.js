import React, {Component} from 'react';
import axios from '../../axios-follow';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import Button from 'react-bootstrap/Button';

import classes from './UserCard.module.css';

class UserCard extends Component {
    state = {
        isFollowing: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        axios.get(`${userId}/isfollower/${this.props.user}`)
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
            this.UnfollowUser(this.props.id);
        } else {
            this.followUser(this.props.id);
        }
    }

    followUser = (followedId) => {
        console.log(this.props.user);
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
                id: followedId,
                userName: this.props.userName,
                email: this.props.email,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                profileImageUrl: this.props.profileImageUrl,
                phoneNo: this.props.phoneNo,
                user: this.props.user,
            },
        }
        axios.post('follow/',followData)
        .then(response => {
            this.setState({
                isFollowing: true,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    UnfollowUser = (followedId) => {
        const userId = localStorage.getItem('userId');
        axios.delete(`${userId}/unfollow/${this.props.user}/`)
        .then(response => {
            this.setState({
                isFollowing: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className={classes.UserCard}>
                <CircularProfileItem  src={this.props.profileImageUrl}  size="sm" />
                <h6 style={{marginBottom:"0px"}}>{this.props.userName}</h6>
                <small>{this.props.firstName} {this.props.lastName}</small>
                <br />
                <div style={{height:"20px"}}></div>
                {this.state.isFollowing ? <Button variant="primary" size="md" onClick={this.handleFollowClick} >Unfollow</Button> : <Button variant="primary" size="md" onClick={this.handleFollowClick} >Follow</Button> }
            </div>
        );
    }
}

export default UserCard;