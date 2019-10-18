import { useSelector } from 'react-redux';
import React from 'react';
import { Table, Modal } from 'react-bootstrap';

function StationDetail(props) {
    const station = useSelector(state => state.stations.find(st => st.StationId === props.StationId));
    const hideCallback = props.onHide;

    if (!station)
        return (<div></div>);
    return (
        <Modal show={true} onHide={hideCallback} size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    <span>{station.Name}</span>
                    {station.Loading ? <span className="badge badge-pill badge-primary float-right">Loading</span> : ''}
                    {station.Error ? <span className="badge badge-pill badge-danger float-right">Failed</span> : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped size="sm">
                    <tbody>
                        {station.Metros.map(m => <Metro Metro={m} key={m.JourneyNumber} />)}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

function Metro(props) {
    const metro = props.Metro;
    return (
        <tr className={metro.Deviations ? 'table-danger' : ''}>
            <td>{metro.DisplayTime}</td>
            <td>{metro.Destination}</td>
            <td>{metro.Deviations ? <span>{metro.Deviations[0].Text}</span> : ''}</td>
        </tr>
    );
}

export default StationDetail;
