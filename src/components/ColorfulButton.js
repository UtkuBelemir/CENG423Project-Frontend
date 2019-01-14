import React from 'react';
import {MuiThemeProvider, createMuiTheme, colors, Button} from '@material-ui/core';

export default class ColorfulButton extends React.Component {
    render() {
        const {children, color, ...rest} = this.props;
        if (["primary", "secondary", "inherit", "default"].indexOf(color) < 0) {
            return (
                <MuiThemeProvider theme={createMuiTheme({palette: {primary: colors[color]}})}>
                    <Button {...rest} color="primary">
                        {children}
                    </Button>
                </MuiThemeProvider>
            )
        } else {
            return (
                <Button {...rest} color={color}>
                    {children}
                </Button>
            )
        }
    }
}