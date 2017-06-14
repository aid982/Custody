/**
 * Created by osetskiy on 4/12/2017.
 */
import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



const Logged = (props) => (

    <IconMenu style={props.style}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >

        <MenuItem primaryText="Sign out"  onTouchTap={props.onAccountExit}/>
        <MenuItem primaryText="Change password"  onTouchTap={props.onChangePassword}/>
    </IconMenu>
);


class LoginWithCartComponent extends React.Component {
    static PropTypes = {
        qtyInCart: PropTypes.number.isRequired,
        account: PropTypes.object,
        onAccountExit:PropTypes.func.isRequired,
        onChangePassword:PropTypes.func.isRequired

    }
    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                {this.props.account ?
                   <Logged style={this.props.style} onChangePassword={this.props.onChangePassword} onAccountExit={this.props.onAccountExit}/> : <a href="/login"><FlatButton
                        style={this.props.style} label="Login"/>
                    </a>
                }

            </div>


        );
    }
}


export default LoginWithCartComponent;

