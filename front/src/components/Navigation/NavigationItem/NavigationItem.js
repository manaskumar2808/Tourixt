import React, { Component } from 'react';

import classes from './NavigationItem.module.css';

class NavigationItem extends Component {
    render() {
        return (
            <div className={classes.NavigationItem}>
                {this.props.children}
            </div>
        );
    }
}

export default NavigationItem;