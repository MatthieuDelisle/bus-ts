import {IMarker} from "../leaflet/Markers";

interface IMapManager {
    clearMarkers: () => void;
    addMarker: (marker: IMarker) => void;
    removeMarker: (marker: IMarker) => void;

    drawLine: () => void;

}

export default IMapManager;