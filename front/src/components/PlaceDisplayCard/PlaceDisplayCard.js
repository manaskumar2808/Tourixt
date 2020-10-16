import React,{Component} from 'react';

import {FavoriteBorder,Favorite} from '@material-ui/icons';

import Button from 'react-bootstrap/Button';

import classes from './PlaceDisplayCard.module.css';

class PlaceCard extends Component {
    state = {
        isLiked: false,
    }

    likeToggle = () => {
        this.setState(prevState => {
            return {
                isLiked: !prevState.isLiked,
            }
        });
    }

    render() {
        return (
            <div className={classes.PlaceDisplayCard}>
                <div className={classes.PlaceCardImageContainer}>
                    <img src={this.props.src} className={classes.PlaceCardImage} />
                </div>
                <div className={classes.PlaceCardInfoContainer}>
                    <div className={classes.PlaceCardInfo}>
                        <div className={classes.PlaceCardInfoName}>
                            {this.props.name}
                        </div>
                        <div className={classes.PlaceCardInfoLocation}>
                            {this.props.location}
                        </div>
                    </div>
                    <div className={classes.PlaceCardReview}>
                        { this.state.isLiked ? <Favorite style={{color: "red"}} onClick={this.likeToggle} /> : <FavoriteBorder style={{color: "grey"}} onClick={this.likeToggle} /> }
                    </div>
                </div>
                <div className={classes.PlaceCardAction}>
                    <Button variant="danger" size="md" block>Visit</Button>
                </div>
            </div>
        );
    }
}

export default PlaceCard;