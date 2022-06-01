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
import IPolyline from "../../../../utils/interface/IPolyline";
import {IMarker} from "../../../../utils/interface/IMarker";


const randomColor = () => {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

const LineEditor = (
    {layer, onSaveLine}:
        {layer: ILayer, onSaveLine: (layer: ILayer) => void}) => {

    const dispatch = useAppDispatch();

    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);

    //const position = useAppSelector(selectPosition);

    const onSave = (event: FormEvent) => {
        event.preventDefault();

        onSaveLine(editedLayer);
        // Clear
    }

    const [currentNode, setCurrentNode] = useState<number>(484258490)


    useEffect(() => {
        console.log("[currentNode] ");

        Api.get_ways(currentNode, (way_ids => {
            console.log("get_ways callback");

            for (let i = 0; i < way_ids.length; i++) {
                Api.get_ways_full(way_ids[i], ((node_dict, node_order) => {
                    console.log("get_ways_full callback");

                    const color = randomColor();
                    const polyline: IPolyline = {positions: node_order.map((value => node_dict[value])), color: color};

                    for (let j = 0; j < node_order.length; j++) {
                        Api.get_ways(node_order[j], (way_ids1, node_id1) => {
                            if(way_ids1.length === 1)
                                return;

                            const marker: IMarker = {
                                pos: node_dict[node_id1],
                                color: color,
                                id: node_id1,
                                name: `id: ${node_id1}`,
                                callback: (id) => {
                                    setEditedLayer((prevState => {
                                        return {...prevState, markers: [],polylines: []}
                                    }))
                                    setCurrentNode(id);
                                }
                            };

                            setEditedLayer((prevState => {
                                return {...prevState, markers: [...prevState.markers, marker]}
                            }))
                        })
                    }

                    setEditedLayer((prevState => {
                        return {...prevState, polylines: [...prevState.polylines, polyline]}
                    }))
                }));
            }
        }));

    }, [currentNode]);

    // update the store
    useEffect(() => {
        console.log(editedLayer);
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