import { v4 as uuidv4 } from 'uuid';
import {LatLngExpression} from "leaflet";

class BusLine {
    uuid: string = uuidv4();
    name: string = "";

    startingPoint: LatLngExpression | undefined;
}

export default BusLine;