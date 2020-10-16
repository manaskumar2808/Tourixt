import React,{Component} from 'react';
import saveaxios from '../../axios-save';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route,Switch} from 'react-router';

import Account from '../Account/Account';
import * as actions from '../../store/index';

import CircularProfileItem from '../../components/CircularProfileItem/CircularProfileItem';
import UserListTile from '../../components/UserListTile/UserListTile';

import Button from 'react-bootstrap/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideocamIcon from '@material-ui/icons/Videocam';

import Modal from 'react-bootstrap/Modal';

import {GridOn,Theaters,Bookmark} from '@material-ui/icons';

import classes from './Profile.module.css';

class Profile extends Component {
    state = {
        showCases: [
            'posts',
            'tv',
            'saves',
        ],
        showCaseIndex: 0,
        saves: [],
        followList: [],
        showFollowerModal: false,
        showFollowedModal: false,
    }


    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.fetchCurrentUser();
        this.props.fetchUserPosts(userId);
        this.props.fetchFollowers();
        this.props.fetchFolloweds();
    }


    goToPost = (id) => {
        this.props.history.push(`/feed/${id}/`);
    }


    fetchSavedPosts = () => {
        const userId = localStorage.getItem('userId');
        saveaxios.get(`${userId}/saves/`)
        .then(response => {
            this.setState({
                saves: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleChange = (event,newValue) => {
        this.setState({
            value: newValue,
        });
    }

    setShowCase = (event,index) => {
        this.setState({
            showCaseIndex: index,
        });
    }


    showFollowList = (type) => {
        switch(type){
            case 'follower':
                this.setState({
                    showFollowerModal: true,
                })
                break;
            case 'followed':
                this.setState({
                    showFollowedModal: true,
                });
                break;
            default: 
                break;
        }
    }

    reFetchFollows = () => {
       this.props.fetchFollowers(); 
       this.props.fetchFolloweds();
    }
    

    render() {

        const showCasePostsClasses = [classes.ProfileShowCaseItem];
        const showCaseTVClasses = [classes.ProfileShowCaseItem];
        const showCaseSavesClasses = [classes.ProfileShowCaseItem];

        let showCase = null;

        let showCaseEmpty = (
            <div>
                <GridOn style={{fontSize: 60}} />
                <div>Your Posts Will Appear here</div>
            </div>
        );

        if(this.state.showCases[this.state.showCaseIndex]==='posts'){
            showCasePostsClasses.push(classes.ActiveShowCase);
            showCaseEmpty = (
                <div>
                    <GridOn style={{fontSize: 60}} />
                    <div>Your Posts Will <br /> Appear here</div>
                </div>
            );

            showCase = this.props.userPosts.length === 0 ? 
            (<div className={classes.ProfileShowCaseEmpty}>
                            {showCaseEmpty}  
                        </div>)  :
                    (<div className={classes.FeedGrid}>
                        <GridList cellHeight="auto" spacing={0} className={classes.gridList} cols={3}>
                            {this.props.userPosts.map((post) => (
                                <GridListTile key={post.id}>
                                    <div className={classes.FeedContainer} onClick={() => this.goToPost(post.id)}>
                                        {post.videoUrl !== null ? <video
                                            src={post.videoUrl}
                                            height={260}
                                            width={260}
                                            color="red"
                                            className={classes.FeedGridImage}
                                            /> 
                                        :
                                        post.image !== null && post.image !== '' ? 
                                        <img src={post.image} className={classes.FeedGridImage} alt={post.title} />
                                            :
                                        <img src={post.imageUrl} className={classes.FeedGridImage} alt={post.title} />
                                        }
                                    <div className={classes.Icon}>
                                           {post.videoUrl ? <VideocamIcon /> : <CameraAltIcon />} 
                                        </div>
                                    </div>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>);
        }
        if(this.state.showCases[this.state.showCaseIndex]==='tv'){
            showCaseTVClasses.push(classes.ActiveShowCase);
            showCaseEmpty = (
                <div>
                    <Theaters style={{fontSize: 60}} />
                    <div>
                        Your TV Content <br /> Will Appear here
                    </div>
                </div>
            );
            showCase=showCaseEmpty;
        }

        if(this.state.showCases[this.state.showCaseIndex]==='saves'){
            this.fetchSavedPosts();
            showCaseSavesClasses.push(classes.ActiveShowCase);
            showCaseEmpty = (
                <div>
                    <Bookmark style={{fontSize: 60}} />
                    <div>Your Saved Content <br /> Will Appear here</div>
                </div>
            );
            showCase = this.state.saves.length === 0 ? 
            (<div className={classes.ProfileShowCaseEmpty}>
                            {showCaseEmpty}  
                        </div>)  :
                    (<div className={classes.FeedGrid}>
                        <GridList cellHeight="auto" spacing={0} className={classes.gridList} cols={3}>
                            {this.state.saves.map((save) => (
                                <GridListTile key={save.feed.id}>
                                    <div className={classes.FeedContainer} onClick={() => this.goToPost(save.feed.id)}>
                                        {save.feed.videoUrl !== null ? <video
                                            src={save.feed.videoUrl}
                                            height={260}
                                            width={260}
                                            color="red"
                                            className={classes.FeedGridImage}
                                            /> 
                                        :
                                        save.feed.image !== null && save.feed.image !== '' ?
                                        <img src={save.feed.image} className={classes.FeedGridImage} alt={save.feed.title} />
                                            :
                                        <img src={save.feed.imageUrl} className={classes.FeedGridImage} alt={save.feed.title} />
                                        }
                                    <div className={classes.Icon}>
                                           {save.feed.videoUrl ? <VideocamIcon /> : <CameraAltIcon />} 
                                        </div>
                                    </div>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>);
        }

        const followerModal =  (<Modal show={this.state.showFollowerModal} onHide={() => this.setState({showFollowerModal: false})} scrollable>
                        <Modal.Header closeButton style={{textAlign:"center"}}>
                        <Modal.Title>Followers</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                {this.props.followers.map((item) => (
                                    <UserListTile key={item.id} user={item.follower} currentUser={this.props.currentUser} reFetchFollows={this.reFetchFollows} />
                                ))}
                            </Modal.Body>
                        </Modal>);

        const followedModal =  (<Modal show={this.state.showFollowedModal} onHide={() => this.setState({showFollowedModal: false})} scrollable>
                            <Modal.Header closeButton>
                            <Modal.Title>Following</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.props.followeds.map((item) => (
                               <UserListTile key={item.id} user={item.followed} currentUser={this.props.currentUser} reFetchFollows={this.reFetchFollows} />
                            ))}
                        </Modal.Body>
                        </Modal>);
        
        return (
            <div className={classes.ProfileContainer}>
            <div className={classes.ProfileLeft}></div>
            <div className={classes.Profile}>
                    <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <div className={classes.ProfileImageContainer}>
                                <img className={classes.ProfileImage} src={this.props.currentUser.profileImageUrl !== null ? this.props.currentUser.profileImageUrl : process.env.PUBLIC_URL+'/images/profile-default.png'} />
                            </div>
                        </ListItemAvatar>
                        <ListItemText
                        primary={
                            <div className={classes.ProfileUserName}>
                                <h1 style={{marginTop:"50px"}}>{this.props.currentUser.userName}</h1>
                            </div>
                        }
                        secondary={
                            <div style={{margin:"0px 0px"}}>
                                <h6>{this.props.currentUser.firstName ?? ''} {this.props.currentUser.lastName ?? ''}</h6>
                            </div>
                        }
                        />
                        <ListItemSecondaryAction>
                            <Button variant="dark" size="md" style={{marginLeft:"10px"}}>
                                <Link to={`${this.props.match.url}`+'info/'} style={{color: "white", textDecoration:"none"}}>Update</Link>
                            </Button>
                            <Button variant="danger" size="md" onClick={this.props.authLogout} style={{marginLeft:"10px"}}>Logout</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                    </List>

                    <div className={classes.ProfileInfo}>
                        <div style={{borderRight:"0.5px solid #ccc"}} className={classes.ProfileInfoItem}>
                            <div>
                                {this.props.userPosts.length}
                            </div>
                            <div>Posts</div>
                        </div>
                        <div className={classes.ProfileInfoItem}>
                            <div>
                                {this.props.followers.length}
                            </div>
                            <div onClick={() => this.showFollowList('follower')}>Followers</div>
                        </div>
                        <div style={{borderLeft:"0.5px solid #ccc"}} className={classes.ProfileInfoItem}>
                            <div>
                                {this.props.followeds.length}
                            </div>
                            <div onClick={() => this.showFollowList('followed')}>Following</div>
                        </div>
                    </div>

                    <div className={classes.ProfileShowCase}>
                        <div className={showCasePostsClasses.join(' ')} onClick={event => this.setShowCase(event,0)}>
                            <div><GridOn /></div>
                            <div>Posts</div>
                        </div>
                        <div className={showCaseTVClasses.join(' ')} onClick={event => this.setShowCase(event,1)}>
                            <div><Theaters /></div>
                            <div>TV</div>
                        </div>
                        <div className={showCaseSavesClasses.join(' ')} onClick={event => this.setShowCase(event,2)}>
                            <div><Bookmark /></div>
                            <div>Saves</div>
                        </div>
                    </div>
                    <div className={classes.ProfileShowCaseView}>
                        {showCase}
                    </div>
                    {followerModal}
                    {followedModal}
            </div>
            <div className={classes.ProfileRight}></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        currentUser: state.prf.currentUser,
        userPosts: state.pst.userPosts,
        followers: state.flw.followers,
        followeds: state.flw.followeds,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        fetchUserPosts: (id) => dispatch(actions.fetchUserPosts(id)),
        fetchFollowers: () => dispatch(actions.fetchFollowers()),
        fetchFolloweds: () => dispatch(actions.fetchFolloweds()),
        authLogout: () => dispatch(actions.authLogout()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);