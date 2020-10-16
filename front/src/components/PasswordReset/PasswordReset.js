import React,{Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import {Lock} from '@material-ui/icons';

import classes from './PasswordReset.module.css';

class PasswordReset extends Component{
    state = {
        passwordResetForm: {
            oldPassword: {
                value: null,
                valid: false,
                touched: false,
            },
            newPassword: {
                value: null,
                valid: false,
                touched: false,
            },
            newPasswordConfirm: {
                value: null,
                valid: false,
                touched: false,
            }
        },
        formValid: false,
    }

    render() {
        return (
            <div className={classes.PasswordReset}>
                <form>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}></div>
                    <div className={classes.FieldPart} style={{marginTop: "20px"}}>
                        <Lock style={{fontSize: "80px"}} />
                    </div>
                </div>    
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Old Password</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.passwordResetForm.oldPassword.value}
                            error={!this.state.passwordResetForm.oldPassword.valid && this.state.passwordResetForm.oldPassword.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                passwordResetForm: {
                                    ...this.state.passwordResetForm,
                                    oldPassword: {
                                       value: event.target.value,
                                       valid: true,
                                       touched: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div> 
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>New Password</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.passwordResetForm.newPassword.value}
                            error={!this.state.passwordResetForm.newPassword.valid && this.state.passwordResetForm.newPassword.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                passwordResetForm: {
                                    ...this.state.passwordResetForm,
                                    newPassword: {
                                       value: event.target.value,
                                       valid: true,
                                       touched: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>New Password Confirm</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.passwordResetForm.newPasswordConfirm.value}
                            error={!this.state.passwordResetForm.newPasswordConfirm.valid && this.state.passwordResetForm.newPasswordConfirm.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                passwordResetForm: {
                                    ...this.state.passwordResetForm,
                                    newPasswordConfirm: {
                                       value: event.target.value,
                                       valid: true,
                                       touched: true,
                                    }
                                }
                            })}
                        />
                    </div>
                </div>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}></div>
                    <div className={classes.FieldPart} style={{marginTop: "20px"}}>
                        <Button variant="dark" size="sm" type="submit">Reset</Button>
                    </div>
                </div>      
                </form>
            </div>
        );
    }
}

export default PasswordReset;