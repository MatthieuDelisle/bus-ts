import { v4 as uuidv4 } from 'uuid';
import {LatLngExpression} from "leaflet";
import {IMarker} from "../leaflet/Markers";

class BusLine {
    uuid: string = uuidv4();
    name: string = "";
    color: string = "fff";

    markers: IMarker[] = [];

    startingPoint: LatLngExpression | undefined;
}

export default BusLine;