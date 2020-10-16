import React,{Component} from 'react';
import axios from '../../axios-place';

import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import PeopleIcon from '@material-ui/icons/People';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import classes from './PostPlace.module.css';

class PostPlace extends Component {
    state = {
        showPart1: true,
        placeForm: {
            name : {
                value: null,
                valid: false,
                touched: false,
            },
            location: {
                value: null,
                valid: false,
                touched: false,
            },
            imageUrl: {
                value: null,
                valid: false,
                touched: false,
            },
            description: {
                value: null,
                valid: true,
                touched: false,
            },
            cost: {
                value: null,
                valid: true,
                touched: false,
            },
            elevation: {
                value: null,
                valid: true,
                touched: false,
            },
            type: {
                value: null,
                valid: false,
                touched: false,
            },
            population: {
                value: null,
                valid: true,
                touched: false,
            },
            isUWHS: {
                value: false,
                valid: true,
                touched: false,
            },
        },
    }

    changeFormPage = () => {
        this.setState(prevState => {
            return {
                showPart1: !prevState.showPart1,
            }
        });
    }

    checkValidity = () => {
        if(!this.state.placeForm.name.valid){
            return false;
        } else if(!this.state.placeForm.location.valid){
            return false;
        } else if(!this.state.placeForm.imageUrl.valid){
            return false;
        } else if(!this.state.placeForm.description.valid){
            return false;
        } else if(!this.state.placeForm.cost.valid){
            return false;
        } else if(!this.state.placeForm.elevation.valid){
            return false;
        } else if(!this.state.placeForm.population.valid){
            return false;
        } else if(!this.state.placeForm.type.valid){
            return false;
        } else if(!this.state.placeForm.isUWHS.valid){
            return false;
        }
        return true;
    }

    submitPlace = (event) => {
        event.preventDefault();
        let isValid = this.checkValidity();
        if(isValid){
            const placeData = {
                name: this.state.placeForm.name.value,
                location: this.state.placeForm.location.value,
                imageUrl: this.state.placeForm.imageUrl.value,
                description: this.state.placeForm.description.value,
                cost: this.state.placeForm.cost.value,
                elevation: this.state.placeForm.elevation.value,
                population: this.state.placeForm.population.value,
                placeType: this.state.placeForm.type.value,
                isUWHS: this.state.placeForm.isUWHS.value
            }
            axios.post('create/',placeData)
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    cleanForm = () => {
        this.setState({
            showPart1: false,
            placeForm: {
                name : {
                    value: null,
                    valid: false,
                    touched: false,
                },
                location: {
                    value: null,
                    valid: false,
                    touched: false,
                },
                imageUrl: {
                    value: null,
                    valid: false,
                    touched: false,
                },
                description: {
                    value: null,
                    valid: true,
                    touched: false,
                },
                cost: {
                    value: null,
                    valid: true,
                    touched: false,
                },
                elevation: {
                    value: null,
                    valid: true,
                    touched: false,
                },
                type: {
                    value: null,
                    valid: false,
                    touched: false,
                },
                population: {
                    value: null,
                    valid: true,
                    touched: false,
                },
                isUWHS: {
                    value: false,
                    valid: true,
                    touched: false,
                },
            },
        });
    }


    render() {
        const page1Classes = [classes.PlacePostFormPart1]
        const page2Classes = [classes.PlacePostFormPart2]

        if(this.state.showPart1){
            page1Classes.push(classes.Show);
        } else {
            page2Classes.push(classes.Show);
        }

        return (
            <div className={classes.PostPlace}>
                <div className={classes.PlaceImagePreviewContainer}>
                    {this.state.placeForm.imageUrl.valid && this.state.placeForm.imageUrl.value.length > 0 ? 
                        <img 
                            className={classes.PlaceImagePreview} 
                            src={this.state.placeForm.imageUrl.value}
                        /> : <div 
                            style={{
                                height:"40px",
                                width:"40px",
                                position:"absolute",
                                top:"45%",
                                left:"45%"
                            }}>
                            <Add style={{color: "white",fontSize: "40px"}} />
                    </div>}
                </div>
                <div className={classes.PlacePostFormContainer}>
                    <form className={classes.PlacePostForm} onSubmit={event => this.submitPlace(event)}>
                        <div className={page1Classes.join(' ')}>
                            <TextField 
                                id="outlined-basic" 
                                label="Name" 
                                error={!this.state.placeForm.name.valid && this.state.placeForm.name.touched}
                                helperText="Name should have atleast 3 characters"
                                autoComplete="off"
                                dense
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                type="text" 
                                placeholder="Name" 
                                name="Name" 
                                value={this.state.placeForm.name.value} 
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        name: {
                                            value: event.target.value,
                                            valid: event.target.value.length > 2,
                                            touched: true,
                                        },
                                    }
                                })} 
                            /> 
                            <TextField 
                                id="outlined-basic" 
                                label="Location" 
                                error={!this.state.placeForm.location.valid && this.state.placeForm.location.touched}
                                helperText="Give a valid location for the place"
                                autoComplete="off"
                                dense
                                required
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text" 
                                placeholder="Location" 
                                name="Location" 
                                value={this.state.placeForm.location.value} 
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        location: {
                                            value: event.target.value,
                                            valid: event.target.value.length > 3,
                                            touched: true,
                                        },
                                    }
                                })} 
                            /> 
                            <TextField 
                                id="outlined-basic" 
                                label={null} 
                                error={!this.state.placeForm.imageUrl.valid && this.state.placeForm.imageUrl.touched}
                                helperText="Give an Image For the Place"
                                autoComplete="off"
                                dense
                                required
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text" 
                                placeholder="Image URL" 
                                name="Image URL" 
                                value={this.state.placeForm.imageUrl.value} 
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        imageUrl: {
                                            value: event.target.value,
                                            valid: event.target.value.length > 3,
                                            touched: true,
                                        },
                                    }
                                })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CameraAltIcon />
                                        </InputAdornment>
                                    )
                                }} 
                            />     
                            <TextField 
                                id="outlined-basic" 
                                label="Description" 
                                error={!this.state.placeForm.description.valid && this.state.placeForm.description.touched}
                                helperText="Description of the place"
                                autoComplete="off"
                                dense
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text" 
                                placeholder="Description" 
                                name="Description" 
                                value={this.state.placeForm.description.value} 
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        description: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        },
                                    }
                                })} 
                            />   
                        </div>
                        <div className={page2Classes.join(' ')}>
                            <TextField
                                id="outlined-adornment-amount"
                                error={!this.state.placeForm.cost.valid && this.state.placeForm.cost.touched}
                                autoComplete="off"
                                dense
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                placeholder="Cost(Per Person Per Day)"
                                label={null}
                                value={this.state.placeForm.cost.value}
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        cost: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        },
                                    }
                                })} 
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                    ),
                                }}
                                labelWidth={60}
                            />
                            <TextField
                                id="outlined-adornment-amount"
                                error={!this.state.placeForm.elevation.valid && this.state.placeForm.elevation.touched}
                                autoComplete="off"
                                dense
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                placeholder="Elevation"
                                label={null}
                                value={this.state.placeForm.elevation.value}
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        elevation: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        },
                                    }
                                })} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FilterHdrIcon />
                                        </InputAdornment>
                                    )
                                }}
                                labelWidth={60}
                            />
                            <TextField
                                id="outlined-adornment-amount"
                                error={!this.state.placeForm.population.valid && this.state.placeForm.population.touched}
                                autoComplete="off"
                                dense
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                placeholder="Population"
                                label={null}
                                value={this.state.placeForm.population.value}
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        population: {
                                            value: event.target.value,
                                            valid: true,
                                            touched: true,
                                        },
                                    }
                                })} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PeopleIcon />
                                        </InputAdornment>
                                    )
                                }}
                                labelWidth={60}
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Type" 
                                error={!this.state.placeForm.type.valid && this.state.placeForm.type.touched}
                                helperText="Type may be of type 1.Easy 2.Expensive 3.Adventurous 4.Religious"
                                autoComplete="off"
                                dense
                                required
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="text" 
                                placeholder="Type" 
                                name="Type" 
                                value={this.state.placeForm.type.value} 
                                onChange={event => this.setState({
                                    placeForm: {
                                        ...this.state.placeForm,
                                        type: {
                                            value: event.target.value,
                                            valid: event.target.value.length > 3,
                                            touched: true,
                                        },
                                    }
                                })} 
                            />
                            <FormControlLabel
                                control={
                                        <Checkbox
                                            checked={this.state.placeForm.isUWHS.value}
                                            name="is UWHS"
                                            onChange={event => this.setState({
                                                placeForm: {
                                                    ...this.state.placeForm,
                                                    isUWHS: {
                                                        value: event.target.checked,
                                                        valid: true,
                                                        touched: true,
                                                    },
                                                }
                                            })} 
                                        />   
                                }
                                label="UNESCO World Heritage Site"
                            />
                        </div>
                        <div className={classes.FormActions}>
                            <div className={classes.FormSubmission}>
                                {this.state.showPart1 ? null : <Button disabled={!this.checkValidity()} type="submit" variant="dark" size="md" block>Submit Place</Button> }
                            </div>
                            <div className={classes.FormPageSwitch}>
                                <Button variant="primary" size="md" onClick={this.changeFormPage}>
                                    { this.state.showPart1 ? <ArrowForwardIcon /> : <ArrowBackIcon />}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostPlace;