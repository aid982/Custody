/**
 * Created by osetskiy on 3/16/2017.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import './Login.css';
import { Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Recaptcha from 'react-recaptcha';
import CircularProgress from 'material-ui/CircularProgress';

const RestorePassword = ({onChange,onSubmit,data,errors,snackBarOpen,onSnackBarClose,captchaVerifyCallback,isFetching,captchaCallback,captchaOK}) => (
    <Paper className="loginMain" zDepth={5}>
        <Card className="loginContainer">

            <h2 className="card-heading">Password restore</h2>
            {errors.summary && <p className="error-message">{errors.summary}</p>}


            <div className="field-line">
                <TextField
                    floatingLabelText="E-MAIL"
                    type="email"
                    name="email"
                    onChange={onChange}
                    errorText={errors.email}
                    value={data.email}
                />
            </div>
            {! captchaOK && <Recaptcha className ="capcha"
                                       sitekey="6LckICAUAAAAAFGJClbghPFZ0CmP4ou9S8nI2tkC"
                                       render="explicit"
                                       verifyCallback={captchaVerifyCallback}
                                       onloadCallback={captchaCallback}
            />}

            {
                isFetching && <CircularProgress size={80} thickness={5}/>
            }

            <div className="button-line">
                <RaisedButton type="submit" label="OK" primary  onTouchTap={onSubmit}/>
            </div>


        </Card>
        <Snackbar
            open={snackBarOpen}
            message="A new password has been sent to your e-mail"
            autoHideDuration={4000}
            onRequestClose={onSnackBarClose}
        />


    </Paper>
);


RestorePassword.propTypes = {
    captchaOK:PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    snackBarOpen:PropTypes.bool.isRequired,
    onSnackBarClose:PropTypes.func.isRequired,
    captchaVerifyCallback:PropTypes.func.isRequired,
    captchaCallback:PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
};

export default RestorePassword;