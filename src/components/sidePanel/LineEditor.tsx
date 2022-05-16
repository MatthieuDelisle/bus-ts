import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BusLine from "../../utils/models/BusLine";
import {FormEvent, useState} from "react";

const LineEditor = ({busLine, onSaveLine}: {busLine: BusLine, onSaveLine: (busLine: BusLine) => void}) => {

    const [editedBusLine, setEditedBusLine] = useState(busLine)

    const onSave = (event: FormEvent) => {
        event.preventDefault();
        onSaveLine(editedBusLine)
    }

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

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LineEditor;