import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactWebMediaPlayer from 'react-web-media-player';


import * as actions from '../../store/index';

import UserCard from '../../components/UserCard/UserCard';
import FeedDetailCard from '../../components/FeedDetailCard/FeedDetailCard';

import Modal from 'react-bootstrap/Modal';
import ModalDialogue from 'react-bootstrap/ModalDialog';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideocamIcon from '@material-ui/icons/Videocam';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Backdrop from '@material-ui/core/Backdrop';

import classes from './Explore.module.css';


const FeedModal = (props) => {
    return (
        <ModalDialogue centered contentClassName={classes.FeedModal}>
            <FeedDetailCard post={props.post} />
        </ModalDialogue>
    );
}




class Explore extends Component {
    state = {
        showFeedDetail: false,
        activePost: null,
    }

    componentDidMount() {
        this.props.fetchAllUsers();
    }


    goToPost = (id) => {
        this.props.history.push(`/feed/${id}/`);
    }

    render() {

        const handleShowFeed = (post) => {
            this.setState({
                activePost: post,
                showFeedDetail: true,
            });
        }

        const handleCloseFeed = () => {
            this.setState({
                showFeedDetail: false,
            });
        }

        const ExploreClasses = [classes.Explore];
        if(this.state.showFeedDetail){
            ExploreClasses.push(classes.Backdrop);
        }

        let feedModal = null;
        if(this.state.showFeedDetail){
            feedModal = <FeedModal show={this.state.showFeedDetail} onHide={handleCloseFeed} post={this.state.activePost} />;
        }

        return (
            <React.Fragment>
                <div className={ExploreClasses} onClick={handleCloseFeed}>
                    <div className={classes.UserList}>
                    {
                        this.props.users.map(user => {
                            return <UserCard 
                                key={user.id}
                                id={user.id}
                                userName={user.userName}
                                email={user.email}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                profileImageUrl={user.profileImageUrl}
                                phoneNo={user.phoneNo}
                                user={user.userId}
                                currentUser={this.props.currentUser}
                            />
                        })
                    }
                    </div>

                    <div className={classes.FeedGrid}>
                        <GridList cellHeight={260} spacing={0} className={classes.gridList} cols={3}>
                            {this.props.posts.map((post) => (
                                <GridListTile key={post.id} cols={1} rows={1} onClick={() => handleShowFeed(post)}>
                                    <div className={classes.Container}>
                                        <div className={classes.FeedContainer} onClick={() => this.goToPost(post.id)}>
                                            {post.videoUrl !== null && post.videoUrl !== '' ? <video
                                                            src={post.videoUrl}
                                                            height={250}
                                                            width={250}
                                                            className={classes.FeedGridImage}
                                                    ></video>
                                                    : 
                                            post.image !== null  && post.image !== '' ?
                                            <img src={post.image} className={classes.FeedGridImage} alt={post.title} /> :
                                            <img src={post.imageUrl} className={classes.FeedGridImage} alt={post.title} />
                                            }

                                            <div className={classes.Icon}>
                                            {post.videoUrl ? <VideocamIcon /> : <CameraAltIcon />} 
                                            </div>
                                        </div>
                                    </div>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                {feedModal}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.prf.users,
        posts: state.pst.posts,
        currentUser: state.prf.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Explore);