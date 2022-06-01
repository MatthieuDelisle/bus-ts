import {LatLngExpression} from "leaflet";

export interface IMarker {
    pos: LatLngExpression,
    color: string,
    id: number,
    name?: string,
    callback?: (id: number) => void;
}
