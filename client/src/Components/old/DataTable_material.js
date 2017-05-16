/**
 * Created by osetskiy on 2/24/2017.
 */
import React, {PropTypes} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
    TableStyle: {
        overflow: 'hidden',
        margin: '20px auto 0',
        fontSize: 'large',
        overflowX: 'auto'
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

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
                columns.push(<TableHeaderColumn key={key}>{key}</TableHeaderColumn>);
            }
        }


        function getArrayValues(curObject) {
            var objectValues = [];
            for (var key in curObject) {
                objectValues.push(<TableRowColumn key={key}>{curObject[key]}</TableRowColumn>);
            }
            return objectValues;
        }

        var rows = [];
        if (Array.isArray(this.props.dataArray)) {
            this.props.dataArray.map((curObject, index) => {
                rows.push(<TableRow key={index}>
                    {getArrayValues(curObject)}
                </TableRow>)
            })
        }


        return (
            <div className="TableClass">
                <Table fixedHeader={true}
                       style={styles.TableStyle}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            {columns}
                        </TableRow>
                    </TableHeader>
                    <TableBody stripedRows={true} displayRowCheckbox={false}>
                        {rows}
                    </TableBody>
                </Table>
            </div>
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