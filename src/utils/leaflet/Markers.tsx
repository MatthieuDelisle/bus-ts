import { Marker } from 'react-leaflet';
import markerIcon from "./MarkerIcon";
import {LatLngExpression} from "leaflet";

export interface IMarker {
    pos: LatLngExpression,
    color: string
}

function Markers({ markers }: {markers: IMarker[]}): JSX.Element {

    return <>{markers.map((marker, index) => {
        return <Marker
            key={index}
            icon={markerIcon(marker.color)}
            position={marker.pos}
            draggable={false}>

        </Marker>
    })}</>
}

export default Markers;

