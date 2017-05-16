/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import BaseComponent from '../Components/Base';
import {accountExit} from '../Actions/login'
import {browserHistory} from 'react-router'

class Base extends React.Component {

    render() {
        const {children,onAccountExit,account,onChangePassword} = this.props
        return (
            <BaseComponent children={children}  account={account}
                           onAccountExit={onAccountExit} onChangePassword={onChangePassword}/>
        )

    }

}


const mapStateToProps = (state) => {
    return {
        account: state.login.account
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAccountExit: () => {
            dispatch(accountExit())
        },
        onChangePassword: () => {
            browserHistory.push('/account_change');
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Base);






