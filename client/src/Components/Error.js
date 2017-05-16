import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import {Card, CardText} from 'material-ui/Card';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const handleClick = () => {
    browserHistory.push('/login');
};

const Error = ({error}) => {
    <Card className="container">
        <CardText>{error.errorMSG}</CardText>
        <RaisedButton label="OK" onTouchTap={handleClick}/>

    </Card>
}
Error.propTypes = {
    error: PropTypes.object.isRequired

};


export default Error;
