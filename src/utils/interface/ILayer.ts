import {IMarker} from "./IMarker";
import {Polyline} from "leaflet";

interface ILayer {
    displayed: boolean;
    name: string;
    markers: IMarker[];
    polylines: Polyline[];
}

export default ILayer;