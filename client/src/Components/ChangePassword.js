/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import './Login.css';
import { Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const ChangePassword = ({onChange,onSubmit, passwords,errors}) => (
    <Paper className="loginMain" zDepth={5}>
        <Card className="loginContainer">

            <h2 className="card-heading">Change password</h2>
            {errors.summary && <p className="error-message">{errors.summary}</p>}


            <div className="field-line">
                <TextField
                    floatingLabelText="Old Password"
                    type="password"
                    name="oldPassword"
                    onChange={onChange}
                    errorText={errors.password}
                    value={passwords.oldPassword}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="New Password"
                    type="password"
                    name="newPassword1"
                    onChange={onChange}
                    errorText={errors.password}
                    value={passwords.newPassword1}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Confirm password"
                    type="password"
                    name="newPassword2"
                    onChange={onChange}
                    errorText={errors.password}
                    value={passwords.newPassword2}
                />
            </div>


            <div className="button-line">
                <RaisedButton type="submit" label="OK" primary  onTouchTap={onSubmit}/>
            </div>


        </Card>


    </Paper>
);


ChangePassword.propTypes = {
    passwords: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ChangePassword;