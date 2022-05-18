import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectPosition} from "../../store/features/position/positionSlice";
import ILayer from "../../utils/interface/ILayer";
import EditorState from "../../utils/interface/EditorState";
import {updateLayer} from "../../store/features/display/displaySlice";

const LineEditor = (
    {layer, onSaveLine}:
        {layer: ILayer, onSaveLine: (layer: ILayer) => void}) => {

    const dispatch = useAppDispatch();

    const [editedLayer, setLayer] = useState<ILayer>(layer);

    const [state, setState] = useState<EditorState>(EditorState.IDLE)

    const [color, setColor] = useState("#fff");

    const position = useAppSelector(selectPosition);

    const onSave = (event: FormEvent) => {
        event.preventDefault();

        onSaveLine(editedLayer);
        // Clear

    }

    useEffect(() => {
        console.log("[LineEditor] ");
        console.log(position);

        switch (state) {
            case EditorState.IDLE:
                // Do nothing
                break;
            case EditorState.SELECT_STARTING_POINT:
                setLayer({...editedLayer, markers: [{pos: position, color: color}]});
                break;
            case EditorState.SELECT_PATH:
                let polylines = {...editedLayer.polylines};
                if(polylines.length === 0)
                    polylines = [{positions: [position], color: color}];
                else {
                    let busPolyLine = polylines[0];
                    busPolyLine.positions.push(position);
                    polylines = [...polylines, busPolyLine];
                }
                setLayer({...editedLayer, polylines: polylines})
                break;
        

        dispatch(updateLayer(layer));

    }, [position]);


    return (
        <Form onSubmit={onSave}>
            <Form.Group className="mb-3" >
                <Form.Label>Bus line name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a name"
                    value={editedLayer.name}
                    onChange={e => {
                        setLayer({ ...editedLayer, name: e.target.value });
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
                <Card.Body>Starting point</Card.Body>
                <Card.Text>
                    <Button>Select starting point</Button>
                    <Button>Select path</Button>
                </Card.Text>
            </Card>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LineEditor;