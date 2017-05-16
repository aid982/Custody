/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import './Login.css';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import Recaptcha from 'react-recaptcha';

const Login = ({onChange,onSubmit, user,errors,captchaVerifyCallback,captchaCallback}) => (
    <Paper className="loginMain" zDepth={5}>
        <Card className="loginContainer">

            <h2 className="card-heading">Login</h2>
            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Login"
                    name="login"
                    errorText={errors.login}
                    onChange={onChange}
                    value={user.login}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                />
            </div>
            <Recaptcha className ="capcha"
                sitekey="6LckICAUAAAAAFGJClbghPFZ0CmP4ou9S8nI2tkC"
                render="explicit"
                verifyCallback={captchaVerifyCallback}
                onloadCallback={captchaCallback}
            />


            <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary  onTouchTap={onSubmit}/>
            </div>



            <CardText>Forget your password ?  <Link to={'/restore'}>Restore</Link>.</CardText>


        </Card>


    </Paper>
);


Login.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    captchaVerifyCallback:PropTypes.func.isRequired,
    captchaCallback:PropTypes.func.isRequired,
};

export default Login;