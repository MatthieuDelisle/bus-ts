import IMapManager from "./IMapManager";
import {IMarker} from "../leaflet/Markers";
import MapClickEvent from "../observer/MapClickEvent";
import Target from "../observer/Target";
import {LatLngExpression} from "leaflet";

class MapManager implements IMapManager {

    // This data structure hold the markers and the observers to the markers
    public markers = new Target<IMarker[]>([]);

    public posClick = new Target<LatLngExpression | undefined>(undefined, 1);

    addMarker(marker: IMarker): void {
        this.markers.data = [...this.markers.data, marker];
    }

    removeMarker(marker: IMarker): void {
        let i = this.markers.data.indexOf(marker);
        const _markers = [...this.markers.data]
        _markers.splice(i, 1);

        this.markers.data = _markers;
    }

    clearMarkers(): void {
        this.markers.data = [];
    }

    drawLine(): void {

    }


}

export default MapManager;