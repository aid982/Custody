/**
 * Created by osetskiy on 4/14/2017.
 */
import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import Base from './Containers/Base';
import Login from './Containers/Login';
import Report from './Containers/Report';
import ChangePassword from './Containers/ChangePassword';
import RestorePassword from './Containers/RestorePassword';

import StatementPage from './Containers/StatementPage';
import  ErrorPage from './Components/Error';


const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route>
                <Route component={Base}>
                    <Route path="/" getComponent={
                        (location, callback) => {
                            let account = store.getState().login.account;
                            if (account) {
                                callback(null, StatementPage);
                            } else {
                                callback(null, Login);
                            }
                        }
                    }/>
                    <Route path="/login" component={Login}/>
                    <Route path="/restore" component={RestorePassword}/>
                    <Route path="/account_change" getComponent={
                        (location, callback) => {
                            let account = store.getState().login.account;
                            if (account) {
                                callback(null, ChangePassword);
                            } else {
                                callback(null, Login);
                            }
                        }
                    } />
                </Route>
                <Route path="/report" component={Report}/>
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;