import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import BusLine from "../../utils/models/BusLine";
import {FormEvent, useEffect, useState} from "react";
import {LatLngExpression} from "leaflet";
import MapClickEvent from "../../utils/observer/MapClickEvent";
import Observer from "../../utils/observer/Observer";
import MapManager from "../../utils/manager/MapManager";

const LineEditor = (
    {busLine, onSaveLine, mapManager}:
        {busLine: BusLine, onSaveLine: (busLine: BusLine) => void, mapManager: MapManager}) => {

    const [editedBusLine, setEditedBusLine] = useState(busLine)

    const onSave = (event: FormEvent) => {
        event.preventDefault();
        onSaveLine(editedBusLine);

        // Clear
        mapManager.posClick.detachObserver(mapClick)
        mapManager.clearMarkers();
    }

    const mapClick = (pos: LatLngExpression | undefined) => {
        if(pos === undefined)
            return;
        console.log("[LineEditor] " + pos);
        let marker = {pos: pos, color: editedBusLine.color.substring(1)};

        busLine.markers.push(marker);
        mapManager.addMarker(marker)
    }

    useEffect(() => {
        console.log("[LineEditor] useEffect");
        for (let i = 0; i < busLine.markers.length; i++) {
            mapManager.addMarker(busLine.markers[i]);
        }
        mapManager.posClick?.addObserver(mapClick);
    }, [mapManager]);

    return (
        <Form onSubmit={onSave}>
            <Form.Group className="mb-3" >
                <Form.Label>Bus line name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a name"
                    value={editedBusLine.name}
                    onChange={e => {
                        setEditedBusLine({ ...editedBusLine, name: e.target.value });
                    }} />
                <Form.Label htmlFor="ColorInput">Select line color</Form.Label>
                <Form.Control
                    type="color"
                    id="exampleColorInput"
                    value={editedBusLine.color}
                    onChange={e => {
                        setEditedBusLine({...editedBusLine, color: e.target.value });
                    }}
                    title="Choose your color"
                />
            </Form.Group>

            <Card>
                <Card.Body>Starting point</Card.Body>
                <Card.Text>
                    {busLine.startingPoint === undefined?"You can click on the map to select a starting point":busLine.name}
                </Card.Text>
            </Card>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LineEditor;