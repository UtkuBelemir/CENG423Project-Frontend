import React from 'react';
import store from './reduxUtils/index'
import {Provider} from 'react-redux';
import RouterIndex from './RouterIndex';

import {MuiThemeProvider, createMuiTheme,colors} from '@material-ui/core';

import './vendor/main.css';


const theme = createMuiTheme({
    palette: {
        primary: {main: colors.blue[500]},
        secondary: {main: colors.deepOrange[500]}
    },
    typography: {useNextVariants: true},
});

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <RouterIndex/>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
