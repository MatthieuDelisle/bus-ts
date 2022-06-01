import { useMapEvents } from 'react-leaflet';
import {LatLngExpression} from "leaflet";

const GetPosition = ({onMapClicked} : {onMapClicked: (pos: LatLngExpression) => void}) => {

    useMapEvents({
        click(e) {
            onMapClicked(e.latlng)
        },
    })

    return null
}

export default GetPosition;