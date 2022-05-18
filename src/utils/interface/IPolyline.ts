import {LatLngExpression} from "leaflet";

interface IPolyline {
    positions: LatLngExpression[];
    color: string;
}

export default IPolyline;