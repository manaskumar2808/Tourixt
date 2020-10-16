import React,{Component} from 'react';

import Skeleton from '@material-ui/lab/Skeleton';

import classes from './CircularProfileItem.module.css';

class CircularProfileItem extends Component{
    render() {
        let source = process.env.PUBLIC_URL+'/images/profile-default.png';
        if(this.props.src){
            source = this.props.src;
        }

        const sizeClasses = [classes.ProfileImageContainer];
        switch(this.props.size){
            case 'xxxsm': sizeClasses.push(classes.XXXSmall);
                    break;
            case 'xxsm': sizeClasses.push(classes.XXSmall);
                    break;
            case 'xsm': sizeClasses.push(classes.XSmall);
                    break;
            case 'sm': sizeClasses.push(classes.Small);
                    break;
            case 'md': sizeClasses.push(classes.Medium);
                    break;
            case 'lg': sizeClasses.push(classes.Large);
                    break;
            case 'story': sizeClasses.push(classes.Story);
                    break;
            default: sizeClasses.push(classes.Medium);
                    break;
        }

        const imageClasses = [classes.ProfileImage];

        if(this.props.haveBorder){
            sizeClasses.push(classes.Border);
            imageClasses.push(classes.Padded);
        }

        switch(this.props.type){
            case 1: sizeClasses.push(classes.BorderType1);
                break;
            case 2: sizeClasses.push(classes.BorderType2);
                break;
            case 3: sizeClasses.push(classes.BorderType3);
                break;
            default:
                break;
        }

        return (
            <div className={sizeClasses.join(' ')}>
                <div className={classes.Cover}>
                    {this.props.isLoading ? 
                        <Skeleton animation="wave" variant="circle"/>
                            :
                        <img className={imageClasses.join(' ')} src={source} />    
                    }
                </div>
            </div>  
        );
    }
}   

export default CircularProfileItem;