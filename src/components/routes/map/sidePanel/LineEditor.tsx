import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectPosition} from "../../../../store/features/position/positionSlice";
import ILayer from "../../../../utils/interface/ILayer";
import EditorState from "../../../../utils/interface/EditorState";
import {updateOrAddLayer} from "../../../../store/features/display/displaySlice";
import {LatLng, LatLngExpression, LatLngLiteral} from "leaflet";

const LineEditor = (
    {layer, onSaveLine}:
        {layer: ILayer, onSaveLine: (layer: ILayer) => void}) => {

    const dispatch = useAppDispatch();

    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);

    const [state, setState] = useState<EditorState>(EditorState.IDLE)

    const [color, setColor] = useState("#cc14b7");

    const position = useAppSelector(selectPosition);

    const onSave = (event: FormEvent) => {
        event.preventDefault();

        onSaveLine(editedLayer);
        // Clear

    }

    const getStateName = () => {
        switch (state) {
            case EditorState.IDLE:
                return "IDLE"
            case EditorState.SELECT_STARTING_POINT:
                return "SELECT_STARTING_POINT"
            case EditorState.SELECT_PATH:
                return "SELECT_PATH"
        }
    }

    //{lat: 47.64935888483071, lng: 6.853105774796373}
    //{lat: 47.649893728326944, lng: 6.852548189142525}

    useEffect(() => {
        console.log("[LineEditor] ");
        console.log(position);

        switch (state) {
            case EditorState.IDLE:
                // Do nothing
                break;
            case EditorState.SELECT_STARTING_POINT:
                setEditedLayer({...editedLayer, markers: [{pos: position, color: color}]});
                break;
            case EditorState.SELECT_PATH:
                let polylines = [...editedLayer.polylines];
                if (polylines.length === 0)
                    polylines = [{positions: [position], color: color}];
                else {
                    let busPolyLine = {...polylines[0]};
                    busPolyLine.positions = [...busPolyLine.positions, position];
                    polylines[0] = busPolyLine;
                }
                setEditedLayer({...editedLayer, polylines: polylines})
                break;
        }
    }, [position]);

    // update the store
    useEffect(() => {
        dispatch(updateOrAddLayer(editedLayer));
    }, [editedLayer]);


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
                    <Button onClick={() => {

                        switch (state) {
                            case EditorState.IDLE:
                                setState(EditorState.SELECT_STARTING_POINT);
                                break;
                            case EditorState.SELECT_STARTING_POINT:
                                setState(EditorState.SELECT_PATH);
                                break;
                            case EditorState.SELECT_PATH:
                                setState(EditorState.IDLE);
                                break;
                        }

                    }}>{getStateName()}</Button>
                </Card.Text>
            </Card>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LineEditor;