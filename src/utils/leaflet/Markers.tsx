import {Marker, Popup} from 'react-leaflet';
import markerIcon from "./MarkerIcon";
import {IMarker} from "../interface/IMarker";


function Markers({ markers }: {markers: IMarker[]}): JSX.Element {

    return <>{markers.map((marker, index) => {
        return <Marker
            key={index}
            icon={markerIcon(marker.color)}
            position={marker.pos}
            eventHandlers={{
                click:(e) => {
                    console.log(marker.name)
                    console.log(e);
                    if(marker.callback !== undefined)
                        marker.callback(marker.id);
                }}}
            draggable={false}>
            <Popup>
                {marker?.name}
            </Popup>
        </Marker>
    })}</>
}

export default Markers;

