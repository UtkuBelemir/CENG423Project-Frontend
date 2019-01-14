import React from 'react';
import {MuiThemeProvider, createMuiTheme, colors} from '@material-ui/core';
import Fab from "@material-ui/core/Fab";

export default class ColorfulFAB extends React.Component {
    render() {
        const {children, color, ...rest} = this.props;
        if (["primary", "secondary", "inherit", "default"].indexOf(color) < 0) {
            return (
                <MuiThemeProvider theme={createMuiTheme({palette: {primary: colors[color]}})}>
                    <Fab color="primary" {...rest}>
                        {children}
                    </Fab>
                </MuiThemeProvider>
            )
        } else {
            return (
                <Fab {...rest} color={color}>
                    {children}
                </Fab>
            )
        }
    }
}