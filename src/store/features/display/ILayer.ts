import {IMarker} from "../../../utils/leaflet/Markers";
import {Polyline} from "leaflet";

interface ILayer {
    displayed: boolean;
    name: string;
    markers: IMarker[];
    polylines: Polyline[];
}

export default ILayer;