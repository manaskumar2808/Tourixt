import React,{Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/index';

import NavigationIcon from '@material-ui/icons/Navigation';

import Button from 'react-bootstrap/Button';

import SightCard from '../../components/SightCard/SightCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PlaceDisplayCard from '../../components/PlaceDisplayCard/PlaceDisplayCard';

import classes from './Activity.module.css';
import { TitleRounded } from '@material-ui/icons';

class Activity extends Component {
    state = {
        sights: [
            {   
                id:1,
                name: 'Louise',
                location: 'Denmark',
                imageUrl: 'https://media.gettyimages.com/photos/view-of-bridge-over-river-against-cloudy-sky-picture-id1176968994?s=2048x2048',
            },
            {
                id:2,
                name: 'Townzoal',
                location: 'Germany',
                imageUrl: 'https://media.gettyimages.com/photos/the-charles-bridge-of-prague-czech-republic-picture-id1182432355?s=2048x2048',
            },
            {
                id:3,
                name: 'Sigmfiank',
                location: 'China',
                imageUrl: 'https://media.gettyimages.com/photos/mostecka-street-in-the-moring-mala-strana-prague-czech-republic-picture-id879714042?s=2048x2048',
            },
            {
                id:4,
                name: 'Istablia',
                location: 'Uzbekistan',
                imageUrl: 'https://media.gettyimages.com/photos/old-village-gandria-with-a-port-with-nautical-vessel-and-alpine-lake-picture-id1219161424?s=2048x2048',
            },
            {
                id:5,
                name: 'Craoulli',
                location: 'Denmark',
                imageUrl: 'https://media.gettyimages.com/photos/aare-river-and-old-town-bern-switzerland-picture-id1179378066?s=2048x2048',
            },
            {
                id:6,
                name: 'Ottawa',
                location: 'Canada',
                imageUrl: 'https://media.gettyimages.com/photos/woman-admiring-the-parish-church-in-san-miguel-de-allende-mexico-picture-id1198718781?s=2048x2048',
            },
            {
                id:7,
                name: 'Sourle',
                location: 'Canada',
                imageUrl: 'https://media.gettyimages.com/photos/canadian-classics-spirit-island-picture-id1124328705?s=2048x2048',
            },
            {
                id:8,
                name: 'Monsavala',
                location: 'Thailand',
                imageUrl: 'https://media.gettyimages.com/photos/cityscape-of-frankfurt-am-main-at-sunrise-aerial-view-picture-id1165294237?s=2048x2048',
            },
            {
                id:9,
                name: 'Jimphy',
                location: 'Peru',
                imageUrl: 'https://media.gettyimages.com/photos/dusk-emerald-lake-yoho-national-park-british-columbia-canada-picture-id1138037247?s=2048x2048',
            },
        ],
    }

    componentDidMount() {
        this.props.fetchPlaces();
    }

    goToPlacePost = () => {
        this.props.history.push('/place/post/');
    }

    goToPlaceDetail = (id) => {
        this.props.history.push(`/place/${id}/`)
    }

    placeList = (title,list = []) => {
        return list.length === 0 ? null : (
            <React.Fragment>
                <div className={classes.PlaceTopic}>
                    {title}
                </div>
                <div className={classes.PlaceList}>
                    {
                        list.map(place => 
                            <PlaceCard
                                key={place.id}
                                id={place.id}
                                name={place.name}
                                location={place.location}
                                src={place.imageUrl} 
                                goToPlaceDetail={this.goToPlaceDetail}
                            />
                        )
                    } 
                </div>
            </React.Fragment>
        );
    }


    render() {
        const easyPlaces = this.props.places.filter((place) => place.type==='easy');
        const expensivePlaces = this.props.places.filter((place) => place.type==='expensive');
        const adventurousPlaces = this.props.places.filter((place) => place.type==='adventurous');
        const religiousPlaces = this.props.places.filter((place) => place.type==='religious');

        return (
            <div className={classes.Activity}>
                <div className={classes.LeftSide}></div>
                <div className={classes.MainContent}>
                    <div className={classes.SightList}>
                    {
                            this.state.sights.map(sight => 
                                <SightCard
                                    key={sight.id}
                                    name={sight.name}
                                    location={sight.location}
                                    src={sight.imageUrl} 
                                />
                            )
                    } 
                    </div>
                    {this.placeList('Easy Destinations',easyPlaces)}
                    {this.placeList('Expensive Destinations',expensivePlaces)}
                    {this.placeList('Adventurous Destinations',adventurousPlaces)}
                    {this.placeList('Religious Destinations',religiousPlaces)}
                </div>
                <div className={classes.RightSide}>
                    <PlaceDisplayCard 
                        src={this.state.sights[0].imageUrl}  
                        name={this.state.sights[0].name}
                        location={this.state.sights[0].location}
                    />
                    <Button
                        variant="dark"
                        size="md"
                        onClick={this.goToPlacePost} 
                        className={classes.AddPlace}>
                    <NavigationIcon className={classes.extendedIcon}/>
                        Add Place
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.plc.places,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(actions.fetchPlaces()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Activity);