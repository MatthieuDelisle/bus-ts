import { Marker } from 'react-leaflet';
import markerIcon from "./MarkerIcon";
import {IMarker} from "../interface/IMarker";


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

