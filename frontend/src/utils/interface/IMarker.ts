import {LatLngExpression} from "leaflet";

// This interface is used to define what are the properties of a marker
export interface IMarker {
    pos: LatLngExpression,
    color: string,
    id: number,
    name?: string,
    callback?: (id: number) => void;
}
