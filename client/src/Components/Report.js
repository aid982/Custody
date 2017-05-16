/**
 * Created by osetskiy on 3/3/2017.
 */
import React, {PropTypes} from 'react';

const Report = ({data}) => (
    <div dangerouslySetInnerHTML={data} />
);
Report.propTypes = {
    data: PropTypes.object
};

export default Report;
