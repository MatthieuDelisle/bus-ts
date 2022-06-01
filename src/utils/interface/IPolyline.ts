import {LatLngLiteral} from "leaflet";

interface IPolyline {
    positions: LatLngLiteral[];
    color: string;
}

export default IPolyline;