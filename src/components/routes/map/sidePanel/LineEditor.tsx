import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import React, {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectPosition} from "../../../../store/features/position/positionSlice";
import ILayer from "../../../../utils/interface/ILayer";
import EditorState from "../../../../utils/interface/EditorState";
import {updateOrAddLayer} from "../../../../store/features/display/displaySlice";
import {latLng, LatLng, LatLngExpression, LatLngLiteral} from "leaflet";
import Api from "../../../../api/api";

const LineEditor = (
    {layer, onSaveLine}:
        {layer: ILayer, onSaveLine: (layer: ILayer) => void}) => {

    const dispatch = useAppDispatch();

    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);

    const [state, setState] = useState<EditorState>(EditorState.IDLE)

    const position = useAppSelector(selectPosition);

    const onSave = (event: FormEvent) => {
        event.preventDefault();

        onSaveLine(editedLayer);
        // Clear
    }

    const [currentNode, setCurrentNode] = useState<string>("484258490")


    useEffect(() => {
        console.log("[currentNode] ");
        console.log(currentNode);

    }, [currentNode]);

    // update the store
    useEffect(() => {
        dispatch(updateOrAddLayer(editedLayer));
    }, [dispatch, editedLayer]);


    return (
        <Form onSubmit={onSave}>
            <Form.Group className="mb-3" >
                <Form.Label>Bus line name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a name"
                    value={editedLayer.name}
                    onChange={e => {
                        setEditedLayer({ ...editedLayer, name: e.target.value });
                    }} />
                <Form.Label htmlFor="ColorInput">Select line color</Form.Label>
                {/*<Form.Control
                    type="color"
                    id="exampleColorInput"
                    value={editedLayer.color}
                    onChange={e => {
                        setColor(e.target.value);
                    }}
                    title="Choose your color"
                />*/}
            </Form.Group>

            <Card>
                <Card.Body>Line edition</Card.Body>
                <Card.Text>
                    <Stack gap={1}>
                        {editedLayer.polylines.length === 0?<></>:(editedLayer.polylines[0].positions.map(((value: LatLngExpression, index: number) => {
                            let latLng = (value as LatLngLiteral) //TODO: do something better than this cast
                            return <div key={index}>{latLng.lat} - {latLng.lng}</div>
                        })))}
                    </Stack>
                </Card.Text>
            </Card>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default React.memo(LineEditor);