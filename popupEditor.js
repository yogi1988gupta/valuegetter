import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export class popupEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Suppose you have already included bootstrap required JS files
        window.jQuery('#btnPopUp').popover();
    }
    render() {
        return (
            <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                    <div>
                        <Button id="btnPopUp" variant="contained">
                            Open Popover
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography className={classes.typography}>The content of the Popover.</Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        );
    }
}