import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import NavigationItem from './NavigationItem/NavigationItem';

import HomeIcon from '../../Icons/Home.js';

import {HomeOutlined,Home,Explore as ExploreIcon,AddBox,AddBoxOutlined,Favorite,FavoriteBorder,AccountCircle,AccountCircleOutlined} from '@material-ui/icons';

import classes from './Navigation.module.css';

class Navigation extends Component {
    render() {
        return (
            <div className={classes.Navigation}>
                <div className={classes.LeftNav}></div>
                <div className={classes.MidNav}>
                    <h3 className={classes.Brand}>Outreach</h3>
                    <div className={classes.NavIcons}>
                        <NavigationItem><NavLink to="/" exact activeClassName={classes.Active} className={classes.NavIcon}><Home /></NavLink></NavigationItem>
                        <NavigationItem><NavLink to="/explore/" activeClassName={classes.Active} className={classes.NavIcon}><ExploreIcon/></NavLink></NavigationItem>
                        <NavigationItem><NavLink to="/post/" activeClassName={classes.Active} className={classes.NavIcon}><AddBox/></NavLink></NavigationItem>
                        <NavigationItem><NavLink to="/activity/" activeClassName={classes.Active} className={classes.NavIcon}><Favorite /></NavLink></NavigationItem>
                        <NavigationItem><NavLink to="/profile/" activeClassName={classes.Active} className={classes.NavIcon}><AccountCircle/></NavLink></NavigationItem>
                    </div>
                </div>
                <div className={classes.RightNav}></div>
            </div>
        );
    }
}

export default Navigation;