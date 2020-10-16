import React,{Component} from 'react';
import ReactWebMediaPlayer from 'react-web-media-player';

import * as actions from '../../store/index';

import CircularProfileItem from '../../components/CircularProfileItem/CircularProfileItem';
import Comment from '../Comment/Comment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import {MoreHoriz,FavoriteBorder,Favorite,ChatBubbleOutline,Send,Bookmark,BookmarkBorder} from '@material-ui/icons';

import Button from 'react-bootstrap/Button';

import classes from './FeedDetailCard.module.css';

class FeedDetailCard extends Component {
    state = {
        openOptionModal: false,
        commentPostEnabled: false,
        commentText: "",
        isFollowing: false,
        replyMode: false,
        replyCommentId: null,
        replyTo: null,
    }

    componentDidMount() {
        console.log(`isFollowing: ${this.props.isFollowing}`);

        this.setState({
            isFollowing: this.props.isFollowing,
        })
    }

    handleFollowClick = () => {
        this.props.handleFollowClick();
        this.setState({
            isFollowing: this.props.isFollowing,
        });
    }

    switchToReplyMode = (commentId,commentorUserName) => {
        this.setState({
            commentText: "",
        });
        this.setState({
            replyMode: true,
            replyCommentId: commentId,
            commentText: `@${commentorUserName} `,
        });
    }

    render() {

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
                case 'goToPost': handleClose();
                    break;
                case 'cancel': handleClose();
                    break;
                default: 
                    break;
            }
        }

        const handleSubmit = () => {
            if(this.state.commentPostEnabled){
                if(this.state.replyMode){
                    this.props.submitReply(this.state.commentText,this.state.replyCommentId);
                } else {
                    this.props.submitComment(this.state.commentText);
                }
                this.setState({
                    commentText: "",
                    commentPostEnabled: false,
                });
            }
        }

        return (
            <div className={classes.FeedDetailCard}>
                <div className={classes.FeedImageSection}>
                    {
                        this.props.post.videoUrl !== null && this.props.post.videoUrl !== '' ? 
                            <ReactWebMediaPlayer 
                            className={classes.FeedVideo} 
                            height="595px" 
                            width="100%" 
                            video={this.props.post.videoUrl}
                            color="#fa0202" 
                            controls/>
                            : 
                        this.props.post.image !== null && this.props.post.image !== '' ?
                        <img className={classes.FeedImage} src={this.props.post.image} />
                            :
                        <img className={classes.FeedImage} src={this.props.post.imageUrl}/>
                    }
                </div>
                <div className={classes.FeedInfoSection}>
                    <div className={classes.FeedInfoTop}>
                        <div className={classes.ProfileImageContainer}><CircularProfileItem size="xsm" src={this.props.post.creator.profileImageUrl} haveBorder type={1} /></div>
                        <div className={classes.UserNameContainer}>
                            <div style={{fontSize:"16px",fontWeight:500}}>{this.props.post.creator.userName}</div>
                            <div style={{fontSize:"12px"}}>{this.props.post.title}</div>
                        </div>
                        <div className={classes.FollowAppeal}>
                            <Button variant="outline-danger" size="sm" onClick={this.props.handleFollowClick} >
                                { this.state.isFollowing ? "Following" : "Follow" }
                            </Button>
                        </div>
                        <div className={classes.FeedOptions}><MoreHoriz onClick={handleOpen} /></div>
                    </div>
                    <div className={classes.FeedInfoCommentArea}>
                        <div className={classes.FeedCommentItem} style={{borderBottom: "0.25px solid #ccc"}}>
                        <div className={classes.FeedCommentorProfileImage}>
                            <CircularProfileItem size="xxsm" src={this.props.post.creator.profileImageUrl} />
                        </div>
                            <div className={classes.FeedCommentContent}>
                                <div style={{fontSize:"15px",fontWeight:600}}>{this.props.post.creator.userName}</div>
                                <div style={{fontSize:"13px"}}>{this.props.post.content}</div>
                            </div>
                            <div className={classes.FeedCommentReview}></div>
                        </div>
                        {this.props.comments.map(comment => {
                            return (
                               <Comment 
                                    key={comment.id} 
                                    comment={comment} 
                                    currentUser={this.props.currentUser} 
                                    switchToReplyMode={this.switchToReplyMode}
                               />
                            );
                        })}
                    </div>
                    <div className={classes.FeedInfoReviewSection}>
                        <div className={classes.FeedInfoReview}>
                            <div className={classes.FeedInfoReviewIcons}>
                                <div className={classes.FeedInfoReviewIcon}>
                                    { this.props.isLiked ? <Favorite style={{color:"#f70509"}} onClick={this.props.handleLikeToggle} /> : <FavoriteBorder onClick={this.props.handleLikeToggle} /> }
                                </div>
                                <div className={classes.FeedInfoReviewIcon}><ChatBubbleOutline/></div>
                                <div className={classes.FeedInfoReviewIcon}><Send/></div>
                            </div>
                            <div className={classes.FeedInfoReviewGap}></div>
                            <div className={classes.FeedInfoSaveIcons}>
                            { this.props.isSaved ? <Bookmark onClick={this.props.handleSaveToggle} /> : <BookmarkBorder onClick={this.props.handleSaveToggle} /> }
                            </div>
                        </div>
                        <div className={classes.FeedInfoDetails}>
                        <div style={{textAlign:"start",padding:"0px 20px"}}>
                            {this.props.likeCount} likes
                        </div>
                        </div>
                        <div className={classes.CommentContainer}>
                            <input 
                                type="text" 
                                autoFocus={this.state.commentText.length > 0}
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
                    </div>
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
                            {/* <ListItem alignItems="center" style={{padding:"auto"}} autoFocus button onClick={() => handleListItemClick('goToPost')}>
                                <ListItemText inset primary="Go To Post" />
                            </ListItem> */}
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

// const mapStateToProps = state => {
//     return {
//         comments: state.cmt.comments,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchFeedComments: (feedId) => dispatch(actions.fetchFeedComments(feedId)),
//     }
// }


// export default connect(mapStateToProps,mapDispatchToProps)(FeedDetailCard);

export default FeedDetailCard;