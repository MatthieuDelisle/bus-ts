import {LatLngLiteral} from "leaflet";

interface IPolyline {
    positions: LatLngLiteral[];
    color: string;
    weight?: number;
}

export default IPolyline;