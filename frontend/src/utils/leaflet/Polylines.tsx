import {Polyline} from 'react-leaflet';
import IPolyline from "../interface/IPolyline";


function Polylines({ polylines }: {polylines: IPolyline[]}): JSX.Element {

    return <>{polylines.map((polyline, index) => {
        return <Polyline key={index} pathOptions={{color: polyline.color, weight: polyline.weight}} positions={polyline.positions} />
    })}</>
}

export default Polylines;

