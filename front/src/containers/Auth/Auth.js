import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import * as actions from '../../store/index';

import clsx from 'clsx';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Button from 'react-bootstrap/Button';

import Carousal from '../../components/Carousal/Carousal';

import StyledButton from '../../components/UI/StyledButton/StyledButton';


import classes from './Auth.module.css';



class Auth extends Component {
    state = {
        isLogin: true,
        justRegistered: false,
        authForm: {
            userName: {
                value: '',
                valid: false,
                touched: false,
            },
            email: {
                value: '',
                valid: false,
                touched: false,
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                show: false,
            },
            passwordConfirm: {
                value: '',
                valid: false,
                touched: false,
                show: false,
            }
        }
    };

    checkValidity = () => {
        if(this.state.isLogin){
            if(!this.state.authForm.userName.valid){
                console.log('userName invalid');
                return false;
            }
            else if(!this.state.authForm.password.valid){
                console.log('password invalid');
                return false;
            }
        } else {
            if(!this.state.authForm.userName.valid){
                console.log('userName invalid');
                return false;
            }
            else if(!this.state.authForm.email.valid){
                console.log('email invalid');
                return false;
            }
            else if(!this.state.authForm.password.valid){
                console.log('password invalid');
                return false;
            }
            else if(
                (!this.state.authForm.passwordConfirm.valid) ||
                this.state.authForm.passwordConfirm.value !== this.state.authForm.password.value
            ){
                console.log('password confirm invalid');
                return false;
            }
        }
        return true;
    }


    submitAuthForm = (event) => {
        event.preventDefault();
        const isValid = this.checkValidity();
        if(isValid){
            if(this.state.isLogin){
                this.props.authLogin(
                    this.state.authForm.userName.value,
                    this.state.authForm.password.value,
                );
                this.props.history.push("/");
            }
            else {
                this.props.authSignup(
                    this.state.authForm.userName.value,
                    this.state.authForm.email.value,
                    this.state.authForm.password.value,
                    this.state.authForm.passwordConfirm.value,
                );
                this.setState({
                    isLogin: true,
                    justRegistered: true,
                });
            }
        } else {
            console.log("Not Valid!");
        }
    }


    render() {

        const redirectToHome = this.props.isAuthenticated ? <Redirect to="/" from="/auth" /> : null;

        const useStyles = makeStyles((theme) => ({
            root: {
              display: 'flex',
              flexWrap: 'wrap',
            },
            margin: {
              margin: theme.spacing(1),
            },
            withoutLabel: {
              marginTop: theme.spacing(3),
            },
            textField: {
              width: '100%',
            },
        }));

        const switchAuthMode = () => {
            this.setState(prevState => {
                return {
                    isLogin: !prevState.isLogin,
                }
            });
        };


        const handleUserNameChange = (event) => {
            this.setState({
                authForm: {
                    ...this.state.authForm,
                    userName: {
                        ...this.state.authForm.userName,
                        value: event.target.value,
                        valid: event.target.value.length > 2,
                        touched: true,
                    }
                }
            });
        };

        const handleEmailChange = (event) => {
            this.setState({
                authForm: {
                    ...this.state.authForm,
                    email: {
                        ...this.state.authForm.email,
                        value: event.target.value,
                        valid: event.target.value.length > 4,
                        touched: true,
                    }
                }
            });
        };

        const handlePasswordChange = (event) => {
            this.setState({
                authForm: {
                    ...this.state.authForm,
                    password: {
                        ...this.state.authForm.password,
                        value: event.target.value,
                        valid: event.target.value.length > 8,
                        touched: true,
                    }
                }
            });
        };

        const handlePasswordConfirmChange = (event) => {
            this.setState({
                authForm: {
                    ...this.state.authForm,
                    passwordConfirm: {
                        ...this.state.authForm.passwordConfirm,
                        value: event.target.value,
                        valid: event.target.value === this.state.authForm.password.value,
                        touched: true,
                    }
                }
            });
        };

        
        const handleClickShowPassword = () => {
            // setValues({ ...values, showPassword: !values.showPassword });
            this.setState(previousState => {
                return {
                    authForm: {
                        ...this.state.authForm,
                        password: {
                            ...this.state.authForm.password,
                            show: !previousState.authForm.password.show,
                        }
                    }
                }
            });
        };

        const handleClickShowPasswordConfirm = () => {
            // setValues({ ...values, showPassword: !values.showPassword });
            this.setState(previousState => {
                return {
                    authForm: {
                        ...this.state.authForm,
                        passwordConfirm: {
                            ...this.state.authForm.passwordConfirm,
                            show: !previousState.authForm.passwordConfirm.show,
                        }
                    }
                }
            });
        };
    
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };    

        let authModeChangeText = (
            <div style={{width: "100%",textAlign:"start",marginTop:"20px"}}>
               <small> Already a member?</small> <small style={{color:"#00a1f7",cursor:"pointer"}} onClick={switchAuthMode}>Login</small>
            </div>
        );

        if(this.state.isLogin){
            authModeChangeText = (
                <div style={{width: "100%",textAlign:"start",marginTop:"20px"}}>
                    <small>Not a member?</small> <small style={{color:"#00a1f7",cursor:"pointer"}} onClick={switchAuthMode}>Sign Up</small>
                </div>
            )
        }

        return (
            <div className={classes.Auth}>
                {redirectToHome}
                <div className={classes.AuthCarousal}>
                    <div className={classes.CarousalContainer}>
                        <Carousal />
                    </div>
                </div>
                <div className={classes.AuthForm}>
                <form onSubmit={event => this.submitAuthForm(event)}> 
                    <legend><h3 className={classes.Brand}>Outreach</h3></legend>
                    <TextField
                        key="userName"
                        id="outlined-basic" 
                        label="Username"
                        variant="outlined"
                        required
                        autoComplete="off"
                        error={!this.state.authForm.userName.valid && this.state.authForm.userName.touched}
                        fullWidth
                        placeholder="Username"
                        margin="normal"
                        value={this.state.authForm.userName.value}
                        onChange={event => handleUserNameChange(event)}
                    />
                    { this.state.isLogin ? null : 
                    <TextField
                        key="email"
                        id="outlined-basic" 
                        label="Email"
                        variant="outlined"
                        autoComplete="off"
                        error={!this.state.authForm.email.valid && this.state.authForm.email.touched}
                        fullWidth
                        placeholder="Email"
                        margin="normal"
                        value={this.state.authForm.email.value}
                        onChange={event => handleEmailChange(event)}
                    />}
                    <FormControl
                        key="password"
                        required
                        error={!this.state.authForm.password.valid && this.state.authForm.password.touched}
                        fullWidth margin="normal" className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={this.state.authForm.password.show ? 'text' : 'password'}
                            autoComplete="off"
                            value={this.state.authForm.password.value}
                            onChange={event => handlePasswordChange(event)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {this.state.authForm.password.show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>

                    { this.state.isLogin ? null :
                        <FormControl
                            key="passwordConfirm"
                            error={!this.state.authForm.passwordConfirm.valid && this.state.authForm.passwordConfirm.touched}
                            fullWidth margin="normal" className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password Confirm</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.authForm.passwordConfirm.show ? 'text' : 'password'}
                                autoComplete="off"
                                value={this.state.authForm.passwordConfirm.value}
                                onChange={event => handlePasswordConfirmChange(event)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordConfirm}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {this.state.authForm.passwordConfirm.show ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={135}
                            />
                        </FormControl>
                    }        
                    <div style={{width: "100%",textAlign:"start"}}>
                        <Button variant="dark" type="submit" style={{marginTop:"20px"}}>{this.state.isLogin ? "Login" : "Sign Up"}</Button>
                    </div>

                    {authModeChangeText}

                    {this.state.justRegistered && this.state.isLogin ? <div className={classes.JustRegisteredMessage}>Good to see you...<br /> Now just login with your new credentials.</div> : null}
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        justRegistered: state.auth.justRegistered,
        error: state.auth.error,
    };  
}

const mapDispatchToProps = dispatch => {
    return {
        authLogin: (userName,password) => dispatch(actions.authLogin(userName,password)),
        authSignup: (userName,email,password,passwordConfirm) => dispatch(actions.authSignup(userName,email,password,passwordConfirm)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);