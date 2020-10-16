import React,{Component} from 'react';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import classes from './Reply.module.css';

class Reply extends Component {
    render() {
        return (
            <div className={classes.Reply}>
                <div className={classes.ReplyProfileImage}>
                    <CircularProfileItem src={this.props.reply.replier.profileImageUrl} size="xxsm" />
                </div>
                <div className={classes.ReplyUserName}>
                    <div style={{fontSize:"14px",fontWeight:500}}>{this.props.reply.replier.userName}</div>
                    <div style={{fontSize:"11px"}}>{this.props.reply.text}</div>
                </div>
            </div>
        );
    }
}

export default Reply;