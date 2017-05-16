/**
 * Created by osetskiy on 3/7/2017.
 */
import React, {PropTypes} from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    dropDownMenu: {
        display: 'inline-flex',
        margin: '10px',
        width: '150px'
    },
    input: {
        display: 'inline-flex',
        margin: '10px',
        width: '100px'
    }

};

const StatementForm = ({dataFromApi, changeDate1, changeDate2, handleChangeAccount, handleGetReport, input, isFetching, error, accounts}) => (

    <div className="reportContainer">
        <div className="inputContainer">
            account :<DropDownMenu value={input.account} onChange={handleChangeAccount} style={ styles.dropDownMenu} >
                {accounts.map((item, index) => (
                    <MenuItem key ={item} value={item} primaryText={item}/>))}


            </DropDownMenu>

            from :<DatePicker hintText="date from" autoOk={true} title="from :"
                        onChange={changeDate1} style={ styles.input}
                        value={input.date1}
            />
            to:<DatePicker hintText="date to" autoOk={true} title="to :"
                        onChange={changeDate2} style={ styles.input}
                        value={input.date2}
            />
            <RaisedButton label="Generate" onTouchTap={handleGetReport} style={ styles.input}/>
        </div>
        {
            isFetching ? (<CircularProgress size={80} thickness={5}/>) :
                ( error.errorMSG ? (<div className="error-message">{error.errorMSG} </div>) :
                    ( <div className="outputContainer">

                    </div>))
        }


    </div>

);

StatementForm.propTypes = {
    dataFromApi: PropTypes.object,
    changeDate1: PropTypes.func.isRequired,
    changeDate2: PropTypes.func.isRequired,
    handleGetReport: PropTypes.func.isRequired,
    handleChangeAccount: PropTypes.func.isRequired,
    input: PropTypes.object,
    error: PropTypes.object,
    isFetching: PropTypes.bool,
    accounts: PropTypes.array,
};

export default StatementForm;