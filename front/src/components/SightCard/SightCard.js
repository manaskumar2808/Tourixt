import React,{Component} from 'react';

import classes from './SightCard.module.css';

class SightCard extends Component {
    render() {
        return (
            <div className={classes.SightCard}>
                <img src={this.props.src} className={classes.SightImage} />
                <div className={classes.SightInfo}>
                    <div className={classes.SightInfoName}>
                        {this.props.name}
                    </div>
                    <div className={classes.SightInfoLocation}>
                        {this.props.location}
                    </div>
                </div>
            </div>
        );
    }
}

export default SightCard;