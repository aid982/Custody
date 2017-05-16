import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    cyan500, cyan700,
    pinkA200,teal500,teal700,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './Reducers';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import Root from './Root';

injectTapEventPlugin();
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: teal500,
        primary2Color: teal700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: teal500,
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    },
});
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)


ReactDOM.render((

        <MuiThemeProvider muiTheme={muiTheme}>
            <Root store={store}/>
        </MuiThemeProvider>), document.getElementById('root'));