import React, {PropTypes} from 'react';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Table from './old/DataTable';
/**
 * Created by osetskiy on 3/15/2017.
 */

class UserForm extends React.Component {
    constructor(props) {
        super(props)

    }

    state = {
        login: "",
        admin: false
    };

    handleChangeName = (event) => {
        this.setState({login: event.target.value});
    };

    handleChangeAdmin = (event, isInputChecked) => {
        console.log(isInputChecked);
        this.setState({admin: isInputChecked});
    };
    handleAdd = ()=>{
        this.props.handleAdd(this.state);

    }

    render() {
        return (
            <Card>
                <Card className="userForm">
                    <CardText>
                        User form
                    </CardText>
                    <TextField
                        hintText="e-mail"
                        id="text-field-controlled"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />

                    <Checkbox
                        label="admin user"
                        onCheck={this.handleChangeAdmin}


                    />
                    <RaisedButton label="ADD user" onTouchTap={this.handleAdd}/>


                </Card>
                < Table dataArray={this.props.users} selectable={true}/>
            </Card>
        );
    }
}


UserForm.propTypes = {
    users: PropTypes.array.isRequired,
    handleAdd: PropTypes.func,
    handleDelete: PropTypes.func
};

export default UserForm;