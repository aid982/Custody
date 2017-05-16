/**
 * Created by osetskiy on 2/24/2017.
 */
import React, {PropTypes} from 'react';


class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

    };

    handleDelete(data) {
        this.props.handleDelete(data.target.value);
    }


    render() {


        var columns = [];
        if (this.props.dataArray.length > 0) {
            for (var key in this.props.dataArray[0]) {
                columns.push(<th key={key}>{key}</th>);
            }
        }


        function getArrayValues(curObject) {
            var objectValues = [];
            for (var key in curObject) {
                objectValues.push(<td key={key}>{curObject[key]}</td>);
            }
            return objectValues;
        }

        var rows = [];
        if (Array.isArray(this.props.dataArray)) {
            this.props.dataArray.map((curObject, index) => {
                rows.push(<tr key={index}>
                    {getArrayValues(curObject)}
                </tr>)
            })
        }


        return (
            <table>
                <thead>
                <tr>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>

            </table>
        );
    }

}
DataTable.propTypes = {
    dataArray: PropTypes.array.isRequired,
    addButton: PropTypes.bool,
    selectable: PropTypes.bool,
    handleDelete: PropTypes.func,
    handleSelection: PropTypes.func,
};


export  default DataTable;