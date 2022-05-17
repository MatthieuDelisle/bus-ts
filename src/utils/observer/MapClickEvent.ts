import {LatLngExpression} from "leaflet";

class MapClickEvent {
    private observer: ((pos:LatLngExpression) => void) | undefined = undefined;

    public notifyObservers = (pos: LatLngExpression) => {
        if(this.observer !== undefined)
            this.observer(pos);
    }

    public setObserver = (c: (pos:LatLngExpression) => void) => {
        this.observer = c;
    }

    public detach = () => {
        this.observer = undefined;
    }
}

export default MapClickEvent;