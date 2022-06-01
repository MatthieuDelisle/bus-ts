import {LatLng} from "leaflet";
import Way from "./models/Way";

class Api {
    static query_features = (latLng: LatLng, callback: (d: Way[]) => void)  => {
        console.log("query_features");
        fetch(`http://127.0.0.1:5000/explore?lat=${latLng.lat}&lon=${latLng.lng}`)
            .then(response => response.json())
            .then(response => {

                const ways: Way[] = [];
                for (let i = 0; i < response.elements.length; i++) {
                    const w = Way.from_request_query_features(response.elements[i]);
                    if(w)
                        ways.push(w);
                }
                callback(ways);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default Api;