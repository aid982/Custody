/**
 * Created by osetskiy on 3/7/2017.
 */
import React from 'react';
import ChangePswComp from '../Components/ChangePassword';
import {connect} from 'react-redux'
import {changePswrd,submit} from '../Actions/changePswd'

class ChangePassword extends React.Component {
    /**
     * Class constructor.
     */


    render() {
        const {errors,onSubmit,onChange,passwords} = this.props
        return (
            <div>
                <ChangePswComp errors={errors}  onSubmit={onSubmit} onChange={onChange}  passwords={passwords}/>
            </div>

        );
    }

}
const mapStateToProps = (state) => {
    return {
        errors: state.changePswd.errors,
        passwords  : state.changePswd.passwords
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: () => {
            dispatch(submit())
        },
        onChange: (event) => {
            dispatch(changePswrd(event))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);

