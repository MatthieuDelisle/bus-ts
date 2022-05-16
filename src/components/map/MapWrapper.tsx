import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {LatLngExpression} from "leaflet";
import Markers from "../../utils/leaflet/Markers";

const MapWrapper = ({center, zoom} : {center: LatLngExpression, zoom: number}) => {

    return (
        <MapContainer
            center={center}
            style={{ height: "100%", width: "100%" }}
            zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

            <Markers markers={[{pos: [47.6480217, 6.8575558], color: "fe4848"}]}/>
        </MapContainer>
    )
}
export default MapWrapper