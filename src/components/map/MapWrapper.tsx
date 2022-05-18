import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Polyline} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import Markers from "../../utils/leaflet/Markers";
import {IMarker} from "../../utils/interface/IMarker";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectDisplay } from '../../store/features/display/displaySlice'
import GetPosition from "../../utils/leaflet/GetPosition";
import {setPosition} from "../../store/features/position/positionSlice";


const limeOptions = { color: 'lime' }

const MapWrapper = (
    {center, zoom} :
        {center: LatLngExpression, zoom: number}) => {

    const display = useAppSelector(selectDisplay);

    const dispatch = useAppDispatch();

    const [markers, setMarkers] = useState<IMarker[]>([]);

    useEffect(() => {
        console.log("[MapWrapper] useEffect")
        let n_markers: IMarker[] = [];

        for(let i = 0; i < display.layers.length; i++) {
            if(display.layers[i].displayed)
                n_markers = [...n_markers, ...display.layers[i].markers];
        }

        setMarkers(n_markers);
    }, [display]);


    return (
        <MapContainer
            center={center}
            style={{ height: "100%", width: "100%" }}
            zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />

            <Markers markers={markers}/>
            {<GetPosition onMapClicked={(d: LatLngExpression) => {
                // We cannot send non-serializable variable in the store.
                dispatch(setPosition({...d}));
            }}/>}


            <Polyline pathOptions={limeOptions} positions={[{lat: 47.648018138332795, lng: 6.85753918299505}, {lat: 47.647338717245, lng: 6.857834197267501}, {lat: 47.64664483126738, lng: 6.858145303227535}, {lat: 47.64547026368291, lng: 6.858778242939298}]} />
        </MapContainer>
    )
}
export default MapWrapper