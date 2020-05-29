import { useSelector } from 'react-redux';
import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

function ForecastDay(props) {
    // const station = useSelector(state => state.stations.find(st => st.StationId === props.StationId));
    // const selectCallback = props.onSelect;

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <span>Måndag</span>
                </Card.Title>
                
                Soligt, 24&degree;
                
                <Button variant="info" size="md" className="stretched-link w-100" onClick={() => selectCallback(station.StationId)}>Visa</Button>
            </Card.Body>
        </Card>
    );
}

export default ForecastDay;
