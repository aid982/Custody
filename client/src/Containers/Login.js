/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import LoginForm from '../Components/Login';
import {changeLoginPswrd,submit} from '../Actions/login'
import {verifyCapcha} from '../Actions/capcha'



class Login extends React.Component {
    render() {

        const {errors,onChange,user,onSubmit,captchaVerifyCallback,captchaCallback, captchaOK} = this.props
        return (
            <LoginForm errors={errors} onChange={onChange} user={user} onSubmit={onSubmit} captchaCallback={captchaCallback} captchaVerifyCallback={captchaVerifyCallback} captchaOK={captchaOK}/>
        )

    }

}



const mapStateToProps = (state) => {
    return {
        errors: state.login.errors,
        user  : state.login.user,
        captchaOK:state.capcha.ok
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: () => {
            dispatch(submit())
        },
        onChange: (event) => {
            dispatch(changeLoginPswrd(event))
        },
        captchaVerifyCallback:(response) => {
            dispatch(verifyCapcha(response));

        },
        captchaCallback:() => {


        }
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);






