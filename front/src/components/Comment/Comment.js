import React,{Component} from 'react';
import {connect} from 'react-redux';
import likeaxios from '../../axios-like';
import commentaxios from '../../axios-comment';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';
import Reply from '../Reply/Reply';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

import classes from './Comment.module.css';

class Comment extends Component {
    state = {
        isLiked: false,
        likeCount: 0,
        showReplies: false,
        replies: [],
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        likeaxios.get(`${this.props.comment.id}/comment/likes/${userId}/`)
        .then(response => {
            this.setState({
                isLiked: response.data.isLiked,
            });
        }).catch(error => {
            console.log(error);
        });

        this.setLikesCount();
    }

    handleViewReplyToggle = () => {
        if(this.state.showReplies){
            this.setState({
                showReplies: false,
            });
        } else {
            commentaxios.get(`${this.props.comment.id}/replies/`)
            .then(response => {
                this.setReplies(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    setReplies = (replies) => {
        const loadedReplies = [];
        for(let key in replies){
            loadedReplies.push({
                id: replies[key].id,
                text: replies[key].text,
                comment: replies[key].comment,
                replier: replies[key].replier,
            });
        }
        this.setState({
            replies: loadedReplies,
            showReplies: true,
        });
    }


    handleLikeToggle = () => {
        const userId = localStorage.getItem('userId');

        if(this.state.isLiked){
            likeaxios.delete(`${this.props.comment.id}/comment/unlike/${userId}`)
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
                parent: 'comment',
                comment: this.props.comment.id,
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
        likeaxios.get(`${this.props.comment.id}/comment/likes/count/`)
        .then(response => {
            this.setState({
                likeCount: response.data.count,
            });
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        return (
            <div className={classes.Comment}>
                <div key={this.props.comment.id} className={classes.FeedCommentItem}>
                    <div className={classes.FeedCommentorProfileImage}>
                        <CircularProfileItem size="xxsm" src={this.props.comment.commentor.profileImageUrl} />
                    </div>
                    <div className={classes.FeedCommentContent}>
                        <div style={{fontSize:"14px",fontWeight:500}}>{this.props.comment.commentor.userName}</div>
                        <div style={{fontSize:"11px"}}>{this.props.comment.text}</div>
                    </div>
                    <div className={classes.FeedCommentReview}>
                        {
                            this.state.isLiked ? 
                            <Favorite style={{fontSize: "12px",color: "red"}} onClick={this.handleLikeToggle} />  : 
                            <FavoriteBorder style={{fontSize: "12px"}} onClick={this.handleLikeToggle} /> 
                        }
                    </div>
                </div>
                <div className={classes.CommentReview}>
                    <div className={classes.CommentReviewItem}></div>
                    <div className={classes.CommentReviewItem}>
                        {this.state.likeCount} {this.state.likeCount==1 ? "like" : "likes"}
                    </div>
                    <div className={classes.CommentReviewItem} onClick={() => this.props.switchToReplyMode(this.props.comment.id,this.props.comment.commentor.userName)}>
                        reply
                    </div>
                    <div className={classes.CommentReviewItem}></div>
                </div>
                <div className={classes.ViewRepliesButton} onClick={this.handleViewReplyToggle}>
                    ----- { this.state.showReplies ? "Hide Replies" : "View Replies" }
                </div>
                {this.state.showReplies ? 
                    <div className={classes.Replies}>
                        {this.state.replies.map(reply => {
                            return (
                                <Reply reply={reply} />
                            );
                        })}
                    </div> : 
                null}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect()(Comment);