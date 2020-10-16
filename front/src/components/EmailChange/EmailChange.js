import React,{Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import {Email} from '@material-ui/icons';

import classes from './EmailChange.module.css';

class EmailChange extends Component{
    state = {
        emailChangeForm: {
            oldEmail: {
                value: null,
                valid: false,
                touched: false,
            },
            newEmail: {
                value: null,
                valid: false,
                touched: false,
            },
            newEmailConfirm: {
                value: null,
                valid: false,
                touched: false,
            }
        },
        formValid: false,
    }

    render() {
        return (
            <div className={classes.EmailChange}>
                <form>  
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}></div>
                    <div className={classes.FieldPart} style={{marginTop: "20px"}}>
                        <Email style={{fontSize: "80px"}} />
                    </div>
                </div>    
                <div className={classes.FormField}>
                    <div className={classes.LabelPart}>
                        <label>Old Email</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.emailChangeForm.oldEmail.value}
                            error={!this.state.emailChangeForm.oldEmail.valid && this.state.emailChangeForm.oldEmail.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                emailChangeForm: {
                                    ...this.state.emailChangeForm,
                                    oldEmail: {
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
                        <label>New Email</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.emailChangeForm.newEmail.value}
                            error={!this.state.emailChangeForm.newEmail.valid && this.state.emailChangeForm.newEmail.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                emailChangeForm: {
                                    ...this.state.emailChangeForm,
                                    newEmail: {
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
                        <label>New Email Confirm</label>
                    </div>
                    <div className={classes.FieldPart}>
                        <TextField
                            label={null}
                            id="outlined-margin-dense"
                            value={this.state.emailChangeForm.newEmailConfirm.value}
                            error={!this.state.emailChangeForm.newEmailConfirm.valid && this.state.emailChangeForm.newEmailConfirm.touched}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            onChange = {event => this.setState({
                                emailChangeForm: {
                                    ...this.state.emailChangeForm,
                                    newEmailConfirm: {
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
                        <Button variant="dark" size="sm" type="submit">Change</Button>
                    </div>
                </div>      
                </form>
            </div>
        );
    }
}

export default EmailChange;