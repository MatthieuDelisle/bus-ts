import ILayer from "../../../../utils/interface/ILayer";
import {useEffect, useState} from "react";
import Api from "../../../../api/api";
import {Spinner} from "react-bootstrap";
import IPolyline from "../../../../utils/interface/IPolyline";
import {updateOrAddLayer} from "../../../../store/features/display/displaySlice";
import {useAppDispatch} from "../../../../store/hooks";
import {IMarker} from "../../../../utils/interface/IMarker";

type props = {
    layer: ILayer,
    onSaveLine: (layer: ILayer) => void
}

const randomColor = () => {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

export const BetterLineEditor = ({layer, onSaveLine}:props) => {
    const [editedLayer, setEditedLayer] = useState<ILayer>(layer);
    const [state, setState] = useState<'idle' | 'loading' | 'error'>('loading');
    const [currentNode, setCurrentNode] = useState<string>("484258490");
    const dispatch = useAppDispatch();
    //const [ways, setWays] = useState()

    useEffect(() => {
        Api.explorer_node(`${currentNode}`, (node_explorer) => {
            console.log(node_explorer);
            setState('idle')

            const markers: IMarker[] = [];
            const polylines: IPolyline[] = Object
                .entries(node_explorer)
                .map((way) => {
                    const color = randomColor();
                    return {
                        positions: Object
                            .entries(way[1].geometry)
                            .sort((a, b) => a[1].index-b[1].index)
                            .map((node) => {
                                const pos = {lat: node[1].lat, lng: node[1].lon};

                                if(node[0] === currentNode)
                                    markers.push({pos: pos, color: "#ff0000", id: Number(node[0]), popupText: "You are currently here"})
                                else if(node[1].ways > 1)
                                    markers.push(
                                        {
                                            pos: pos,
                                            color: color,
                                            id: Number(node[0]),
                                            callback: () => {
                                                setState('loading');
                                                setCurrentNode(node[0]);
                                            }
                                        }
                                    )

                                return pos
                            }),
                        color: color,
                        weight: 5
                    }
                });

            console.log(markers);

            setEditedLayer((prevState => {
                return {...prevState, markers: markers, polylines: polylines}
            }))
        });
    }, [currentNode]);

    // update the store
    useEffect(() => {
        console.log(editedLayer);
        dispatch(updateOrAddLayer(editedLayer));
    }, [dispatch, editedLayer]);

    switch (state) {
        case "idle":
            return <div>Loaded</div>
        case "loading":
            return (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )
        case "error":
            return <div>Error</div>
    }
}