import {LatLngExpression} from "leaflet";

export interface IMarker {
    pos: LatLngExpression,
    color: string,
    name?: string,
}
