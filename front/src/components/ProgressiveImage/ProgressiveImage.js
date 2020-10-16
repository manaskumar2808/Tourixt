import React,{Component} from 'react';

import classes from './ProgressiveImage.module.css';

class ProgressiveImage extends Component {
    state = {
        src: null,
        isLoaded: false,
    }


    render() {
        return(
            <div>
                <img src={this.props.src} 
                    className={} 
                    onLoad = {() => {this.setState({isLoaded: true})}} 
                />
            </div>
        );
    }
}

export default ProgressiveImage;
