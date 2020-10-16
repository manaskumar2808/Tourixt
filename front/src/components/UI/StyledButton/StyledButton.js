import React,{Component} from 'react';

import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

class StyledButton extends Component {
    render() {
        const StyledButton = withStyles({
            root: {
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              borderRadius: 3,
              border: 0,
              color: 'white',
              height: 30,
              padding: '0 15px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              marginTop: '15px',
            },
            label: {
              textTransform: 'capitalize',
            },
        })(Button);

        return (
            <StyledButton 
                variant="contained" 
                type={this.props.type}
                margin="normal"
            >{this.props.children}</StyledButton>
        );
    }
}

export default StyledButton;