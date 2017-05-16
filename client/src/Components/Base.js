/**
 * Created by osetskiy on 3/3/2017.
 */
import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import AppBarLoginComponent from './AppBarLoginComponent';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
const Base = ({children, qtyInCart, account, onAccountExit,onChangePassword}) => (
    <div>

        <AppBar title="Dragon capital"
            iconElementRight={<AppBarLoginComponent account={account}  onAccountExit={onAccountExit} onChangePassword={onChangePassword}/>}
        />
        <Paper className="mainContainer" zDepth={5}>
            <div className ="mainCardContainer">
                {children}
            </div>


        </Paper>
    </div>


);

Base.propTypes = {
    children: PropTypes.object,
    account: PropTypes.object,
    onAccountExit: PropTypes.func,
    onChangePassword: PropTypes.func
};

export default Base;
