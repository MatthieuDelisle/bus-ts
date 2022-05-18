import {IMarker} from "./IMarker";
import IPolyline from "./IPolyline";


interface ILayer {
    id: string;
    displayed: boolean;
    name: string;
    markers: IMarker[];
    polylines: IPolyline[];
}

export default ILayer;