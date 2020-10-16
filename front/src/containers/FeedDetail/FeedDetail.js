import React,{Component} from 'react';
import followaxios from '../../axios-follow';
import likeaxios from '../../axios-like';
import saveaxios from '../../axios-save';
import {connect} from 'react-redux';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import * as actions from '../../store/index';

import FeedDetailCard from '../../components/FeedDetailCard/FeedDetailCard';

import classes from './FeedDetail.module.css';
import UserDisplay from '../../components/UserDisplay/UserDisplay';

class FeedDetail extends Component {
    state = {
        openOptionModal: false,
        isLiked: false,
        likeCount: 0,
        isSaved: false,
        isFollowing: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        const feedId = this.props.match.params.id;
        this.props.fetchPost(feedId);
        this.props.fetchFeedComments(feedId);
        this.setLikesCount();

        likeaxios.get(`${feedId}/likes/${userId}/`)
        .then(response => {
            this.setState({
                isLiked: response.data.isLiked,
            });
        }).catch(error => {
            console.log(error);
        });

        saveaxios.get(`${feedId}/saves/${userId}/`)
        .then(response => {
            this.setState({
                isSaved: response.data.isSaved,
            });
        }).catch(error => {
            console.log(error);
        });

        followaxios.get(`${userId}/isfollower/${this.props.post.creator.user}/`)
        .then(response => {
            this.setState({
                isFollowing: response.data.isFollower,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    handleLikeToggle = () => {
        const userId = localStorage.getItem('userId');
        const feedId = this.props.match.params.id;
        if(this.state.isLiked){
            likeaxios.delete(`${feedId}/unlike/${userId}`)
            .then(response => {
                this.setState({
                    isLiked: false,
                });
                this.setLikesCount();
            }).catch(error => {
                console.log(error);
            });
        } else {
            const likeData = {
                parent: 'feed',
                feed: feedId,
                liker: {
                    userName: this.props.currentUser.userName,
                    email: this.props.currentUser.email,
                    firstName: this.props.currentUser.firstName,
                    lastName: this.props.currentUser.lastName,
                    profileImageUrl: this.props.currentUser.profileImageUrl,
                    phoneNo: this.props.currentUser.phoneNo,
                    user: userId,
                }
            }
            likeaxios.post('create/',likeData)
            .then(response => {
                this.setState({
                    isLiked: true,
                });
                this.setLikesCount();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    setLikesCount = () => {
        const feedId = this.props.match.params.id;
        likeaxios.get(`${feedId}/likes/count/`)
        .then(response => {
            this.setState({
                likeCount: response.data.count,
            });
        }).catch(error => {
            console.log(error);
        });
    } 
    
    

    handleSaveToggle = () => {
        const userId = localStorage.getItem('userId');
        const feedId = this.props.match.params.id;

        if(this.state.isSaved){
            saveaxios.delete(`${feedId}/unsave/${userId}`)
            .then(response => {
                this.setState({
                    isSaved: false,
                });
            }).catch(error => {
                console.log(error);
            });
        } else {
            const saveData = {
                parent: 'feed',
                feed: {
                    id: feedId,
                    title: this.props.post.title,
                    content: this.props.post.content,
                    creator: this.props.post.creator,
                    imageUrl: this.props.post.imageUrl,
                    image: this.props.post.image,
                },
                saver: {
                    userName: this.props.currentUser.userName,
                    email: this.props.currentUser.email,
                    firstName: this.props.currentUser.firstName,
                    lastName: this.props.currentUser.lastName,
                    profileImageUrl: this.props.currentUser.profileImageUrl,
                    phoneNo: this.props.currentUser.phoneNo,
                    user: userId,
                }
            }
            saveaxios.post('create/',saveData)
            .then(response => {
                this.setState({
                    isSaved: true,
                });
            }).catch(error => {
                console.log(error);
            })
        }

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
                id: this.props.post.creator.id,
                userName: this.props.post.creator.userName,
                email: this.props.post.creator.email,
                firstName: this.props.post.creator.firstName,
                lastName: this.props.post.creator.lastName,
                profileImageUrl: this.props.post.creator.profileImageUrl,
                phoneNo: this.props.post.creator.phoneNo,
                user: this.props.post.creator.user,
            },
        }
        followaxios.post('follow/',followData)
        .then(response => {
            this.setState({
                isFollowing: true,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    UnfollowUser = () => {
        const userId = localStorage.getItem('userId');
        followaxios.delete(`${userId}/unfollow/${this.props.post.creator.user}/`)
        .then(response => {
            this.setState({
                isFollowing: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }


    submitComment = (commentText) => {
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
            feed: this.props.post.id,
        }
        this.props.addComment(comment);
    }


    submitReply = (replyText,commentId) => {
        const userId = localStorage.getItem('userId');
        const reply = {
            text: replyText,
            replier: {
                userName: this.props.currentUser.userName,
                email: this.props.currentUser.email,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName,
                phoneNo: this.props.currentUser.phoneNo,
                profileImageUrl: this.props.currentUser.profileImageUrl,
                user: userId,
            },
            comment: commentId,
        }
        this.props.addReply(reply);
    }

    render() {
        return (
            <div className={classes.FeedDetail}>
                <div className={classes.BackButton}>
                    <ArrowBackIcon onClick={() => this.props.history.goBack()} />
                </div>
                <FeedDetailCard 
                    key={this.props.post.id}
                    post={this.props.post} 
                    comments={this.props.comments} 
                    currentUser={this.props.currentUser}
                    submitComment={this.submitComment}
                    submitReply={this.submitReply} 
                    handleLikeToggle={this.handleLikeToggle}
                    handleSaveToggle={this.handleSaveToggle}
                    handleFollowClick={this.handleFollowClick}
                    isLiked={this.state.isLiked}
                    likeCount={this.state.likeCount}
                    isSaved={this.state.isSaved}
                    isFollowing={this.state.isFollowing}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.prf.currentUser,
        post: state.pst.post,
        comments: state.cmt.comments,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPost: (id) => dispatch(actions.fetchPost(id)),
        fetchFeedComments: (feedId) => dispatch(actions.fetchFeedComments(feedId)),
        addComment: (comment) => dispatch(actions.addComment(comment)),
        addReply: (reply) => dispatch(actions.addReply(reply)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedDetail);