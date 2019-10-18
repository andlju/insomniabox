import { useSelector } from 'react-redux';
import React from 'react';
import { Card, Table } from 'react-bootstrap';

function Station(props) {
    const station = useSelector(state => state.stations.find(st => st.StationId === props.StationId));
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <span>{station.Name}</span>
                    { station.Loading ? <span className="badge badge-pill badge-primary float-right">Loading</span> : '' }
                    { station.Error ? <span className="badge badge-pill badge-danger float-right">Failed</span> : '' }
                </Card.Title>
                <Table striped size="sm">
                    <tbody>
                        {station.Metros.slice(0,4).map(m => <Metro Metro={m} key={m.JourneyNumber}/>)}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

function Metro(props) {
    const metro = props.Metro;
    return (
        <tr className={metro.Deviations ? 'table-danger' : ''}>
            <td>{metro.DisplayTime}</td>
            <td>{metro.Destination}</td>
        </tr>
    );
}

export default Station;
