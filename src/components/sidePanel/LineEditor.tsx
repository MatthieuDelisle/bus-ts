import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import BusLine from "../../utils/models/BusLine";
import {FormEvent, useEffect, useState} from "react";
import {LatLngExpression} from "leaflet";

const LineEditor = ({busLine, onSaveLine}: {busLine: BusLine, onSaveLine: (busLine: BusLine) => void}) => {

    const [editedBusLine, setEditedBusLine] = useState(busLine)

    const onSave = (event: FormEvent) => {
        event.preventDefault();
        onSaveLine(editedBusLine)
    }

    const onMapClicked = (pos: LatLngExpression) => {
        console.log("[LineEditor] " + pos)
    }

    useEffect(() => {
        console.log("setMapClickListener");
    });

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