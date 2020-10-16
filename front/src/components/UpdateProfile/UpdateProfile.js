import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/index';

import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import classes from './UpdateProfile.module.css';

class UpdateProfile extends Component{
    state = {
        updateForm: {
            userName: {
                value: this.props.currentUser.userName,
                valid: true,
            },
            email: {
                value: this.props.currentUser.email,
                valid: true,
            },
            firstName: {
                value: this.props.currentUser.firstName,
                valid: true,
            },
            lastName: {
                value: this.props.currentUser.lastName,
                valid: true,
            },
            phoneNo: {
                value: this.props.currentUser.phoneNo,
                valid: true,
            },
            profileImageUrl: {
                value: this.props.currentUser.profileImageUrl,
                valid: true,
            }
        },
        formValid: false,
        updateDone: false,
    }


    checkValidity = () => {
        if(!this.state.updateForm.userName.valid){
            return false;
        } else if(!this.state.updateForm.email.valid){
            return false;
        } else if(!this.state.updateForm.firstName.valid){
            return false;
        } else if(!this.state.updateForm.lastName.valid){
            return false;
        } else if(!this.state.updateForm.phoneNo.valid){
            return false;
        } else if(!this.state.updateForm.profileImageUrl.valid) {
            return false;
        }
        return true;
    }

    updateUserProfile = (event) => {
        event.preventDefault();
        const isValid = this.checkValidity();
        if(isValid) {
            const newData = {
                userName: this.state.updateForm.userName.value,
                email: this.state.updateForm.email.value,
                firstName: this.state.updateForm.firstName.value,
                lastName: this.state.updateForm.lastName.value,
                phoneNo: this.state.updateForm.phoneNo.value,
                profileImageUrl: this.state.updateForm.profileImageUrl.value,
            }
            this.props.updateCurrentUser(newData);
            this.setState({
                updateDone: true,
            });
        }
    }

    
    
    render() {
        
        const Alert = (props) => {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        const handleClose = () => {
            this.setState({
                updateDone: false,
            });
        }

        return (
            <div className={classes.UpdateProfile}>
                <form onSubmit={event => this.updateUserProfile(event)}>
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <CircularProfileItem src={
                            this.state.updateForm.profileImageUrl.value == null ? 
                            this.props.currentUser.profileImageUrl : 
                            this.state.updateForm.profileImageUrl.value
                        } size="sm" />
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.profileImageUrl.value}
                            error={!this.state.updateForm.profileImageUrl.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    profileImageUrl: {
                                        value: event.target.value,
                                        valid: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div> 
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Username</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.userName.value}
                            error={!this.state.updateForm.userName.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    userName: {
                                        value: event.target.value,
                                        valid: event.target.value.length > 2,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Email</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.email.value}
                            error={!this.state.updateForm.email.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    email: {
                                        value: event.target.value,
                                        valid: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>First Name</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.firstName.value}
                            error={!this.state.updateForm.firstName.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    firstName: {
                                        value: event.target.value,
                                        valid: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div> 
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Last Name</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.lastName.value}
                            error={!this.state.updateForm.lastName.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    lastName: {
                                        value: event.target.value,
                                        valid: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Phone Number</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.updateForm.phoneNo.value}
                            error={!this.state.updateForm.phoneNo.valid}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                updateForm: {
                                    ...this.state.updateForm,
                                    phoneNo: {
                                        value: event.target.value,
                                        valid: event.target.value.length === 10 || event.target.value.length === 0,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        
                    </div>
                    <div className={classes.FieldPart} style={{marginTop: "20px"}}>
                        <Button variant="dark" size="sm" type="submit">Update</Button>
                    </div>
                </div>      
                </form>
                <Snackbar open={this.state.updateDone} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Profile Updated Successfully
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.prf.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCurrentUser: (newData) => dispatch(actions.updateCurrentUser(newData)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfile);