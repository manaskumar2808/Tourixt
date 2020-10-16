import React,{Component} from "react";

import Carousel from 'react-bootstrap/Carousel';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem } from "mdbreact";

import classes from './Carousal.module.css';

class Carousal extends Component{
    render() {
        return (
            <Carousel className={classes.CarousalView} nextIcon={null} prevIcon={null} indicators={true} >
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/beach.jpg'}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/gorge.jpg'}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/city.jpg'}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/heart.jpg'}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/neon.jpg'}
                        alt="Fourth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/new-york-city.jpg'}
                        alt="Fifth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/rose.jpg'}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/sunflowers.jpg'}
                        alt="Sixth slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item className={classes.CarousalItem}>
                        <img
                        className={classes.CarousalSlide}
                        src={process.env.PUBLIC_URL+'/images/winding-road.jpg'}
                        alt="Seventh slide"
                        />
                    </Carousel.Item>
            </Carousel>
        );
    }
}


export default Carousal;