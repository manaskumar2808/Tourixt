import React,{Component} from 'react';
import ReactPlayer from 'react-player';
import ReactWebMediaPlayer from 'react-web-media-player';
import Youtube from 'react-youtube';
import {Player} from 'video-react';

import {connect} from 'react-redux';
import axios from '../../axios-config';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Add} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Button from 'react-bootstrap/Button';

import StyledButton from '../../components/UI/StyledButton/StyledButton';

import classes from './PostFeed.module.css';

class PostFeed extends Component {
    state={
        postForm: {
            title: {
                value: '',
                valid: false,
                touched: false,
            },
            content: {
                value: '',
                valid: false,
                touched: false,
            },
            image: {
                value: null,
                src: '',
                valid: true,
                touched: false,
            },
            imageUrl: {
                value: '',
                valid: false,
                touched: false,
            },
            videoUrl: {
                value: '',
                valid: false,
                touched: false,
            },
        }
    }

    checkValidity = () => {
        if(!this.state.postForm.title.valid && this.state.postForm.title.touched)
            return false;
        else if(!this.state.postForm.content.valid && this.state.postForm.content.touched)
            return false;
        else if(!this.state.postForm.imageUrl.valid && this.state.postForm.imageUrl.touched)
            return false;
        else if(!this.state.postForm.videoUrl.valid && this.state.postForm.videoUrl.touched)
            return false;
        else
            return true;
    }

    setImageFile = (event) => {

        const imageFile = event.target.files[0];
        // let reader = new FileReader();
        // const url = reader.readAsDataURL(image);
        const url = URL.createObjectURL(imageFile);

        this.setState({
            postForm: {
                ...this.state.postForm,
                image: {
                    value: imageFile,
                    src: url,
                    valid: true,
                    touched: true,
                },
            },
        });

        console.log(this.state.postForm.image.value);
    }

    submitPostForm = (event) => {
        event.preventDefault();
        const isValid = this.checkValidity();
        if(isValid){
            console.log("Post Form valid");
            console.log(this.state.postForm);
            const postData = {
                title: this.state.postForm.title.value,
                content: this.state.postForm.content.value,
                image: this.state.postForm.image.value,
                imageUrl: this.state.postForm.imageUrl.value,
                videoUrl: this.state.postForm.videoUrl.value,
                creator: {
                    userName: this.props.currentUser.userName,
                    email: this.props.currentUser.email,
                    firstName: this.props.currentUser.firstName,
                    lastName: this.props.currentUser.lastName,
                    phoneNo: this.props.currentUser.phoneNo,
                    profileImageUrl: this.props.currentUser.profileImageUrl,
                    user: localStorage.getItem('userId'),
                },
            };

            let formData = new FormData();
            formData.append('title',postData.title);
            formData.append('content',postData.content);
            formData.append('imageUrl',postData.imageUrl);
            formData.append('videoUrl',postData.videoUrl);
            formData.append('creator',postData.creator);
            formData.append('image',postData.image,this.state.postForm.image.src);

            axios.post('create/',formData,{
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                }
            )
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
                console.log(error);
            });
        } else {
            console.log("Post Form invalid!");
        }
    }


    render() {

        return (
            <div className={classes.PostFeed}>
                <div className={classes.PostFeedContainer}>
                    <div className={classes.PostImagePreviewContainer}>
                        { this.state.postForm.videoUrl.valid && this.state.postForm.videoUrl.value.length > 0 ? 
                            <ReactWebMediaPlayer
                                className={classes.PostVideoPreview} 
                                video={this.state.postForm.videoUrl.value}
                                height="545px" 
                                width="100%" 
                                color="#fa0202" 
                                controls
                            />
                            // <Youtube 
                            //     videoId="K9OckN0yR_E"
                            //     // className={classes.PostVideoPreview} 
                            //     // containerClassName={classes.PostImagePreviewContainer}
                            //     opts={opts}
                            // />
                            // <ReactPlayer
                            //     url={this.state.postForm.videoUrl.value}
                            //     width="100%"
                            //     height="100%"
                            // />
                            // <Player>
                            //     <source src={this.state.postForm.videoUrl.value} />
                            // </Player>
                            : 
                        this.state.postForm.image.value != null && this.state.postForm.image.src !== '' ? 
                        <img 
                            className={classes.PostImagePreview} 
                            src={this.state.postForm.image.src} 
                        /> 
                            :
                        this.state.postForm.imageUrl.valid && this.state.postForm.imageUrl.value.length > 0 ? 
                        <img 
                            className={classes.PostImagePreview} 
                            src={this.state.postForm.imageUrl.value}
                        />
                            : 
                        <div 
                            style={{
                                height:"40px",
                                width:"40px",
                                position:"absolute",
                                top:"45%",
                                left:"45%"
                            }}>
                            <Add style={{color: "white",fontSize: "40px"}} />
                        </div>
                        }
                    </div>
                    <div className={classes.PostFormContainer}>
                    <form onSubmit={event => this.submitPostForm(event)}>
                        <div style={{width: "100%"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Title" 
                                error={!this.state.postForm.title.valid && this.state.postForm.title.touched}
                                helperText="Title should have atleast 3 characters"
                                autoComplete="off"
                                dense="true"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text" 
                                placeholder="Title" 
                                name="Title" 
                                value={this.state.postForm.title.value} 
                                onChange={event => this.setState({
                                    postForm: {
                                        ...this.state.postForm,
                                        title: {
                                            value: event.target.value,
                                            valid: event.target.value.length > 3,
                                            touched: true,
                                        },
                                    }
                                })} 
                            />  
                        </div>
                        <div style={{width: "100%"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Content" 
                                error={!this.state.postForm.content.valid && this.state.postForm.content.touched}
                                autoComplete="off"
                                dense="true"
                                variant="outlined" 
                                fullWidth
                                margin="normal"
                                type="text"
                                placeholder="Content"
                                name="content"
                                value={this.state.postForm.content.value}
                                onChange={event => this.setState({
                                    postForm: {
                                        ...this.state.postForm,
                                        content: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        }
                                    }
                                })}    
                            /> 
                        </div>
                        <div style={{width: "100%"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Feed Image URL" 
                                error={!this.state.postForm.imageUrl.valid && this.state.postForm.imageUrl.touched}
                                autoComplete="off"
                                dense="true"
                                helperText="Should be a valid image URL"
                                variant="outlined" 
                                fullWidth
                                margin="normal"
                                type="text"
                                placeholder="Feed Image URL"
                                name="feedImageUrl"
                                value={this.state.postForm.imageUrl.value}
                                onChange={event => this.setState({
                                    postForm: {
                                        ...this.state.postForm,
                                        imageUrl: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        }
                                    }  
                                })}    
                            /> 
                        </div>
                        <div style={{width: "100%"}}>
                            <TextField 
                                id="outlined-basic" 
                                label="Feed Video URL" 
                                error={!this.state.postForm.videoUrl.valid && this.state.postForm.videoUrl.touched}
                                autoComplete="off"
                                dense="true"
                                helperText="Should be a valid video URL"
                                variant="outlined" 
                                fullWidth
                                margin="normal"
                                type="text"
                                placeholder="Feed Video URL"
                                name="feedVideoUrl"
                                value={this.state.postForm.videoUrl.value}
                                onChange={event => this.setState({
                                    postForm: {
                                        ...this.state.postForm,
                                        videoUrl: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        }
                                    }  
                                })}    
                            /> 
                        </div>
                        <div className={classes.UploadSection}>
                            <input 
                                accept="image/*" 
                                className={classes.FileInput} 
                                id="icon-button-file" 
                                type="file" 
                                onChange={this.setImageFile}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton style={{color:"black"}} aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>
                        <div style={{width: "100%",textAlign:"start"}}>
                            <Button variant="primary" type="submit" size="md" block>Post</Button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        currentUser: state.prf.currentUser,
    }
}


export default connect(mapStateToProps)(PostFeed);