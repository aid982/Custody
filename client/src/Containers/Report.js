/**
 * Created by osetskiy on 3/7/2017.
 */
import React from 'react';
import ReportComp from '../Components/Report';
import {connect} from 'react-redux'
import {fetchDataIfNeeded, dateChange, accountChange} from '../Actions'

class Report extends React.Component {
    /**
     * Class constructor.
     */


    render() {
        const {statement} = this.props
        return (
            <div>
                <ReportComp data={statement}/>
            </div>

        );
    }

}
const mapStateToProps = (state) => {
    return {
        statement: state.statement.dataFromAPI,
    }
}

export default connect(
    mapStateToProps
)(Report);

