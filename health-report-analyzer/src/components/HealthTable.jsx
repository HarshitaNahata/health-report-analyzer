import React from 'react';

const HealthTable = ({ healthData }) => {
    if (!healthData.length)
        return <p className="table-empty-state">No data extracted yet</p>;

    return (
        <div className="table-responsive">
            <table className="health-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Reference Range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {healthData.map((item, index) => (
                        <tr
                            key={index}
                            className={item.status === 'abnormal' ? 'abnormal-row' : ''}
                        >
                            <td className="table-parameter">{item.parameter}</td>
                            <td className="table-value">{item.value}</td>
                            <td className="table-unit">{item.unit}</td>
                            <td className="table-range">{item.referenceRange}</td>
                            <td className="table-status">
                                {item.status === 'abnormal'
                                    ? <span className="attention-badge">Needs Attention</span>
                                    : <span className="normal-badge">Normal</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HealthTable;
