import React,{Component} from 'react';
import {connect} from 'react-redux';

import {FavoriteBorder, Favorite} from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from 'react-bootstrap/Button';

import * as actions from '../../store/index';

import classes from './PlaceDetail.module.css';

class PlaceDetail extends Component {
    state = {
        isLiked: false,
    }

    componentDidMount() {
        const placeId = this.props.match.params.id;
        this.props.fetchPlace(placeId);
    }

    likeToggle = () => {
        this.setState(prevState => {
            return {
                isLiked: !prevState.isLiked,
            }
        });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className={classes.PlaceDetail}>
            <div className={classes.BackButton}>
                <ArrowBackIcon onClick={this.goBack} />
            </div>
            <div className={classes.PlaceDetailContainer}>
                <div className={classes.PlaceImageContainer}>
                    <img src={this.props.place.imageUrl} className={classes.PlaceImage} />
                </div>
                <div className={classes.PlaceInfoContainer}>
                    <div className={classes.PlaceInfoTop}>
                        <div className={classes.PlaceInfoTopStart}>
                            <div className={classes.PlaceName}>
                                {this.props.place.name}
                            </div>
                            <div className={classes.PlaceLocation}>
                                {this.props.place.location}
                            </div>
                        </div>
                        <div className={classes.PlaceInfoTopEnd} style={{paddingRight: "10px"}}>
                            {this.state.isLiked ? <Favorite style={{color: "red"}} onClick={this.likeToggle} /> : <FavoriteBorder style={{color: "#6b6a6a"}} onClick={this.likeToggle} />}
                        </div>
                    </div>
                    <div className={classes.PlaceDescription}>
                        {this.props.place.description}
                    </div>
                    <div className={classes.PlaceStats}>
                        <div className={classes.PlaceCost}>
                            <b>Cost(Per Person Per day)</b> ${this.props.place.cost}
                        </div>
                        <div className={classes.PlaceElevation}>
                            <b>Elevation </b> {this.props.place.elevation} meters
                        </div>
                        <div className={classes.PlacePopulation}>
                            <b>Population </b> {this.props.place.population}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        place: state.plc.place,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlace: (id) => dispatch(actions.fetchPlace(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceDetail);