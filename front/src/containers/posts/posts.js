import React,{Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/index';

import Post from '../../components/post/post';

import Spinner from 'react-bootstrap/Spinner';

import classes from './posts.module.css';

class Posts extends Component {

    componentDidMount() {
        this.props.initPosts();
        this.props.fetchPosts();
    }        

    render() {
        return (
            <div className={classes.Posts}>
               {this.props.posts.map(post => {
                    return (
                        <Post 
                            key={post.key} 
                            id={post.id} 
                            title={post.title} 
                            content={post.content}
                            image={post.image} 
                            imageUrl={post.imageUrl} 
                            videoUrl={post.videoUrl}
                            creator={post.creator} 
                            goToPost={this.props.goToPost}
                            submitComment={this.props.submitComment}
                            currentUser={this.props.currentUser}
                            isLoading={this.props.isLoading}
                        />
                    )})
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.pst.posts,
        isLoading: state.pst.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initPosts: () => dispatch(actions.initPosts()),
        fetchPosts: () => dispatch(actions.fetchPosts()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);