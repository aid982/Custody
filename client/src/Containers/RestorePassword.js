/**
 * Created by osetskiy on 3/7/2017.
 */
import React from 'react';
import RestorePasswordComp from '../Components/RestorePassword';
import {connect} from 'react-redux'
import {changeData,submit,closeSnackBar} from '../Actions/restorePswd'
import {verifyCapcha} from '../Actions/capcha'

class RestorePassword extends React.Component {
    /**
     * Class constructor.
     */


    render() {
        const {errors,onSubmit,onChange,data,onSnackBarClose,snackBarOpen,captchaVerifyCallback,captchaCallback,isFetching,captchaOK} = this.props
        return (
            <div>
                <RestorePasswordComp errors={errors}  onSubmit={onSubmit} onChange={onChange} data={data} onSnackBarClose={onSnackBarClose} snackBarOpen={snackBarOpen} captchaVerifyCallback={captchaVerifyCallback} isFetching={isFetching} captchaCallback={captchaCallback} captchaOK={captchaOK}/>
            </div>

        );
    }

}
const mapStateToProps = (state) => {
    return {
        errors: state.restorePassword.errors,
        data  : state.restorePassword.data,
        snackBarOpen:state.restorePassword.snackBarOpen,
        isFetching: state.restorePassword.isFetching,
        captchaOK:state.capcha.ok
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: () => {
            dispatch(submit())
        },
        onChange: (event) => {
            dispatch(changeData(event))
        },
        onSnackBarClose: () => {
            dispatch(closeSnackBar())
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
)(RestorePassword);

