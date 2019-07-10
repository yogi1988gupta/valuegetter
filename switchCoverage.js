import React, {Component} from "react";
import './fna.css'
import { Switch, Typography, Grid, FormControlLabel } from '@material-ui/core';


export class SwitchCoverage extends Component {    
    constructor(props) {        
        super(props);
        console.log(props );
    }

    handleCoverage = (event) => {
        console.log(event.target.checked);
        // api.setFilterModel({
        //     Coverage: event.target.checked
        //   })
        // api.setQuickFilter
    }

    render() {
        return (
            <Typography component="div">
                <Grid component="label" container justify="center" alignItems="center" spacing={1}>
                    <Grid item xs={8} alignItems="right">
                        <div style={{textAlign: 'right', paddingRight: '5px'}}>Off</div>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControlLabel
                            value="off"
                            control={<Switch onChange={this.handleCoverage} style={{thumb: { width:15, height:15} }} color="primary" />}
                            labelPlacement="Off"
                        />
                    </Grid>
                    <Grid item xs={2}>
                         <div style={{textAlign: 'left'}}>On</div>
                    </Grid>
                </Grid>
            </Typography>            
        );
    }

}

