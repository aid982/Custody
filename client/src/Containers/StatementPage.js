/**
 * Created by osetskiy on 3/7/2017.
 */
import React from 'react';
import StatementForm from '../Components/StatementForm';
import {connect} from 'react-redux'
import {fetchDataIfNeeded, dateChange, accountChange} from '../Actions'

class StatementPage extends React.Component {
    /**
     * Class constructor.
     */



    render() {
        const {statement, dateChange1, dateChange2, handleGetReport, input, changeAccount, isFetching, error, accounts} = this.props
        return (
            <div>
                <StatementForm dataFromApi={statement} changeDate1={dateChange1}
                               changeDate2={dateChange2}
                               handleGetReport={handleGetReport}
                               handleChangeAccount={changeAccount} input={input} isFetching={isFetching} error={error}
                               accounts={accounts}/>
            </div>

        );
    }

}
const mapStateToProps = (state) => {
    return {
        statement: state.statement.dataFromAPI,
        input: state.statement.input,
        isFetching: state.statement.isFetching,
        error: state.statement.error,
        accounts: state.login.account.accounts,
    }
}

const mapDispatchToProps = (dispatch) => {
    //dispatch(fetchDataIfNeeded())
    return {
        handleGetReport: () => {
            dispatch(fetchDataIfNeeded())
        },
        dateChange1: (event, data) => {
            dispatch(dateChange('date1', data))
        },
        dateChange2: (event, data) => {
            dispatch(dateChange('date2', data))
        },
        changeAccount: (event, index, value) => {
            dispatch(accountChange(value))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatementPage);

