import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import Markers, {IMarker} from "../../utils/leaflet/Markers";
import GetPosition from "../../utils/leaflet/GetPosition";
import MapManager from "../../utils/manager/MapManager";

const MapWrapper = (
    {center, zoom, mapManager} :
        {center: LatLngExpression, zoom: number, mapManager: MapManager}) => {

    const [markers, setMarkers] = useState<IMarker[]>([])

    useEffect(() => {
        mapManager.markers.addObserver((d: IMarker[]) => {
            setMarkers(d);
        });
    }, [mapManager])

    return (
        <MapContainer
            center={center}
            style={{ height: "100%", width: "100%" }}
            zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

            <Markers markers={markers}/>
            <GetPosition onMapClicked={(d: LatLngExpression) => {mapManager.posClick.data = d; }}/>
        </MapContainer>
    )
}
export default MapWrapper