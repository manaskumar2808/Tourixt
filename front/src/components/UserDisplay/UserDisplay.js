import React,{Component} from 'react';

import {AccountBox,Email} from '@material-ui/icons';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import CircularProfileItem from '../CircularProfileItem/CircularProfileItem';

import classes from './UserDisplay.module.css';

class UserDisplay extends Component {
    state = {
        highlights: [
            {   
                id:1,
                imageUrl: 'https://media.gettyimages.com/photos/view-of-bridge-over-river-against-cloudy-sky-picture-id1176968994?s=2048x2048',
            },
            {
                id:2,
                imageUrl: 'https://media.gettyimages.com/photos/the-charles-bridge-of-prague-czech-republic-picture-id1182432355?s=2048x2048',
            },
            {
                id:3,
                imageUrl: 'https://media.gettyimages.com/photos/mostecka-street-in-the-moring-mala-strana-prague-czech-republic-picture-id879714042?s=2048x2048',
            },
            {
                id:4,
                imageUrl: 'https://media.gettyimages.com/photos/old-village-gandria-with-a-port-with-nautical-vessel-and-alpine-lake-picture-id1219161424?s=2048x2048',
            },
            {
                id:5,
                imageUrl: 'https://media.gettyimages.com/photos/aare-river-and-old-town-bern-switzerland-picture-id1179378066?s=2048x2048',
            },
            {
                id:6,
                imageUrl: 'https://media.gettyimages.com/photos/woman-admiring-the-parish-church-in-san-miguel-de-allende-mexico-picture-id1198718781?s=2048x2048',
            },
            {
                id:7,
                imageUrl: 'https://media.gettyimages.com/photos/canadian-classics-spirit-island-picture-id1124328705?s=2048x2048',
            },
            {
                id:8,
                imageUrl: 'https://media.gettyimages.com/photos/cityscape-of-frankfurt-am-main-at-sunrise-aerial-view-picture-id1165294237?s=2048x2048',
            },
            {
                id:9,
                imageUrl: 'https://media.gettyimages.com/photos/dusk-emerald-lake-yoho-national-park-british-columbia-canada-picture-id1138037247?s=2048x2048',
            },
        ],
    }

    render() {
        return (
            <div className={classes.UserDisplay}>
                <CircularProfileItem src={this.props.profileImageUrl} size="md" haveBorder type={1} />
                <div className={classes.UserDetails}>
                    <h5>{this.props.firstName} {this.props.lastName}</h5>
                    <h6 style={{color:"#797c7d"}}><AccountBox />{this.props.userName}</h6>
                    <div className={classes.SocialDetails}>
                        <div className={classes.SocialItem}>
                            <div>0</div>
                            <div>Posts</div>
                        </div>
                        <div className={classes.SocialItem}>
                            <div>0</div>
                            <div>Followers</div>
                        </div>
                        <div className={classes.SocialItem}>
                            <div>0</div>
                            <div>Following</div>
                        </div>
                    </div>
                    <div className={classes.HighlightGrid}>
                    <GridList cellHeight="auto" spacing={1} className={classes.gridList} cols={3}>
                        {this.state.highlights.map((highlight) => (
                            <GridListTile key={highlight.id}>
                                <div className={classes.container}>
                                    <img src={highlight.imageUrl} className={classes.HighlightGridImage} />
                                </div>
                            </GridListTile>
                        ))}
                    </GridList>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDisplay;