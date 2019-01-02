import React from 'react';
import store from './reduxUtils/index'
import {Provider} from 'react-redux';
import RouterIndex from './RouterIndex';
import {ThemeProvider} from '@rmwc/theme';
import 'material-components-web/dist/material-components-web.css';
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider options={{
                    primary: 'red',
                    secondary: 'blue'
                }}>
                    <RouterIndex/>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
