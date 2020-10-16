import React,{Component} from 'react';

import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import PasswordReset from '../../components/PasswordReset/PasswordReset';
import EmailChange from '../../components/EmailChange/EmailChange';

import classes from './Account.module.css';

class Account extends Component {
    state = {
        currentTabIndex: 0,
    }

    render() {
        const updateProfileTabClasses = [classes.AccountTab];
        const passwordResetTabClasses = [classes.AccountTab];
        const emailChangeTabClasses = [classes.AccountTab];
        const yourWebsiteTabClasses = [classes.AccountTab];

        let accountView = null;

        switch(this.state.currentTabIndex){
            case 0: updateProfileTabClasses.push(classes.SelectedTab);
                    accountView = <UpdateProfile />
                    break;
            case 1: passwordResetTabClasses.push(classes.SelectedTab);
                    accountView = <PasswordReset />
                    break;
            case 2: emailChangeTabClasses.push(classes.SelectedTab);
                    accountView = <EmailChange />
                    break;
            case 3: yourWebsiteTabClasses.push(classes.SelectedTab);
                    break;
            default:  
                    break;
        }

        return (
            <div className={classes.Account}>
               <div className={classes.AccountTabs}>
                   <div className={updateProfileTabClasses.join(' ')} onClick={() => this.setState({currentTabIndex: 0})}>Update Profile</div>
                   <div className={passwordResetTabClasses.join(' ')} onClick={() => this.setState({currentTabIndex: 1})}>Password Reset</div>
                   <div className={emailChangeTabClasses.join(' ')} onClick={() => this.setState({currentTabIndex: 2})}>Email Change</div>
                   <div className={yourWebsiteTabClasses.join(' ')} onClick={() => this.setState({currentTabIndex: 3})}>Your Website</div>
               </div>
               <div className={classes.AccountView}>
                   {accountView}
               </div>
            </div>
        );
    }
}

export default Account;