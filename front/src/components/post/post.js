import React,{Component} from 'react';
import ReactPlayer from 'react-player';
import ReactWebMediaPlayer from 'react-web-media-player';
import {Player} from 'video-react';

import followaxios from '../../axios-follow';
import likeaxios from '../../axios-like';
import saveaxios from '../../axios-save';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import Skeleton from '@material-ui/lab/Skeleton';
import {FavoriteBorder,Favorite,ChatBubbleOutline,Send,Bookmark,BookmarkBorder,MoreHoriz} from '@material-ui/icons';

import Button from 'react-bootstrap/Button';

import classes from './post.module.css';  

class Post extends Component {
    state = {
        source: null,
        openOptionModal: false,
        commentPostEnabled: false,
        commentText: "",
        isLiked: false,
        likeCount: 0,
        isSaved: false,
        isFollowing: false,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');

        this.setLikesCount();
        likeaxios.get(`${this.props.id}/likes/${userId}/`)
        .then(response => {
            this.setState({
                isLiked: response.data.isLiked,
            });
        }).catch(error => {
            console.log(error);
        });

        saveaxios.get(`${this.props.id}/saves/${userId}/`)
        .then(response => {
            this.setState({
                isSaved: response.data.isSaved,
            });
        }).catch(error => {
            console.log(error);
        });

        followaxios.get(`${userId}/isfollower/${this.props.creator.user}`)
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
                id: this.props.creator.id,
                userName: this.props.creator.userName,
                email: this.props.creator.email,
                firstName: this.props.creator.firstName,
                lastName: this.props.creator.lastName,
                profileImageUrl: this.props.creator.profileImageUrl,
                phoneNo: this.props.creator.phoneNo,
                user: this.props.creator.user,
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
        followaxios.delete(`${userId}/unfollow/${this.props.creator.user}/`)
        .then(response => {
            this.setState({
                isFollowing: false,
            });
        }).catch(error => {
            console.log(error);
        });
    }


    handleLikeToggle = () => {
        const userId = localStorage.getItem('userId');

        if(this.state.isLiked){
            likeaxios.delete(`${this.props.id}/unlike/${userId}`)
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
                feed: this.props.id,
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
        likeaxios.get(`${this.props.id}/likes/count/`)
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

        if(this.state.isSaved){
            saveaxios.delete(`${this.props.id}/unsave/${userId}`)
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
                    id: this.props.id,
                    title: this.props.title,
                    content: this.props.content,
                    creator: this.props.creator,
                    imageUrl: this.props.imageUrl,
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


    render() { 
        let imageSrc = "https://media.gettyimages.com/photos/japanese-garden-with-footbridge-at-the-imperial-palace-gardens-tokyo-picture-id510991305?s=2048x2048";
        if(this.props.imageUrl !== null){
            imageSrc = this.props.imageUrl;
        }
        
        let placeholderSrc = "https://media.gettyimages.com/photos/japanese-garden-with-footbridge-at-the-imperial-palace-gardens-tokyo-picture-id510991305?s=2x2";
        
        let userName = 'Manas';
        let email = '';
        let firstName = '';
        let lastName = '';
        let profileImageUrl = 'https://media.gettyimages.com/photos/japanese-garden-with-footbridge-at-the-imperial-palace-gardens-tokyo-picture-id510991305?s=2048x2048';
        
        if(this.props.creator !== null){
            userName = this.props.creator.userName;
            email = this.props.creator.email;
            profileImageUrl = this.props.creator.profileImageUrl;
        }

        


        const handleClose = () => {
            this.setState({
                openOptionModal: false,
            });
        }

        const handleOpen = () => {
            this.setState({
                openOptionModal: true,
            });
        }

        const handleListItemClick = (item) => {
            switch(item){
                case 'goToPost': 
                    this.props.goToPost(this.props.id);
                    // this.props.history.location.push(`feed/${this.props.feedId}/`);
                    break;
                case 'cancel': handleClose();
                    break;
                default: 
                    break;
            }
        }

        const handleSubmit = () => {
            if(this.state.commentPostEnabled){
                this.props.submitComment(this.state.commentText,this.props.id);
                this.setState({
                    commentText: "",
                    commentPostEnabled: false,
                });
            }
        }

        const likeButtonClasses = [classes.FeedReviewIcon, classes.LikeIcon];
    

        return (
            <div className={classes.Post}>          
                <div className={classes.FeedInfoTop}>
                    <div className={classes.ProfileImageContainer}>
                        <CircularProfileItem src={profileImageUrl} isLoading={this.props.isLoading} haveBorder size="xsm" type={1} />
                    </div>
                    <div className={classes.UserNameContainer}>
                        <div style={{fontSize:"16px",fontWeight:"500"}}>{userName}</div>
                        <div style={{fontSize:"12px"}}>{this.props.title}</div>
                    </div>
                    <div className={classes.FollowAppeal}>
                        <Button variant="outline-danger" size="sm" onClick={this.handleFollowClick}>
                            { this.state.isFollowing ? "Following" : "Follow" }
                        </Button>
                    </div>
                    <div className={classes.FeedOptions}><MoreHoriz onClick={handleOpen} /></div>
                </div>
                <div className={classes.PostImageContainer}>
                    {
                        this.props.videoUrl !== null && this.props.videoUrl !== '' ? 
                         <ReactWebMediaPlayer 
                            className={classes.PostVideo} 
                            height="415px" 
                            width="100%" 
                            video={this.props.videoUrl} 
                            color="#fa0202"
                        />
                        // <Player fluid={false} width="100%" height="100%">
                        //     <source src={this.props.videoUrl}  />
                        // </Player>
                         :
                        this.props.image !== null && this.props.image !== '' ? 
                        <img className={classes.PostImage} src={this.props.image}  />
                            :
                        <img className={classes.PostImage} src={this.props.imageUrl}/>
                    }
                </div>
                <div className={classes.FeedReviewSection}>
                    <div style={{display:"inline-flex",width:"25%"}}>
                        <div className={likeButtonClasses.join(' ')}>
                            { this.state.isLiked ? <Favorite style={{color:"#f70509"}} onClick={this.handleLikeToggle} /> : <FavoriteBorder onClick={this.handleLikeToggle} /> }
                        </div>
                        <div className={classes.FeedReviewIcon}>
                                <ChatBubbleOutline onClick={() => this.props.goToPost(this.props.id)} />
                        </div>
                        <div className={classes.FeedReviewIcon}>
                                <Send />
                        </div>
                    </div>
                    <div style={{display:"inline-flex",width:"75%",textAlign:"end",justifyContent:"end"}}>
                        <div className={classes.FeedReviewIconGap}></div>
                        <div className={classes.FeedReviewIcon}>
                        { this.state.isSaved ? <Bookmark onClick={this.handleSaveToggle} /> : <BookmarkBorder onClick={this.handleSaveToggle} /> }
                        </div>
                    </div>
                </div>
                <div style={{textAlign:"start",padding:"0px 20px"}}>
                    {this.state.likeCount} likes
                </div>
                <div className={classes.FeedInfoSection}>
                    <div className={classes.FeedCommentItem}>
                        <div className={classes.FeedCommentContent}>
                            <b>{userName} </b>{this.props.content}
                        </div>
                        <div className={classes.FeedCommentReview}>
                            <FavoriteBorder style={{fontSize: "12px"}} />
                        </div>
                    </div>
                        
                    {/* {this.props.latestComments.map(comment => {
                        return (
                            <div className={classes.FeedCommentItem}>
                                <div className={classes.FeedCommentContent}>
                                <b>{comment.commentor.userName}</b> {comment.text}
                                </div>
                                <div className={classes.FeedCommentReview}>
                                    <FavoriteBorder style={{fontSize: "12px"}} />
                                </div>
                            </div>
                        );
                    })} */}
                </div>
                <div>
                    {this.state.source !== null ? "loaded" : null}
                </div>
                <div className={classes.CommentContainer}>
                <input 
                    type="text" 
                    className={classes.CommentInput} 
                    placeholder="Add Your Comment"
                    value = {this.state.commentText}
                    onChange = {event => this.setState({
                        commentText: event.target.value,
                        commentPostEnabled: event.target.value.trim().length > 0,
                    })} 
                />
                <div className={classes.CommentPost}><Button variant="outline-primary" onClick={handleSubmit} disabled={!this.state.commentPostEnabled} style={{border:"none"}}>Post</Button></div>
                </div>
                <div className={classes.feedModal}>
                    <Dialog onClose={handleClose} style={{width: "400px",margin:"auto"}} fullWidth maxWidth="sm" aria-labelledby="simple-dialog-title" open={this.state.openOptionModal}>
                        <List dense style={{textAlign:"center"}}>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('reportInappropriate')}>
                                <ListItemText style={{color:"red"}} inset primary="Report Inappropriate" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('unfollow')}>
                                <ListItemText style={{color:"red"}} inset primary="Unfollow" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('goToPost')}>
                                <ListItemText inset primary="Go To Post" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('share')}>
                                <ListItemText inset primary="Share" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('copyLink')}>
                                <ListItemText inset primary="Copy Link" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('embed')}>
                                <ListItemText inset primary="Embed" />
                            </ListItem>
                            <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('cancel')}>
                                <ListItemText inset primary="Cancel" />
                            </ListItem>
                        </List>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default Post;